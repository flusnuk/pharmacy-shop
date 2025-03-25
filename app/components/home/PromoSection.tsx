"use client"

import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';

export default function PromoSection() {
  return (
    <Box sx={{ 
      py: 8,
      bgcolor: 'grey.50'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: 400 }}>
              <Image
                src="/images/pharmacy-promo.jpg"
                alt="Promo"
                fill
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              Акція місяця
            </Typography>
            <Typography 
              variant="h5" 
              color="primary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Знижка 20% на всі вітаміни
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ mb: 4 }}
              color="text.secondary"
            >
              Зміцніть свій імунітет з нашими якісними вітамінами. 
              Акція діє до кінця місяця. Не пропустіть можливість 
              подбати про своє здоров&apos;я за вигідною ціною.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              href="/catalog/vitamins"
              sx={{ 
                px: 4,
                py: 1.5
              }}
            >
              Переглянути пропозицію
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 