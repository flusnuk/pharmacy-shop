"use client"

import { Container, Typography, Box, Grid, Stack, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Box sx={{ 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
          zIndex: 0
        }
      }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Hero Section */}
          <Box sx={{ 
            position: 'relative', 
            height: 500, 
            borderRadius: 8,
            overflow: 'hidden',
            mb: 8,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            transform: 'perspective(1000px) rotateY(-5deg)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'perspective(1000px) rotateY(0deg)'
            }
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
              background: 'linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 4
            }}>
              <Stack spacing={3}>
                <Typography 
                  variant="h2" 
                  color="white" 
                  fontWeight="bold"
                  sx={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 100,
                      height: 4,
                      background: theme.palette.secondary.main,
                      borderRadius: 2
                    }
                  }}
                >
                  Ваше здоров`я - наш пріоритет
                </Typography>
                <Typography 
                  variant="h5" 
                  color="white"
                  sx={{ 
                    opacity: 0.9,
                    maxWidth: 800,
                    margin: '0 auto'
                  }}
                >
                  Забезпечуємо якісними ліками та професійною підтримкою з 2014 року
                </Typography>
              </Stack>
            </Box>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                      bgcolor: theme.palette.primary.main,
                      '& .stat-number, & .stat-label': {
                        color: 'white'
                      }
                    }
                  }}
                >
                  <Typography 
                    className="stat-number"
                    variant="h3" 
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    className="stat-label"
                    variant="h6"
                    color="text.secondary"
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Features Section */}
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'white',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      '&::before': {
                        transform: 'scale(1.2)'
                      },
                      '& .feature-icon': {
                        color: theme.palette.secondary.main,
                        transform: 'scale(1.1)'
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: 'transform 0.3s ease'
                    }
                  }}
                >
                  <Box 
                    className="feature-icon"
                    sx={{ 
                      color: theme.palette.primary.main,
                      mb: 2,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 