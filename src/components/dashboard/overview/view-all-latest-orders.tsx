import React from 'react';

import { LatestOrders } from './latest-orders';

const ViewAllLatestOrders = () => {
  return (
    <div>
      <LatestOrders autoset={{ height: '450px', overflow: 'auto' }} sx={{ height: '100%' }} />
    </div>
  );
};

export default ViewAllLatestOrders;
