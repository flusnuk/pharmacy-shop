"use client"

import { Grid, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { CheckCircle } from '@mui/icons-material';

const benefits = [
  "Всі ліки сертифіковані",
  "Швидка доставка по всій Україні",
  "Професійні консультації",
  "Конкурентні ціни",
  "Програма лояльності",
   "Зручні способи оплати",
  "Цілодобова підтримка клієнтів",
  "Персональні рекомендації від експертів",
  "Можливість передзамовлення рідкісних ліків",
  "Безкоштовна консультація фармацевта"
];

export default function WhyChooseUs() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <List>
          {benefits.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        Наша команда
        <Box
          component="img"
          src="/images/pharmacy-team.jpg"
          alt="Наша команда"
          sx={{
            width: '100%',
            height: '450px',
            borderRadius: 2,
          }}
        />
      </Grid>
    </Grid>
  );
} 