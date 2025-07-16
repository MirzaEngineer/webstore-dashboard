'use client';

import React from 'react';
import dayjs from 'dayjs';

import { Orders } from '@/components/dashboard/orders/orders';
import { Order } from '@/components/dashboard/overview/latest-orders';

const Page = () => {
  const [orderdata, setOrderdata] = React.useState<Order[]>();

  React.useEffect(() => {
    const submitOrder = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/checkout');
        const data = await res.json();

        let updatedata = [...data.orders];
        updatedata[0].status = 'delivered';

        setOrderdata(updatedata);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    submitOrder();
  }, []);
  return (
    <div>
      <Orders orders={orderdata} autoset={{ height: '450px', overflow: 'auto' }} sx={{ height: '100%' }} />
    </div>
  );
};

export default Page;
