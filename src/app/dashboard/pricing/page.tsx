import { Container, Paper, Typography } from '@mui/material';

import SpecialDiscounts from '@/components/dashboard/pricing/SpecialDiscounts';
import TieredPricing from '@/components/dashboard/pricing/TieredPricing';

const Page: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Pricing & Discounts
        </Typography>

        <TieredPricing
          basePrice={100}
          discountTiers={[
            { minQty: 5, discount: 10 },
            { minQty: 10, discount: 20 },
          ]}
        />

        <SpecialDiscounts
          discounts={[
            { title: 'Summer Sale', description: 'Get 20% off on all items!' },
            { title: 'Flash Deal', description: 'Buy 1 get 1 free on selected products!' },
          ]}
        />
      </Paper>
    </Container>
  );
};

export default Page;
