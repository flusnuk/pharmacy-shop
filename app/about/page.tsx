"use client"

import { Container, Typography, Box, Grid, Stack } from '@mui/material';
import { 
  Timeline,
  Biotech,
  HealthAndSafety,
  MedicalServices
} from '@mui/icons-material';
import Image from 'next/image';

const features = [
  {
    icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
    title: "Якість та безпека",
    description: "Всі препарати сертифіковані та зберігаються відповідно до стандартів"
  },
  {
    icon: <MedicalServices sx={{ fontSize: 40 }} />,
    title: "Професійна консультація",
    description: "Команда досвідчених фармацевтів завжди готова допомогти"
  },
  {
    icon: <Biotech sx={{ fontSize: 40 }} />,
    title: "Інновації",
    description: "Впроваджуємо сучасні технології для покращення обслуговування"
  },
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: "Розвиток",
    description: "Постійно розширюємо асортимент та покращуємо сервіс"
  }
];

const stats = [
  { number: "10+", label: "років досвіду" },
  { number: "50k+", label: "клієнтів" },
  { number: "1000+", label: "найменувань ліків" },
  { number: "100%", label: "гарантія якості" }
];

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ 
          position: 'relative', 
          height: 400, 
          borderRadius: 4,
          overflow: 'hidden',
          mb: 6 
        }}>
          <Image
            src="/images/pharmacy-hero.jpg"
            alt="Pharmacy"
            fill
            style={{ objectFit: 'cover' }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4
          }}>
            <Stack spacing={2}>
              <Typography variant="h3" color="white" fontWeight="bold">
                Ваше здоров&apos;я - наш пріоритет
              </Typography>
              <Typography variant="h6" color="white">
                Забезпечуємо якісними ліками та професійною підтримкою з 2014 року
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box sx={{ 
                textAlign: 'center',
                p: 3,
                bgcolor: 'white',
                borderRadius: 2
              }}>
                <Typography 
                  variant="h3" 
                  color="primary.main" 
                  fontWeight="bold"
                  gutterBottom
                >
                  {stat.number}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Наша місія
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                height: 400,
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <Image
                  src="/images/pharmacy-mission.jpg"
                  alt="Our Mission"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography variant="h5" color="primary">
                  Забезпечуємо здоров&apos;я нації
                </Typography>
                <Typography>
                  Наша мета - зробити якісні ліки доступними для кожного українця. 
                  Ми працюємо з провідними виробниками та забезпечуємо належні умови 
                  зберігання всіх препаратів.
                </Typography>
                <Typography>
                  Кожен член нашої команди - це кваліфікований спеціаліст, готовий 
                  надати професійну консультацію та допомогти з вибором необхідних 
                  препаратів.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Наші переваги
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ 
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Box sx={{ color: 'primary.main' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 