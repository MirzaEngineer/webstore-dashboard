'use client';

import * as React from 'react';
import { deleteProduct, fetchProducts } from '@/redux/api/productApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { toast } from 'react-toastify';

import AddItemForm from '@/components/dashboard/products/new-product';
import { ProductsCard } from '@/components/dashboard/products/products-card';
import type { Integration } from '@/components/dashboard/products/products-card';
import { ProductsFilters } from '@/components/dashboard/products/products-filters';

export default function ProductsPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [myproducts, setProducts] = React.useState<Integration[]>([]);
  const [editProduct, setEditProduct] = React.useState<Integration | null>(null);

  const { loading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const fetchProduct = async (): Promise<void> => {
    try {
      const data = await dispatch(fetchProducts()).unwrap();

      if (data?.products) {
        setProducts(
          data.products.map((product: any) => ({
            ...product,
            id: product._id,
          }))
        );
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  const filteredProducts = Array.isArray(myproducts)
    ? myproducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleDelete = async (id: string) => {
    const actionResult = await dispatch(deleteProduct(id));

    if (deleteProduct.fulfilled.match(actionResult)) {
      fetchProduct();
      toast.success('Product deleted successfully!');
    } else {
      toast.error('Failed to delete product');
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Products</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <AddItemForm fetchProduct={fetchProduct} editProduct={editProduct} setEditProduct={setEditProduct} />
        </div>
      </Stack>

      <ProductsFilters onSearch={setSearchQuery} />

      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((integration) => (
            <Grid key={integration._id} lg={4} md={6} xs={12}>
              <ProductsCard integration={integration} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                <Button variant="outlined" color="primary" onClick={() => setEditProduct(integration)}>
                  Update
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(integration._id)}>
                  Delete
                </Button>
              </Box>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No products found.
          </Typography>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
