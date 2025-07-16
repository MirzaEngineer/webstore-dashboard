'use client';

import { useEffect, useState } from 'react';
import { createCustomer, updateCustomer } from '@/redux/api/customersApi';
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

const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  joinedDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  image: z.instanceof(File).optional(),
});

export type Customerform = z.infer<typeof customerSchema>;

interface AddCustomerFormProps {
  fecthCustomer: () => void;
  editProduct: any;
  setEditProduct: (value: any) => void;
}

export default function AddCustomerForm({ fecthCustomer, editProduct, setEditProduct }: AddCustomerFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Customerform>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: ' ',
      joinedDate: new Date().toISOString().split('T')[0],
      image: undefined,
    },
  });

  useEffect(() => {
    if (editProduct) {
      setOpen(true);
      setValue('name', editProduct.name || '');
      setValue('email', editProduct.email || '');
      setValue('phone', editProduct.phone || '');
      setValue('location', editProduct.location || '');
      setValue('joinedDate', editProduct.joinedDate?.split('T')[0] || new Date().toISOString().split('T')[0]);

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

  const onSubmit = async (data: Customerform) => {
    console.log('🚀 ~ onSubmit ~ data:', data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('location', data.location);
    formData.append('joinedDate', data.joinedDate);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }

    try {
      if (editProduct) {
        const result = await dispatch(updateCustomer({ id: editProduct._id, data: formData }));
        if (updateCustomer.fulfilled.match(result)) {
          const updatedData = result.payload;
          console.log('🚀 ~ onSubmit ~ updatedData:', updatedData);
          toast.success('Customer updated!');
          fecthCustomer();
          reset();
          setPreview(null);
          setEditProduct(null);
          setOpen(false);
        } else {
          toast.error('Failed to update customer');
        }
      } else {
        const result = await dispatch(createCustomer(formData));
        if (createCustomer.fulfilled.match(result)) {
          toast.success('Customer created!');
          fecthCustomer();
          reset();
          setPreview(null);
          setOpen(false);
        } else {
          toast.error('Failed to create customer');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
        + Add
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editProduct ? 'Update Customer' : 'Add New Customer'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2} mt={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar src={preview || '/default-avatar.png'} sx={{ width: 80, height: 80 }} />
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
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="Phone"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
            <TextField
              label="Location"
              {...register('location')}
              error={!!errors.location}
              helperText={errors.location?.message}
              fullWidth
            />
            <TextField
              label="Joined Date"
              type="date"
              {...register('joinedDate')}
              error={!!errors.joinedDate}
              helperText={errors.joinedDate?.message}
              fullWidth
            />

            <DialogActions>
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#6366F1', color: '#fff' }}>
                {editProduct ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
