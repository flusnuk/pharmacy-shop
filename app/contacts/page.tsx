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
  Alert
} from '@mui/material';
import { 
  Phone, 
  Email, 
  LocationOn, 
  AccessTime, 
  Send 
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
    // Here you would typically send the data to your backend
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Контакти
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Info */}
        {contactInfo.map((info, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <Box sx={{ color: 'primary.main' }}>
                  {info.icon}
                </Box>
                <Typography variant="h6">
                  {info.title}
                </Typography>
                {info.items.map((item, idx) => (
                  <Typography key={idx} color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}

        {/* Map */}
        <Grid item xs={12}>
          <Paper sx={{ p: 0, height: 400, overflow: 'hidden' }}>
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
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Зв&apos;яжіться з нами
            </Typography>
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Дякуємо за ваше повідомлення! Ми зв&apos;яжемося з вами найближчим часом.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ім'я"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Повідомлення"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                  >
                    Надіслати
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
} 