'use client';

import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { deleteCustomer, fetchCustomers } from '@/redux/api/customersApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';

import AddCustomerForm, { Customerform } from './add-customers';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Customer {
  _id: string;
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
}

interface ActionCellRendererParams extends ICellRendererParams {
  setEditProduct: React.Dispatch<React.SetStateAction<Customerform | null>>;
  fecthCustomer: () => Promise<void>;
}

const ActionsCellRenderer: React.FC<ActionCellRendererParams> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    props.setEditProduct(props.data);
    handleClose();
  };

  const handleDelete = async () => {
    const actionResult = await dispatch(deleteCustomer(props.data._id));

    if (deleteCustomer.fulfilled.match(actionResult)) {
      const delcusotmer = actionResult.payload;
      console.log('🚀 ~ handleDelete ~ delcusotmer:', delcusotmer);
      handleClose();
      props.fecthCustomer();

      toast.success('Customer deleted successfully!');
    } else {
      toast.error('Failed to delete Customer');
    }
  };
  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon sx={{ color: 'white' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: '#1e1e1e', color: 'white' } }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

const CustomerTable = () => {
  const [clients, setClients] = useState<Customerform[]>([]);
  const [editProduct, setEditProduct] = useState<Customerform | null>(null);
  const { loading, customer } = useAppSelector((state) => state.customers);
  const dispatch = useAppDispatch();
  console.log('🚀 ~ CustomerTable ~ customer:', customer.length);

  // const fetchProduct = React.useCallback(async () => {
  //   try {
  //     await dispatch(fetchProducts()).unwrap();
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // }, [dispatch]);

  // React.useEffect(() => {
  //   fetchProduct();
  // }, [fetchProduct]);

  const fecthCustomer = React.useCallback(async (): Promise<void> => {
    try {
      const data = await dispatch(fetchCustomers()).unwrap();
      if (data?.customers) {
        setClients(
          data.customers.map((client: any) => ({
            ...client,
            id: client._id,
          }))
        );
      } else {
        toast.error('Failed to fetch clients');
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  }, [dispatch]);

  React.useEffect(() => {
    fecthCustomer();
  }, [fecthCustomer]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const columnDefs: ColDef<Customer>[] = [
    {
      headerName: 'ID',
      field: '_id',
      sortable: true,
      headerClass: 'smoke-white-header',
      flex: 4,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
      headerClass: 'smoke-white-header',
      cellRenderer: (params: ICellRendererParams) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={params.data.image ? `${API_URL}/uploads/${params.data.image}` : undefined}
            alt="Image"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <span>{params.value}</span>
        </div>
      ),
      flex: 4,
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      headerClass: 'smoke-white-header',
      flex: 4,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      sortable: true,
      filter: 'agNumberColumnFilter',
      headerClass: 'smoke-white-header', // Apply custom class
      flex: 2,
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true,
      headerClass: 'smoke-white-header', // Apply custom class
      flex: 4,
    },
    {
      headerName: 'Joined Date',
      field: 'joinedDate',
      sortable: true,
      valueFormatter: (params) => dayjs(params.value).format('MMM D, YYYY'),
      headerClass: 'smoke-white-header',
      flex: 2,
    },
    {
      headerName: '',
      width: 80,
      cellRenderer: (params: ICellRendererParams) => (
        <ActionsCellRenderer {...params} setEditProduct={setEditProduct} fecthCustomer={fecthCustomer} />
      ),
      menuTabs: [],
      sortable: false,
      headerClass: 'smoke-white-header',
      flex: 2,
    },
  ];

  const getRowHeight = useCallback((params: any) => {
    return params.data?.rowHeight || 70;
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Stack direction="row" spacing={3} sx={{ marginBottom: 4 }}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <AddCustomerForm editProduct={editProduct} setEditProduct={setEditProduct} fecthCustomer={fecthCustomer} />
        </div>
      </Stack>

      <div className="p-6 bg-gray-900 text-white rounded-lg shadow-xl">
        <div className="ag-theme-alpine-dark rounded-lg shadow-lg">
          <AgGridReact
            rowData={customer}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
            }}
            getRowHeight={getRowHeight}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[100, 200, 400]}
            rowSelection="multiple"
          />
        </div>
      </div>
    </>
  );
};

export default CustomerTable;
