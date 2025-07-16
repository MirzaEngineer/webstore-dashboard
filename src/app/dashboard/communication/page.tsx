import { Container, Paper, Typography } from '@mui/material';

import SupportRequests from '@/components/dashboard/communication/SupportRequests';

const Page: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Communication & Support
        </Typography>

        <SupportRequests supportNumber="+923110714802" message="Hello, I need assistance with my order." />
      </Paper>
    </Container>
  );
};

export default Page;
