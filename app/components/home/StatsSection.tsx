"use client"

import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import { 
  TrendingUp,
  Star,
  HealthAndSafety,
  Support
} from '@mui/icons-material';

const stats = [
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    value: "50000+",
    label: "Задоволених клієнтів",
    description: "Понад 50 тисяч клієнтів довіряють нам"
  },
  {
    icon: <Star sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    value: "10000+",
    label: "Найменувань ліків",
    description: "Широкий вибір медикаментів"
  },
  {
    icon: <HealthAndSafety sx={{ fontSize: 40, color:'#FFFFFF' }} />,
    value: "100%",
    label: "Сертифіковані ліки",
    description: "Гарантована якість препаратів"
  },
  {
    icon: <Support sx={{ fontSize: 40, color: '#FFFFFF' }} />,
    value: "24/7",
    label: "Професійна підтримка",
    description: "Цілодобова консультація фахівців"
  }
];

export default function StatsSection() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                    borderColor: 'primary.main',
                    '& .icon-wrapper': {
                      backgroundColor: 'primary.main',
                      '& svg': {
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                <Box
                  className="icon-wrapper"
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    transition: 'all 0.3s ease',
                    '& svg': {
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography 
                  variant="h3" 
                  component="div"
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'primary.main',
                    mb: 1
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="h6" 
                  component="div"
                  sx={{ 
                    mb: 2,
                    fontWeight: 'medium'
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  {stat.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 