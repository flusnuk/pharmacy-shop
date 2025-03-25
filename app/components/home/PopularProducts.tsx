"use client"

import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  Rating,
  Chip,
  Stack
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Image from 'next/image'; 

const products = [
  {
    id: 1,
    name: "Парацетамол",
    price: 45.99,
    rating: 4.5,
    image: "/images/products/paracetamol.jpg",
    isNew: true,
    discount: 15
  },
  // Add more products...
];

export default function PopularProducts() {
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Популярні товари
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                {product.isNew && (
                  <Chip
                    label="Новинка"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1
                    }}
                  />
                )}
                {product.discount && (
                  <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1
                    }}
                  />
                )}
                <Box sx={{ 
                  position: 'relative',
                  height: 200,
                  width: '100%'
                }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Rating value={product.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      ({product.rating})
                    </Typography>
                  </Stack>
                  <Typography variant="h5" color="primary.main">
                    {product.price} грн
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained"
                    startIcon={<ShoppingCart />}
                  >
                    В кошик
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 