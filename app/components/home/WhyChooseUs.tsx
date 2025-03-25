"use client"

import { Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
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
  // Розділяємо масив на два підмасиви
  const halfLength = Math.ceil(benefits.length / 2);
  const firstColumn = benefits.slice(0, halfLength);
  const secondColumn = benefits.slice(halfLength);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <List>
          {firstColumn.map((item, index) => (
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
        <List>
          {secondColumn.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
} 