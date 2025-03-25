"use client"

import { Box, Typography, Button } from "@mui/material";
import Link from 'next/link';

export default function CtaSection() {
  return (
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
  );
} 