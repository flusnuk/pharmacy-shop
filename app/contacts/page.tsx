"use client"

import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box, 
  TextField, 
  Button, 
  Stack,
  Alert,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  useTheme
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  AccessTime, 
  Send,
  WhatsApp,
  Telegram,
  Facebook,
  Instagram,
  LocalPharmacy,
  DirectionsCar,
  LocalParking,
  Accessibility,
  Map
} from '@mui/icons-material';
import { useState } from 'react';

const contactInfo = [
  {
    icon: <Phone sx={{ fontSize: 40 }} />,
    title: "Телефони",
    items: [
      "+380 44 123 4567",
      "+380 50 987 6543"
    ],
    color: "#2196f3",
    gradient: "linear-gradient(135deg, #2196f3, #21CBF3)"
  },
  {
    icon: <Email sx={{ fontSize: 40 }} />,
    title: "Email",
    items: [
      "info@pharmacy.com",
      "support@pharmacy.com"
    ],
    color: "#f44336",
    gradient: "linear-gradient(135deg, #f44336, #ff7961)"
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: "Адреси аптек",
    items: [
      "м. Київ, вул. Хрещатик, 1",
      "м. Київ, просп. Перемоги, 50",
      "м. Київ, вул. Велика Васильківська, 100"
    ],
    color: "#4caf50",
    gradient: "linear-gradient(135deg, #4caf50, #80e27e)"
  },
  {
    icon: <AccessTime sx={{ fontSize: 40 }} />,
    title: "Графік роботи",
    items: [
      "Пн-Пт: 8:00 - 21:00",
      "Сб-Нд: 9:00 - 20:00"
    ],
    color: "#ff9800",
    gradient: "linear-gradient(135deg, #ff9800, #ffc947)"
  }
];

const locationFeatures = [
  {
    icon: <DirectionsCar />,
    title: "Зручний доїзд",
    description: "Легко дістатися громадським або власним транспортом"
  },
  {
    icon: <LocalParking />,
    title: "Паркування",
    description: "Безкоштовна парковка для клієнтів аптеки"
  },
  {
    icon: <Accessibility />,
    title: "Доступність",
    description: "Зручний доступ для людей з обмеженими можливостями"
  },
  {
    icon: <LocalPharmacy />,
    title: "Повний асортимент",
    description: "Широкий вибір ліків та медичних товарів"
  }
];

const socialMedia = [
  { icon: <WhatsApp />, name: "WhatsApp", link: "https://wa.me/380441234567" },
  { icon: <Telegram />, name: "Telegram", link: "https://t.me/pharmacybot" },
  { icon: <Facebook />, name: "Facebook", link: "https://facebook.com/pharmacy" },
  { icon: <Instagram />, name: "Instagram", link: "https://instagram.com/pharmacy" }
];

export default function ContactsPage() {
  const theme = useTheme();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        mb: { xs: 4, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
          zIndex: 1
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Контакти
          </Typography>
          <Typography 
            variant="h5"
            sx={{ 
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
              opacity: 0.9,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Зв`яжіться з нами будь-яким зручним способом
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Contact Info Cards */}
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: { xs: 4, md: 6 } }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 20px ${info.color}40`,
                    '& .icon-wrapper': {
                      background: info.gradient,
                      '& svg': {
                        color: 'white',
                        transform: 'scale(1.1)'
                      }
                    }
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${info.color}20`,
                      mb: { xs: 1.5, md: 2 },
                      mx: 'auto',
                      transition: 'all 0.3s ease',
                      '& svg': {
                        color: info.color,
                        transition: 'all 0.3s ease'
                      }
                    }}
                  >
                    {info.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h3"
                    align="center"
                    gutterBottom
                    sx={{ mb: { xs: 1, md: 2 } }}
                  >
                    {info.title}
                  </Typography>
                  <Stack spacing={1} alignItems="center">
                    {info.items.map((item, idx) => (
                      <Typography 
                        key={idx}
                        variant="body1"
                        color="text.secondary"
                        align="center"
                        sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Map and Contact Form Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`,
            borderRadius: 4
          }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {/* Map Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', minHeight: { xs: 400, md: 500 } }}>
                <Typography 
                  variant="h5" 
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: { xs: 2, md: 3 }
                  }}
                >
                  <Map /> Наше розташування
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 400, md: 500 },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: `0 4px 20px ${theme.palette.primary.main}20`,
                    '&:hover': {
                      boxShadow: `0 8px 30px ${theme.palette.primary.main}30`,
                    }
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5275232677714!2d30.52233231573983!3d50.45046979547897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosINCa0LjRl9CyLCAwMjAwMA!5e0!3m2!1suk!2sua!4v1645523657889!5m2!1suk!2sua"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                  mb: { xs: 2, md: 3 }
                }}
              >
                Напишіть нам
              </Typography>
              {showAlert && (
                <Alert 
                  severity="success"
                  sx={{
                    mb: { xs: 2, md: 3 },
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.success.light}20, ${theme.palette.success.main}20)`,
                    border: `1px solid ${theme.palette.success.main}40`,
                    '& .MuiAlert-icon': {
                      color: theme.palette.success.main
                    },
                    animation: 'slideIn 0.5s ease-out',
                    '@keyframes slideIn': {
                      from: {
                        transform: 'translateY(-20px)',
                        opacity: 0
                      },
                      to: {
                        transform: 'translateY(0)',
                        opacity: 1
                      }
                    }
                  }}
                >
                  Дякуємо! Ваше повідомлення успішно надіслано. Ми зв`яжемося з вами найближчим часом.
                </Alert>
              )}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: { xs: 2, md: 3 } 
                }}
              >
                <TextField 
                  fullWidth 
                  label="Ім'я" 
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  type="email"
                  sx={{ bgcolor: 'white' }}
                />
                <TextField
                  fullWidth
                  label="Повідомлення"
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ bgcolor: 'white' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{
                    mt: { xs: 1, md: 2 },
                    py: { xs: 1.5, md: 2 },
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 8px 20px ${theme.palette.primary.main}40`
                    }
                  }}
                >
                  Надіслати
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Location Features */}
      <Box sx={{ mb: 6, mt: 6}}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Наші переваги
        </Typography>
        <Grid container spacing={4}>
          {locationFeatures.map((feature, index) => (
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
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Social Media Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Слідкуйте за нами
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          {socialMedia.map((social, index) => (
            <Tooltip key={index} title={social.name}>
              <IconButton 
                href={social.link} 
                target="_blank"
                sx={{ 
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    </Box>
  );
} 