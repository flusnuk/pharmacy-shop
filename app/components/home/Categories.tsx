"use client"

import { Box, Container, Typography, Grid, Paper, alpha } from '@mui/material';
import { 
  Healing, 
  LocalHospital, 
  Favorite, 
  Visibility,
  Spa,
  ChildCare,
  Elderly,
  Medication
} from '@mui/icons-material';

const categories = [
  {
    icon: <Healing />,
    title: "Ліки від болю",
    color: "#2196f3"
  },
  {
    icon: <LocalHospital />,
    title: "Антибіотики",
    color: "#f44336"
  },
  {
    icon: <Favorite />,
    title: "Серцево-судинні",
    color: "#e91e63"
  },
  {
    icon: <Visibility />,
    title: "Офтальмологія",
    color: "#9c27b0"
  },
  {
    icon: <Spa />,
    title: "Вітаміни",
    color: "#4caf50"
  },
  {
    icon: <ChildCare />,
    title: "Дитячі ліки",
    color: "#ff9800"
  },
  {
    icon: <Elderly />,
    title: "Геріатрія",
    color: "#795548"
  },
  {
    icon: <Medication />,
    title: "Противірусні",
    color: "#607d8b"
  }
];

export default function Categories() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Категорії ліків
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    bgcolor: alpha(category.color, 0.1),
                    '& .icon': {
                      bgcolor: category.color,
                      transform: 'scale(1.1)',
                    }
                  }
                }}
              >
                <Box
                  className="icon"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(category.color, 0.8),
                    color: 'white',
                    mb: 2,
                    transition: 'all 0.3s',
                    '& svg': {
                      fontSize: 32
                    }
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="h6">
                  {category.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 