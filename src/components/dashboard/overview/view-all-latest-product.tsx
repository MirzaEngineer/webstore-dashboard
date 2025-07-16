import React from 'react';
import dayjs from 'dayjs';

import { LatestProducts } from './latest-products';

const ViewAllLatestProduct = () => {
  return (
    <div>
      <LatestProducts
        products={[
          {
            id: 'PRD-005',
            name: 'Soja & Co. Eucalyptus',
            image: '/assets/product-5.png',
            updatedAt: dayjs().subtract(18, 'minutes').subtract(5, 'hour').toDate(),
          },
          {
            id: 'PRD-004',
            name: 'Necessaire Body Lotion',
            image: '/assets/product-4.png',
            updatedAt: dayjs().subtract(41, 'minutes').subtract(3, 'hour').toDate(),
          },
          {
            id: 'PRD-003',
            name: 'Ritual of Sakura',
            image: '/assets/product-3.png',
            updatedAt: dayjs().subtract(5, 'minutes').subtract(3, 'hour').toDate(),
          },
          {
            id: 'PRD-002',
            name: 'Lancome Rouge',
            image: '/assets/product-2.png',
            updatedAt: dayjs().subtract(23, 'minutes').subtract(2, 'hour').toDate(),
          },
          {
            id: 'PRD-001',
            name: 'Erbology Aloe Vera',
            image: '/assets/product-1.png',
            updatedAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'PRD-001',
            name: 'Erbology Aloe Vera',
            image: '/assets/product-1.png',
            updatedAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'PRD-001',
            name: 'Erbology Aloe Vera',
            image: '/assets/product-1.png',
            updatedAt: dayjs().subtract(10, 'minutes').toDate(),
          },
          {
            id: 'PRD-001',
            name: 'Erbology Aloe Vera',
            image: '/assets/product-1.png',
            updatedAt: dayjs().subtract(10, 'minutes').toDate(),
          },
        ]}
        autoset={{ height: '500px', overflow: 'auto' }}
        sx={{ height: '100%' }}
      />
    </div>
  );
};

export default ViewAllLatestProduct;
