"use client"

import { Grid, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AccessTime, Phone, Email, LocationOn } from '@mui/icons-material';

const workingHours = [
  { day: "Понеділок-П'ятниця", hours: "8:00 - 20:00" },
  { day: "Субота", hours: "9:00 - 18:00" },
  { day: "Неділя", hours: "9:00 - 16:00" }
];

export default function ContactInfo() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Графік роботи
          </Typography>
          <List>
            {workingHours.map((schedule, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <AccessTime color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={schedule.day}
                  secondary={schedule.hours}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Контактна інформація
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Phone color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="+380 (44) 123-45-67"
                secondary="Гаряча лінія"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="info@pharmacy.com"
                secondary="Email для запитань"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="м. Львів, вул. Дністерська, 5"
                secondary="Головний офіс Школа №73"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
} 