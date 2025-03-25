"use client"

import { useState } from "react";
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography,
  Box
} from "@mui/material";
import { Medicine } from "../types/types";
import { cartService } from "../services/cartService";

const medicines: Medicine[] = [
  {
    id: 1, 
    name: "Парацетамол", 
    price: 50, 
    description: "Знеболюючий препарат",
    image: "/images/paracetamol.jpg",
    category: "Знеболюючі",
    inStock: true
  },
  { 
    id: 2, 
    name: "Ібупрофен", 
    price: 80, 
    description: "Протизапальний засіб",
    image: "/images/ibuprofen.jpg",
    category: "Протизапальні",
    inStock: true
  },
  { 
    id: 3, 
    name: "Но-шпа", 
    price: 60, 
    description: "Спазмолітик",
    image: "/images/no-spa.jpg",
    category: "Спазмолітики",
    inStock: true
  },
  // Add more medicines here
];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const addToCart = (medicine: Medicine) => {
    cartService.addItem(medicine);
    // Dispatch a storage event to update the navbar cart count
    window.dispatchEvent(new Event('storage'));
  };

  const filteredMedicines = selectedCategory === "all" 
    ? medicines 
    : medicines.filter(med => med.category === selectedCategory);

  const categories = ["all", ...new Set(medicines.map(med => med.category))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Каталог ліків
      </Typography>

      <Box sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            onClick={() => setSelectedCategory(category)}
            sx={{ mr: 1, mb: 1 }}
          >
            {category === "all" ? "Всі" : category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredMedicines.map((med) => (
          <Grid item xs={12} sm={6} md={4} key={med.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <Box 
                sx={{
                  height: 200,
                  backgroundImage: `url(${med.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>{med.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {med.description}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ fontWeight: 'bold' }}
                >
                  {med.price} грн
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={() => addToCart(med)}
                  disabled={!med.inStock}
                >
                  {med.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
