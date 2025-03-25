"use client"

import { Grid, Paper, Box, Typography } from "@mui/material";
import { LocalPharmacy, LocalShipping, Support, Security } from '@mui/icons-material';

const features = [
  {
    icon: <LocalPharmacy sx={{ fontSize: 40 }} />,
    title: "Якісні ліки",
    description: "Тільки сертифіковані препарати від перевірених виробників"
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "Швидка доставка",
    description: "Доставляємо по всій Україні протягом 1-2 днів"
  },
  {
    icon: <Support sx={{ fontSize: 40 }} />,
    title: "Професійна консультація",
    description: "Наші фармацевти завжди готові відповісти на ваші запитання"
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: "Безпечні покупки",
    description: "Захищені платежі та гарантія якості товару"
  }
];

export default function Features() {
  return (
    <Grid container spacing={4} sx={{ mb: 8 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              textAlign: 'center',
              backgroundColor: 'transparent',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{ color: 'primary.main', mb: 2 }}>
              {feature.icon}
            </Box>
            <Typography variant="h6" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
} 