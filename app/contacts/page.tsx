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
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
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
  Accessibility
} from '@mui/icons-material';
import { useState } from 'react';

const contactInfo = [
  {
    icon: <Phone sx={{ fontSize: 40 }} />,
    title: "Телефони",
    items: [
      "+380 (44) 123-45-67",
      "+380 (50) 987-65-43"
    ]
  },
  {
    icon: <Email sx={{ fontSize: 40 }} />,
    title: "Email",
    items: [
      "info@pharmacy.com",
      "support@pharmacy.com"
    ]
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: "Адреси аптек",
    items: [
      "м. Київ, вул. Хрещатик, 1",
      "м. Київ, просп. Перемоги, 50",
      "м. Київ, вул. Велика Васильківська, 100"
    ]
  },
  {
    icon: <AccessTime sx={{ fontSize: 40 }} />,
    title: "Графік роботи",
    items: [
      "Пн-Пт: 8:00 - 21:00",
      "Сб-Нд: 9:00 - 20:00"
    ]
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Зв`яжіться з нами
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Ми завжди готові допомогти вам та відповісти на всі запитання
          </Typography>
        </Box>

        {/* Contact Info Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    <Box sx={{ color: 'primary.main' }}>
                      {info.icon}
                    </Box>
                    <Typography variant="h6">
                      {info.title}
                    </Typography>
                    <Divider sx={{ width: '100%' }} />
                    {info.items.map((item, idx) => (
                      <Typography key={idx} color="text.secondary">
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4}>
          {/* Map */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 0, 
              height: '100%',
              overflow: 'hidden' 
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5275232677917!2d30.521112776880714!3d50.44871657159344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce56b2456d3b%3A0xd062ae171b57e947!2z0YPQuy4g0JrRgNC10YnQsNGC0LjQuiwg0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1709675986421!5m2!1sru!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Напишіть нам
              </Typography>
              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Дякуємо за ваше повідомлення! Ми зв`яжемося з вами найближчим часом.
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Ім'я"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    label="Повідомлення"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                  >
                    Надіслати
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>


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
      </Container>
    </Box>
  );
} 