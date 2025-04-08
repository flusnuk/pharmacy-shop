"use client"

import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';

const trendingCategories = [
  {
    title: "Противірусні препарати",
    image: "/images/categories/antiviral.jpg",
    link: "/catalog"
  },
  {
    title: "Знеболюючі засоби",
    image: "/images/categories/painkillers.jpg",
    link: "/catalog"
  },
  {
    title: "Засоби гігієни",
    image: "/images/categories/hygiene.jpg",
    link: "/catalog"
  },
  {
    title: "Вітаміни та добавки",
    image: "/images/categories/vitamins.jpg",
    link: "/catalog"
  },
];

export default function TrendingCategories() {
  return (
    <Box sx={{ my: 8 }}>
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
  );
} 