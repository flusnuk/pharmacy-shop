"use client"

import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import { 
  TrendingUp,
  Star,
  HealthAndSafety,
  Support
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from './components/home/HeroSection';
import Features from './components/home/Features';
import WhyChooseUs from './components/home/WhyChooseUs';
import Testimonials from './components/home/Testimonials';
import ContactInfo from './components/home/ContactInfo';

const trendingCategories = [
  {
    title: "Противірусні препарати",
    image: "/images/categories/antiviral.jpg",
    link: "/catalog/antiviral"
  },
  {
    title: "Вітаміни та добавки",
    image: "/images/categories/vitamins.jpg",
    link: "/catalog/vitamins"
  },
  {
    title: "Знеболюючі засоби",
    image: "/images/categories/painkillers.jpg",
    link: "/catalog/painkillers"
  },
  {
    title: "Засоби гігієни",
    image: "/images/categories/hygiene.jpg",
    link: "/catalog/hygiene"
  }
];

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

export default function Home() {
  return (
    <Box>
      <HeroSection />
      
      <Container maxWidth="lg">
        {/* Stats Section */}
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

        {/* Features Section */}
        <Features />

        {/* Trending Categories */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom align="center">
            Популярні категорії
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {trendingCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Link href={category.link} style={{ textDecoration: 'none' }}>
                  <Paper 
                    sx={{ 
                      position: 'relative',
                      height: 200,
                      overflow: 'hidden',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Box sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 2,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white'
                    }}>
                      <Typography variant="h6">
                        {category.title}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
        <Box sx={{ my: 8, bgcolor: 'grey.50', py: 6, px: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Чому обирають нас
          </Typography>
          <WhyChooseUs />
        </Box>

        {/* Testimonials */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Відгуки наших клієнтів
          </Typography>
          <Testimonials />
        </Box>

        {/* Contact Info */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Контакти та графік роботи
          </Typography>
          <ContactInfo />
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            my: 8, 
            p: 6, 
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Потрібна консультація?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Наші фармацевти завжди готові допомогти вам з вибором ліків
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
            component={Link}
            href="/contacts"
          >
            Зв`язатися з нами
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
