'use client';

import React, { useEffect, useState } from 'react';
import { createProducts, updateProduct } from '@/redux/api/productApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

const itemSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Price must be a valid number',
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  image: z.instanceof(File).optional(),
});

type Item = z.infer<typeof itemSchema>;

export default function AddItemForm({ fetchProduct, editProduct, setEditProduct }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Item>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      updatedAt: new Date().toISOString().split('T')[0],
      image: undefined,
    },
  });

  useEffect(() => {
    if (editProduct) {
      setOpen(true);
      setValue('title', editProduct.title || '');
      setValue('description', editProduct.description || '');
      setValue('price', String(editProduct.price) || '');
      setValue('updatedAt', editProduct.updatedAt?.split('T')[0] || new Date().toISOString().split('T')[0]);
      if (editProduct.image) {
        setPreview(`http://localhost:4000/${editProduct.image}`);
      }
    }
  }, [editProduct, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      setValue('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: Item) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', String(data.price)); // or convert earlier

    formData.append('updatedAt', data.updatedAt);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    try {
      if (editProduct) {
        const actionResult = await dispatch(updateProduct({ id: editProduct._id, data: formData }));

        if (updateProduct.fulfilled.match(actionResult)) {
          toast.success('Product updated successfully!');

          fetchProduct();

          if (actionResult.payload.product?.image) {
            setPreview(`http://localhost:4000/${actionResult.payload.product.image}`);
          }

          reset({
            title: '',
            description: '',
            price: '',
            updatedAt: new Date().toISOString().split('T')[0],
          });
          setOpen(false);
          setEditProduct(null);
        } else {
          toast.error('Failed to update product.');
        }
      } else {
        const actionResult = await dispatch(createProducts(formData));
        if (createProducts.fulfilled.match(actionResult)) {
          toast.success(actionResult.payload.message);
        } else {
          toast.error((actionResult.payload as string) || 'Something went wrong');
        }
        reset();
        setPreview(null);
        setOpen(false);
        fetchProduct();
      }
    } catch (error) {
      console.error('Request failed:', error);
      toast.error('Something went wrong!');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
        + Add Item
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editProduct ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={preview || '/default-icon.png'} sx={{ width: 80, height: 80 }} />
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>

            <TextField
              label="Title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
            />
            <TextField
              label="Description"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Price"
              {...register('price')}
              error={!!errors.price}
              helperText={errors.price?.message}
              fullWidth
            />
            <TextField
              label="Updated At"
              type="date"
              {...register('updatedAt')}
              error={!!errors.updatedAt}
              helperText={errors.updatedAt?.message}
              fullWidth
            />

            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
                {editProduct ? 'Update Item' : 'Add Item'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
