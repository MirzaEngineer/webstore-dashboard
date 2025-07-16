'use client';

import { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

interface Discount {
  title: string;
  description: string;
}

interface SpecialDiscountsProps {
  discounts: Discount[];
}

const SpecialDiscounts: React.FC<SpecialDiscountsProps> = ({ discounts }) => {
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Special Discounts
      </Typography>

      <Grid container spacing={2}>
        {discounts.map((discount, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {discount.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {discount.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => setSelectedDiscount(discount)}
                >
                  Apply Discount
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedDiscount && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>{selectedDiscount.title}</strong>: {selectedDiscount.description}
        </Typography>
      )}
    </Box>
  );
};

export default SpecialDiscounts;
