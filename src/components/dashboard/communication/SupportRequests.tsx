'use client';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Paper, Typography } from '@mui/material';

interface SupportRequestsProps {
  supportNumber: string;
  message?: string;
}

const SupportRequests: React.FC<SupportRequestsProps> = ({ supportNumber, message }) => {
  const handleWhatsAppRedirect = () => {
    const text = message ? encodeURIComponent(message) : 'Hello, I need support.';
    const whatsappURL = `https://wa.me/${supportNumber}?text=${text}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Need Help? Contact Support
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Our support team is available on WhatsApp. Click below to chat now.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="success" startIcon={<WhatsAppIcon />} onClick={handleWhatsAppRedirect}>
          Chat on WhatsApp
        </Button>
      </Box>
    </Paper>
  );
};

export default SupportRequests;
