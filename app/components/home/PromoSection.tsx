"use client"

import { memo } from 'react';
import { Box, Container, Grid, Typography, Button, useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';

const PromoContent = memo(() => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} md={6}>
      <Typography 
        variant="h3" 
        component="h2"
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '2rem', md: '2.5rem' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: 80,
            height: 4,
            background: theme.palette.secondary.main,
            borderRadius: 2
          }
        }}
      >
        Акція місяця
      </Typography>
      <Typography 
        variant="h5" 
        component="p"
        color="text.secondary"
        sx={{ 
          mb: 4,
          maxWidth: 500
        }}
      >
        Знижка 20% на всі вітаміни та мінерали для підтримки імунітету
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        size="large"
        endIcon={<ArrowForward />}
        href="/catalog/vitamins"
        sx={{ 
          px: 4,
          py: 1.5,
          borderRadius: 3,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: `0 8px 20px ${theme.palette.primary.main}40`
          }
        }}
      >
        Переглянути пропозицію
      </Button>
    </Grid>
  );
});

const PromoImage = memo(() => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          position: 'relative',
          height: 400,
          borderRadius: 4,
          overflow: 'hidden',
          transform: 'perspective(1000px) rotateY(-5deg)',
          transition: 'transform 0.3s ease',
          boxShadow: `0 20px 40px ${theme.palette.primary.main}20`,
          '&:hover': {
            transform: 'perspective(1000px) rotateY(0deg)'
          }
        }}
      >
        <Image
          src="/images/promo-vitamins.jpg"
          alt="Vitamins Promotion"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </Box>
    </Grid>
  );
});

const PromoSection = memo(() => {
  const theme = useTheme();

  return (
    <Box 
      component="section"
      sx={{ 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
          zIndex: -1,
          pointerEvents: 'none'
        }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <PromoContent />
          <PromoImage />
        </Grid>
      </Container>
    </Box>
  );
});

PromoContent.displayName = 'PromoContent';
PromoImage.displayName = 'PromoImage';
PromoSection.displayName = 'PromoSection';

export default PromoSection; 