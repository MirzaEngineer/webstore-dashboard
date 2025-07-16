'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';

const page = () => {
  const router = useRouter();

  return router.push(paths.auth.signIn);
};

export default page;
