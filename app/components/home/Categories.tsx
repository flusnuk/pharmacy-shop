"use client"

import { memo } from 'react';
import { Box, Container, Typography, Grid, Paper, alpha, useTheme } from '@mui/material';
import { 
  Healing, 
  LocalHospital, 
  Favorite, 
  Visibility,
  Spa,
  ChildCare,
  Elderly,
  Medication
} from '@mui/icons-material';

const categories = [
  {
    icon: <Healing />,
    title: "Ліки від болю",
    color: "#2196f3",
    gradient: "linear-gradient(135deg, #2196f3, #21CBF3)"
  },
  {
    icon: <LocalHospital />,
    title: "Антибіотики",
    color: "#f44336",
    gradient: "linear-gradient(135deg, #f44336, #ff7961)"
  },
  {
    icon: <Favorite />,
    title: "Серцево-судинні",
    color: "#e91e63",
    gradient: "linear-gradient(135deg, #e91e63, #ff4081)"
  },
  {
    icon: <Visibility />,
    title: "Офтальмологія",
    color: "#9c27b0",
    gradient: "linear-gradient(135deg, #9c27b0, #d05ce3)"
  },
  {
    icon: <Spa />,
    title: "Вітаміни",
    color: "#4caf50",
    gradient: "linear-gradient(135deg, #4caf50, #80e27e)"
  },
  {
    icon: <ChildCare />,
    title: "Дитячі ліки",
    color: "#ff9800",
    gradient: "linear-gradient(135deg, #ff9800, #ffc947)"
  },
  {
    icon: <Elderly />,
    title: "Геріатрія",
    color: "#795548",
    gradient: "linear-gradient(135deg, #795548, #a1887f)"
  },
  {
    icon: <Medication />,
    title: "Противірусні",
    color: "#607d8b",
    gradient: "linear-gradient(135deg, #607d8b, #90a4ae)"
  }
] as const;

const CategoryCard = memo(({ category }: { 
  category: typeof categories[number];
  index: number;
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        sx={{
          p: 3,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          cursor: 'pointer',
          transition: 'transform 0.3s ease-in-out',
          background: 'white',
          '&:hover': {
            transform: 'translateY(-8px)',
            '& .category-icon-wrapper': {
              background: category.gradient,
              transform: 'scale(1.1)',
              '& svg': {
                transform: 'rotate(360deg)',
                color: 'white'
              }
            },
            '& .category-title': {
              color: category.color
            },
            '&::after': {
              transform: 'scale(1)'
            }
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 4,
            background: category.gradient,
            transform: 'scale(0)',
            transition: 'transform 0.3s ease-in-out',
            transformOrigin: 'center'
          }
        }}
      >
        <Box
          className="category-icon-wrapper"
          sx={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha(category.color, 0.1),
            mb: 2,
            transition: 'all 0.3s ease-in-out',
            '& svg': {
              fontSize: 35,
              color: category.color,
              transition: 'all 0.6s ease-in-out'
            }
          }}
        >
          {category.icon}
        </Box>
        <Typography
          className="category-title"
          variant="h6"
          sx={{
            fontWeight: 600,
            transition: 'color 0.3s ease-in-out'
          }}
        >
          {category.title}
        </Typography>
      </Paper>
    </Grid>
  );
});

CategoryCard.displayName = 'CategoryCard';

const Categories = memo(() => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, position: 'relative' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Категорії ліків
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.title} 
              category={category} 
              index={index} 
            />
          ))}
        </Grid>
      </Container>
      
      {/* Декоративні елементи */}
      <Box
        component="span"
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      <Box
        component="span"
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.1)})`,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
});

Categories.displayName = 'Categories';

export default Categories; 