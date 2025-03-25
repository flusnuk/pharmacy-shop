"use client"

import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { 
  LocalShipping, 
  AccessTime, 
  LocationOn,
  CheckCircle
} from '@mui/icons-material';

const deliveryMethods = [
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Нова Пошта",
    description: "Доставка у відділення або адресна доставка",
    color: "#ff4081",
    gradient: "linear-gradient(135deg, #ff4081, #ff79b0)"
  },
  {
    icon: <AccessTime sx={{ fontSize: 40 }} />,
    title: "Термінова доставка",
    description: "Доставка в день замовлення по місту",
    color: "#2196f3",
    gradient: "linear-gradient(135deg, #2196f3, #21CBF3)"
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: "Самовивіз",
    description: "Безкоштовно з наших аптек",
    color: "#4caf50",
    gradient: "linear-gradient(135deg, #4caf50, #80e27e)"
  }
];

const deliveryInfo = [
  "Доставка здійснюється по всій території України",
  "Термін доставки 1-3 робочих дні",
  "Вартість доставки від 40 грн",
  "Безкоштовна доставка при замовленні від 1000 грн",
  "Можливість відстеження посилки",
  "Оплата при отриманні або онлайн"
];

export default function DeliveryPage() {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        height: 300,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Доставка
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Швидко, надійно та безпечно доставимо ваші ліки
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Delivery Methods */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {deliveryMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 20px ${method.color}40`,
                    '& .method-icon': {
                      background: method.gradient,
                      '& svg': {
                        color: 'white',
                        transform: 'scale(1.1) rotate(10deg)'
                      }
                    }
                  }
                }}
              >
                <Box
                  className="method-icon"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${method.color}20`,
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '& svg': {
                      color: method.color,
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {method.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {method.title}
                </Typography>
                <Typography color="text.secondary">
                  {method.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Delivery Information */}
        <Paper
          sx={{
            p: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`,
            borderRadius: 4
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{
              textAlign: 'center',
              mb: 4,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Важлива інформація
          </Typography>
          <Grid container spacing={3}>
            {deliveryInfo.map((info, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircle sx={{ color: theme.palette.primary.main }} />
                  <Typography>{info}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
} 