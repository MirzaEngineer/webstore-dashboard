'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/redux/api/authApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z as zod } from 'zod';

// ✅ Updated Zod schema with password + confirmPassword
const schema = zod
  .object({
    token: zod.string().min(1, { message: 'First name is required' }),
    password: zod.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: zod.string().min(6, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type resetValues = zod.infer<typeof schema>;

const defaultValues: resetValues = {
  token: '',
  password: '',
  confirmPassword: '',
};

export function ResetPassword(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<resetValues>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: resetValues): Promise<void> => {
      setIsPending(true);
      try {
        await dispatch(resetPassword(values));
        reset();
        router.push('/auth/sign-in');
      } catch (error) {
        console.error('Error during reset password:', error);
        toast.error('Something went wrong. Try again.');
      } finally {
        setIsPending(false);
      }
    },
    [setError, reset]
  );

  if (loading) return <p>Loading...</p>;

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="token"
            render={({ field }) => (
              <FormControl error={Boolean(errors.token)}>
                <InputLabel>Enter OTP</InputLabel>
                <OutlinedInput {...field} label="Enter Name" />
                {errors.token ? <FormHelperText>{errors.token.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>New Password</InputLabel>
                <OutlinedInput {...field} label="New Password" type="password" />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput {...field} label="Confirm Password" type="password" />
                {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {errors.root && <Alert color="error">{errors.root.message}</Alert>}

          <Button disabled={isPending} type="submit" variant="contained">
            Reset Password
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
