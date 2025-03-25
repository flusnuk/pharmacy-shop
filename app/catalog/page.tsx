"use client"

import { 
  Container, 
  Typography, 
  Box,
  useTheme,
  Paper,
  Fade
} from '@mui/material';
import { LocalPharmacy, Search, Category } from '@mui/icons-material';
import Catalog from "../components/Catalog";

export default function CatalogPage() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      pb: 8,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
        zIndex: -1
      }
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 8, md: 12 },
        mb: { xs: 4, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))',
          zIndex: 1
        }
      }}>
        {/* Декоративні елементи */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30)`,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.light}30, ${theme.palette.primary.light}30)`,
            zIndex: 0
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <LocalPharmacy sx={{ 
                fontSize: { xs: 60, md: 80 },
                mb: 2,
                color: 'white',
                opacity: 0.9
              }} />
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 100,
                    height: 4,
                    background: theme.palette.secondary.main,
                    borderRadius: 2
                  }
                }}
              >
                Каталог товарів
              </Typography>
              <Typography 
                variant="h5"
                sx={{ 
                  textAlign: 'center',
                  maxWidth: 800,
                  mx: 'auto',
                  opacity: 0.9,
                  mb: 4
                }}
              >
                Широкий вибір ліків та товарів для вашого здоров`я
              </Typography>

              {/* Features */}
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
                flexWrap: 'wrap',
                mt: 4
              }}>
                {[
                  { icon: <Search />, text: "Зручний пошук" },
                  { icon: <Category />, text: "Категорії товарів" },
                  { icon: <LocalPharmacy />, text: "Якісні препарати" }
                ].map((feature, index) => (
                  <Paper
                    key={index}
                    sx={{
                      px: 3,
                      py: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        bgcolor: 'rgba(255,255,255,0.15)'
                      }
                    }}
                  >
                    {feature.icon}
                    <Typography>{feature.text}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Catalog />
      </Container>
    </Box>
  );
} 