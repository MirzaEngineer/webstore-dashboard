'use client';

import * as React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

// Schema using Zod
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [userinfo, setUserinfo] = React.useState<FormData | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      state: userinfo?.state || '',
      city: userinfo?.city || '',
    },
  });

  const onSubmit = (data: FormData) => {
    const updateinfo = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      state: data.state,
      city: data.city,
    };

    setUserinfo(updateinfo);
    toast.success('Successfull Save Update Info');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item md={6} xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.name}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput {...field} id="name" label="Name" />
                    <FormHelperText>{errors.name?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item md={6} xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.email}>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <OutlinedInput {...field} id="email" label="Email address" />
                    <FormHelperText>{errors.email?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            {/* Phone */}
            <Grid item md={6} xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel htmlFor="phone">Phone number</InputLabel>
                    <OutlinedInput {...field} id="phone" label="Phone number" />
                  </FormControl>
                )}
              />
            </Grid>

            {/* State */}
            <Grid item md={6} xs={12}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select {...field} id="state" label="State">
                      {states.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>

            {/* City */}
            <Grid item md={6} xs={12}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <OutlinedInput {...field} id="city" label="City" />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
