"use client"

import { Box, Container, Typography, Button, Stack, Paper } from '@mui/material';
import { LocalPharmacy, LocalShipping, Support, Security } from '@mui/icons-material';
import Image from 'next/image';

const features = [
  {
    icon: <LocalPharmacy />,
    title: "Широкий асортимент",
    description: "Понад 10000 найменувань ліків"
  },
  {
    icon: <LocalShipping />,
    title: "Швидка доставка",
    description: "Доставка по всій Україні"
  },
  {
    icon: <Support />,
    title: "Консультація",
    description: "Професійна підтримка 24/7"
  },
  {
    icon: <Security />,
    title: "Гарантія якості",
    description: "Всі препарати сертифіковані"
  }
];

export default function HeroSection() {
  return (
    <Box sx={{ 
      position: 'relative',
      bgcolor: 'primary.main',
      color: 'white',
      mb: 7,
      pt: { xs: 8, md: 12 },
      pb: { xs: 12, md: 16 }
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h2" 
              fontWeight="bold"
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Ваша онлайн аптека
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ mb: 4, opacity: 0.9 }}
            >
              Якісні ліки та професійна консультація для вашого здоров&apos;я
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              href="/catalog"
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Перейти до каталогу
            </Button>
          </Box>
          <Box sx={{ 
            flex: 1,
            position: 'relative',
            height: { xs: 300, md: 400 },
            width: '100%',
            display: { xs: 'none', md: 'block' }
          }}>
            <Image
              src="/images/pharmacy-hero.jpg"
              alt="Pharmacy"
              fill
              style={{ 
                objectFit: 'cover',
                borderRadius: '16px'
              }}
            />
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 8 } }}>
        <Box sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          transform: 'translateY(50%)',
          zIndex: 3
        }}>
          <Paper sx={{ 
            p: 3,
            boxShadow: 3,
            bgcolor: 'background.paper',
            borderRadius: 2
          }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="space-around"
              alignItems="center"
            >
              {features.map((feature, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    textAlign: 'center',
                    color: 'text.primary'
                  }}
                >
                  <Box sx={{ 
                    color: 'primary.main',
                    mb: 1,
                    '& svg': { fontSize: 40 }
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Container>

      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'primary.dark',
        opacity: 0.1,
        zIndex: 1
      }} />
    </Box>
  );
} 