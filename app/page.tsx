"use client"

import { Box, Container, Typography, useTheme } from "@mui/material";
import HeroSection from './components/home/HeroSection';
import StatsSection from "./components/home/StatsSection";
import Features from './components/home/Features';
import TrendingCategories from "./components/home/TrendingCategories";
import WhyChooseUs from './components/home/WhyChooseUs';
import Testimonials from './components/home/Testimonials';
import ContactInfo from './components/home/ContactInfo';
import CtaSection from "./components/home/CtaSection";

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      <HeroSection />
      
      <Container maxWidth="lg">
        <Box sx={{ 
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: -200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: theme.palette.primary.light,
            opacity: 0.1,
            zIndex: -1
          }
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              textAlign: 'center', 
              mt: 14,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Наші досягнення
          </Typography>
          <StatsSection />
        </Box>

        <Box sx={{ 
          my: 12,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -100,
            right: -150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: theme.palette.secondary.light,
            opacity: 0.1,
            zIndex: -1
          }
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 6, 
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                background: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Наші особливості
          </Typography>
          <Features />
        </Box>

        <Box sx={{ 
          bgcolor: 'grey.50',
          py: 8,
          px: 4,
          borderRadius: 4,
          boxShadow: `0 0 40px ${theme.palette.primary.light}25`
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: theme.palette.primary.main
            }}
          >
            Популярні категорії
          </Typography>
          <TrendingCategories />
        </Box>

        <Box sx={{ 
          my: 12, 
          bgcolor: 'primary.main',
          py: 8,
          px: 6,
          borderRadius: 4,
          color: 'white',
          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: 'white'
            }}
          >
            Чому обирають нас
          </Typography>
          <WhyChooseUs />
        </Box>

        <Box sx={{ 
          position: 'relative',
          my: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: -100,
            width: 200,
            height: 200,
            background: `linear-gradient(45deg, ${theme.palette.secondary.light}40, ${theme.palette.primary.light}40)`,
            borderRadius: '50%',
            transform: 'translateY(-50%)',
            zIndex: -1
          }
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 6,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Відгуки наших клієнтів
          </Typography>
          <Testimonials />
        </Box>

        <Box sx={{ 
          bgcolor: 'grey.50',
          p: 6,
          borderRadius: 4,
          mb: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              color: theme.palette.primary.main
            }}
          >
            Контакти та графік роботи
          </Typography>
          <ContactInfo />
        </Box>
        
        <CtaSection />
      </Container>
    </Box>
  );
}
