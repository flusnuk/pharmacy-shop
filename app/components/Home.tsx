"use client"

import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import Features from "./home/Features";
import PopularProducts from "./home/PopularProducts";
import WhyChooseUs from "./home/WhyChooseUs";
import Testimonials from "./home/Testimonials";
import ContactInfo from "./home/ContactInfo";
import CallToAction from "./home/CallToAction";

export default function Home() {
  return (
    <Box>
      <Carousel />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Features Section */}
        <Features />

        {/* Popular Products Section */}
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Популярні товари
        </Typography>
        <PopularProducts />

        {/* Why Choose Us Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Чому обирають нас
          </Typography>
          <WhyChooseUs />
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Відгуки наших клієнтів
          </Typography>
          <Testimonials />
        </Box>

        {/* Contact & Working Hours Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Контакти та графік роботи
          </Typography>
          <ContactInfo />
        </Box>

        {/* CTA Section */}
        <CallToAction />
      </Container>
    </Box>
  );
}