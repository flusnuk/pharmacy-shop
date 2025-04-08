import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';

export default function WelcomeSection() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          borderRadius: 2,
          overflow: 'hidden',
          p: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#0f172a',
              mb: 2,
            }}
          >
            Welcome to
            <Box component="span" sx={{ display: 'block', color: 'primary.main' }}>
              E TABLETKI
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              mb: 4,
              maxWidth: '500px',
            }}
          >
            Ваш надійний партнер у сфері охорони здоров&apos;я. Широкий асортимент ліків та професійна консультація.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Дізнатись більше
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            height: '400px',
          }}
        >
          <Image
            src="/images/pharmacy-team.jpg"
            alt="Pharmacy Team"
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Box>
    </Container>
  );
} 