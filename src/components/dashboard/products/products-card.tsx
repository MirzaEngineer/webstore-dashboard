import * as React from 'react';
import { Button, CardActions, CardMedia } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import dayjs from 'dayjs';

export type Integration = {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  updatedAt: string;
};

export interface ProductsCardProps {
  integration: Integration;
}

export function ProductsCard({ integration }: ProductsCardProps): React.JSX.Element {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <Stack spacing={2}>
        <Card sx={{ maxWidth: 450 }}>
          <CardMedia
            sx={{ height: 250 }}
            image={integration.image ? `${API_URL}/uploads/${integration.image}` : undefined}
            title="product image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {integration.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {integration.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Left Side (Date) */}
              <Box display="flex" alignItems="center" gap={1}>
                <ClockIcon fontSize="var(--icon-fontSize-sm)" />
                <Typography color="text.secondary" variant="body2">
                  Updated {dayjs(integration.updatedAt).format('MMM D, YYYY')}
                </Typography>
              </Box>

              {/* Right Side (Price) */}
              <Typography color="text.primary" variant="body2" fontWeight={600}>
                ${integration.price}
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
}
