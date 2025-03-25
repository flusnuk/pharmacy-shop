"use client"

import { Box, Container, Typography } from "@mui/material";
import HeroSection from './components/home/HeroSection';
import StatsSection from "./components/home/StatsSection";
import Features from './components/home/Features';
import TrendingCategories from "./components/home/TrendingCategories";
import WhyChooseUs from './components/home/WhyChooseUs';
import Testimonials from './components/home/Testimonials';
import ContactInfo from './components/home/ContactInfo';
import CtaSection from "./components/home/CtaSection";

export default function Home() {
  return (
    <Box>
      <HeroSection />
      
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center', mt: 14}}>
          Наші досягнення
        </Typography>
        <StatsSection />

        <Typography variant="h4" component="h2" sx={{ mb: 4, mt: 8, textAlign: 'center' }}>
          Наші особливості
        </Typography>
        <Features />

        <Typography variant="h4" component="h2" sx={{ mb: 4, mt: 8, textAlign: 'center' }}>
          Популярні категорії
        </Typography>
        <TrendingCategories />

        <Box sx={{ my: 8, bgcolor: 'grey.50', py: 6, px: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
            Чому обирають нас
          </Typography>
          <WhyChooseUs />
        </Box>

        <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Відгуки наших клієнтів
        </Typography>
        <Testimonials />

        <Typography variant="h4" component="h2" sx={{ mb: 4, mt: 8, textAlign: 'center' }}>
          Контакти та графік роботи
        </Typography>
        <ContactInfo />
        
        <CtaSection />
      </Container>
    </Box>
  );
}
