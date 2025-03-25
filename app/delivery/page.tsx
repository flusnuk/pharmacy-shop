"use client"

import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Stack,
  Paper,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material';
import { 
  LocalShipping, 
  AccessTime, 
  Payment, 
  LocationOn,
  LocalPharmacy,
  Medication,
  HealthAndSafety,
  CheckCircle,
  DirectionsCar,
  Euro,
  Schedule
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
  }
];

const benefits = [
  {
    icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
    title: "Безпечне транспортування",
    description: "Спеціальні термоконтейнери для збереження якості ліків"
  },
  {
    icon: <Medication sx={{ fontSize: 40 }} />,
    title: "Швидка доставка",
    description: "Термінова доставка життєво важливих препаратів"
  },
  {
    icon: <LocalPharmacy sx={{ fontSize: 40 }} />,
    title: "Професійна упаковка",
    description: "Захист від пошкоджень та зовнішніх факторів"
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: "Широке покриття",
    description: "Доставка у всі регіони України"
  }
];

const steps = [
  {
    icon: <Schedule color="primary" />,
    title: "Оформлення замовлення",
    description: "Оберіть необхідні ліки та спосіб доставки"
  },
  {
    icon: <DirectionsCar color="primary" />,
    title: "Підготовка і відправка",
    description: "Ми дбайливо упакуємо та відправимо ваше замовлення"
  },
  {
    icon: <Euro color="primary" />,
    title: "Оплата",
    description: "Оплатіть замовлення зручним для вас способом"
  },
  {
    icon: <LocalPharmacy color="primary" />,
    title: "Отримання",
    description: "Заберіть своє замовлення у зручний час"
  }
];

export default function DeliveryPage() {
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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Delivery Steps */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Як це працює
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Delivery Info */}
        <Grid container spacing={4}>
          {deliveryInfo.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'primary.main' }}>
                    {section.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <List>
                    {section.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Наші переваги
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper sx={{ 
                  p: 3,
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
                  <Typography color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Important Notice */}
        <Alert 
          severity="info" 
          sx={{ 
            mt: 8,
            display: 'flex',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              fontSize: 40
            }
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h6">
              Важлива інформація
            </Typography>
            <Typography>
              Доставка термолабільних препаратів здійснюється в спеціальних термоконтейнерах, 
              що забезпечують необхідний температурний режим протягом усього шляху
            </Typography>
          </Stack>
        </Alert>
      </Container>
    </Box>
  );
} 