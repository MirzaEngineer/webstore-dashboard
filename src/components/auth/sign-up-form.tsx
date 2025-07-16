'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormLabel } from '@mui/material';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import { z as zod } from 'zod';

import { paths } from '@/paths';

import 'react-phone-input-2/lib/material.css';

import { useRouter } from 'next/navigation';
import { registerUser } from '@/redux/api/authApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const schema = zod.object({
  name: zod.string().min(1, { message: 'First name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  phone: zod.string().min(6, { message: 'Phone Number is required' }),
  verificationMethod: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  verificationMethod: false,
} satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      const updatedValues = {
        ...values,
        phone: `+${values.phone}`,
        verificationMethod: values.verificationMethod === true ? 'email' : 'phone',
      };

      try {
        const resultAction = await dispatch(registerUser(updatedValues));
        if (registerUser.fulfilled.match(resultAction)) {
          toast.success(resultAction.payload.message);
          reset();
          router.push('/auth/otp-verification');
        } else {
          toast.error(resultAction.payload as string);
        }
      } catch (error: any) {
        console.error('Error during registration:', error);
        toast.error(error.message || 'Something went wrong try againe');
      }
    },
    [dispatch, reset, router]
  );

  if (loading) return <p>loading...</p>;

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            Sign in
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>Enter Name</InputLabel>
                <OutlinedInput {...field} label="Enter Name" />
                {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                country={'pk'}
                enableSearch={true}
                inputStyle={{
                  width: '100%',
                  height: '56px',
                  fontSize: '16px',
                }}
                containerStyle={{ width: '100%' }}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          <FormLabel component="legend">Verification Method</FormLabel>
          <Controller
            control={control}
            name="verificationMethod"
            render={({ field }) => (
              <div>
                <FormControlLabel control={<Checkbox {...field} />} label={<React.Fragment>Email</React.Fragment>} />
                {errors.verificationMethod ? (
                  <FormHelperText error>{errors.verificationMethod.message}</FormHelperText>
                ) : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}

          <Controller
            control={control}
            name="verificationMethod"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={<React.Fragment>Phone Number</React.Fragment>}
                />
                {errors.verificationMethod ? (
                  <FormHelperText error>{errors.verificationMethod.message}</FormHelperText>
                ) : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button type="submit" variant="contained">
            Sign up
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
