'use client';

import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => <p>Loading ...</p> });

export const Chart = styled(ApexChart)``;
