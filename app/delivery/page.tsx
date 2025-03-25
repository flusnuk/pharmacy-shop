"use client"

import { Container, Typography, Box, Grid, Stack } from '@mui/material';
import { 
  LocalShipping, 
  AccessTime, 
  Payment, 
  Info,
  LocationOn,
  LocalPharmacy,
  Medication,
  HealthAndSafety
} from '@mui/icons-material';

const deliveryInfo = [
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Способи доставки",
    items: [
      "Нова Пошта - 1-2 дні",
      "Укрпошта - 2-4 дні",
      "Кур'єрська доставка - в день замовлення",
      "Самовивіз з аптеки"
    ]
  },
  {
    icon: <AccessTime sx={{ fontSize: 40 }} />,
    title: "Терміни доставки",
    items: [
      "Доставка по Києву - в день замовлення",
      "Доставка по Україні - 1-3 дні",
      "Термінова доставка - 2-3 години"
    ]
  },
  {
    icon: <Payment sx={{ fontSize: 40 }} />,
    title: "Вартість доставки",
    items: [
      "Безкоштовно при замовленні від 1000 грн",
      "Стандартна доставка - 140 грн",
      "Кур'єрська доставка в межах міста - 140 грн"
    ]
  },
  {
    icon: <Info sx={{ fontSize: 40 }} />,
    title: "Важлива інформація",
    items: [
      "Доставка ліків здійснюється в спеціальній упаковці",
      "Температурний режим дотримується",
      "Можливість відстеження замовлення"
    ]
  }
];

const benefits = [
  {
    icon: <HealthAndSafety />,
    title: "Безпечне транспортування",
    description: "Спеціальні термоконтейнери для збереження якості ліків"
  },
  {
    icon: <Medication />,
    title: "Швидка доставка",
    description: "Термінова доставка життєво важливих препаратів"
  },
  {
    icon: <LocalPharmacy />,
    title: "Професійна упаковка",
    description: "Захист від пошкоджень та зовнішніх факторів"
  },
  {
    icon: <LocationOn />,
    title: "Широке покриття",
    description: "Доставка у всі регіони України"
  }
];

export default function DeliveryPage() {
  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      <Box sx={{ 
        position: 'relative', 
        height: 300,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        mb: 6
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Доставка
          </Typography>
          <Typography variant="h6">
            Швидко, надійно та безпечно доставимо ваші ліки
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {/* Benefits */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ 
                bgcolor: 'white',
                p: 3,
                borderRadius: 2,
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {benefit.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {benefit.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Delivery Info */}
        <Grid container spacing={4}>
          {deliveryInfo.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ 
                bgcolor: 'white',
                p: 4,
                borderRadius: 2,
                height: '100%'
              }}>
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {section.icon}
                    </Box>
                    <Typography variant="h6">
                      {section.title}
                    </Typography>
                  </Box>
                  <Stack spacing={2}>
                    {section.items.map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main' 
                        }} />
                        <Typography>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 