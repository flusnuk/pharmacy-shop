"use client"

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function CallToAction() {
  return (
    <Box 
      sx={{ 
        textAlign: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        p: 6,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Потрібні ліки?
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Знайдіть все необхідне в нашому каталозі
      </Typography>
      <Button
        component={Link}
        href="/catalog"
        variant="contained"
        size="large"
        sx={{ 
          px: 4,
          bgcolor: 'white',
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'grey.100',
          }
        }}
      >
        Перейти до каталогу
      </Button>
    </Box>
  );
} 