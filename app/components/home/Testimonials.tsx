"use client"

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Rating, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const testimonials = [
  {
    name: "Марія Петренко",
    rating: 5,
    comment: "Чудовий сервіс! Завжди можна знайти потрібні ліки за хорошою ціною.",
    date: "15.03.2024"
  },
  {
    name: "Іван Ковальчук",
    rating: 5,
    comment: "Дуже швидка доставка та професійні консультації фармацевтів.",
    date: "12.03.2024"
  },
  {
    name: "Олена Сидоренко",
    rating: 4,
    comment: "Зручний сайт, великий вибір препаратів. Рекомендую!",
    date: "10.03.2024"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const visibleTestimonials = isMobile
    ? [testimonials[currentIndex]]
    : [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length]
      ];

  return (
    <Box sx={{ position: 'relative', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          transition: 'transform 0.3s ease-in-out',
          mx: 'auto',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        {visibleTestimonials.map((testimonial, index) => (
          <Card
            key={index}
            sx={{
              flex: 1,
              maxWidth: isMobile ? '100%' : '350px',
              minWidth: isMobile ? '100%' : '300px',
              transform: `scale(${index === 1 ? 1.05 : 1})`,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              boxShadow: index === 1 ? theme.shadows[4] : theme.shadows[1],
            }}
          >
            <CardContent>
              <Rating 
                value={testimonial.rating} 
                readOnly 
                sx={{ 
                  mb: 2,
                  '& .MuiRating-iconFilled': {
                    color: theme.palette.primary.main,
                  }
                }} 
              />
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontStyle: 'italic',
                  minHeight: '80px'
                }}
              >
                &quot;{testimonial.comment}&quot;
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.primary.main 
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {testimonial.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
          boxShadow: theme.shadows[2],
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
          boxShadow: theme.shadows[2],
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
} 