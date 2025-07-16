'use client';

import { useState } from 'react';
import { Box, Paper, Slider, TextField, Typography } from '@mui/material';

interface DiscountTier {
  minQty: number;
  discount: number;
}

interface TieredPricingProps {
  basePrice: number;
  discountTiers: DiscountTier[];
}

const TieredPricing: React.FC<TieredPricingProps> = ({ basePrice, discountTiers }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const getDiscountedPrice = (): string => {
    let discountedPrice = basePrice;
    discountTiers.forEach(({ minQty, discount }) => {
      if (quantity >= minQty) {
        discountedPrice = basePrice - (basePrice * discount) / 100;
      }
    });
    return discountedPrice.toFixed(2);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Tiered Pricing
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography>Quantity:</Typography>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          sx={{ width: '100px' }}
        />
      </Box>

      <Slider
        value={quantity}
        min={1}
        max={50}
        step={1}
        onChange={(_, newValue) => setQuantity(newValue as number)}
        aria-labelledby="quantity-slider"
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        Discounted Price: <strong>${getDiscountedPrice()}</strong>
      </Typography>
    </Paper>
  );
};

export default TieredPricing;
