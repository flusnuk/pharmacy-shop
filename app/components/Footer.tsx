"use client"

import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Email, 
  LocationOn,
  LocalPharmacy
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
 if (pathname === '/cart') return null;

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalPharmacy />
                <Typography variant="h6">Pharmacy Shop</Typography>
              </Box>
              <Typography variant="body2">
                Ваше здоров&apos;я - наш пріоритет. Ми забезпечуємо якісні ліки та професійну консультацію.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="inherit" size="small">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <Twitter />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Контакти
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography>+380 (44) 123-45-67</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Email fontSize="small" />
                <Typography>info@pharmacy.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography>м. Львів, вул. Дністерська, 5</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Швидкі посилання
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="inherit" underline="hover">
                Про нас
              </Link>
              <Link href="/delivery" color="inherit" underline="hover">
                Доставка
              </Link>
              <Link href="/contacts" color="inherit" underline="hover">
                Контакти
              </Link>
              <Link href="/privacy" color="inherit" underline="hover">
                Політика конфіденційності
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Pharmacy Shop. Всі права захищені.
        </Typography>
      </Container>
    </Box>
  );
} 