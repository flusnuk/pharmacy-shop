"use client"

import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, LinearProgress } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const slides = [
  {
    url: '/images/carousel/slide1.jpg',
    title: 'Ваше здоров\'я - наш пріоритет',
    description: 'Широкий вибір лікарських засобів за доступними цінами',
    accent: '#2196f3'
  },
  {
    url: '/images/carousel/slide2.jpg',
    title: 'Акційні пропозиції',
    description: 'Знижки до 30% на популярні препарати',
    accent: '#f44336'
  },
  {
    url: '/images/carousel/slide3.jpg',
    title: 'Професійні консультації',
    description: 'Наші фармацевти завжди готові вам допомогти',
    accent: '#4caf50'
  },
  {
    url: '/images/carousel/slide4.jpg',
    title: 'Швидка доставка',
    description: 'Доставляємо ліки по всій Україні',
    accent: '#ff9800'
  },
  {
    url: '/images/carousel/slide5.jpg',
    title: 'Програма лояльності',
    description: 'Отримуйте бонуси за кожного чорного друга',
    accent: '#9c27b0'
  }
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    if (!isPaused) {
      // Timer for slide change
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
      }, SLIDE_DURATION);

      // Timer for progress bar
      const progressInterval = 100; // Update progress every 100ms
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (100 / (SLIDE_DURATION / progressInterval));
        });
      }, progressInterval);
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isPaused]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '600px',
        overflow: 'hidden',
        '&:hover .MuiIconButton-root': {
          opacity: 1,
        },
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '0 10%',
            }}
          >
            <Box
              sx={{
                maxWidth: '600px',
                opacity: index === currentSlide ? 1 : 0,
                transform: index === currentSlide ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.5s ease-in-out 0.3s',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  marginBottom: 3,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                {slide.description}
              </Typography>
              <Box
                sx={{
                  width: '100px',
                  height: '4px',
                  backgroundColor: slide.accent,
                  marginTop: 2,
                }}
              />
            </Box>
          </Box>
        </Box>
      ))}

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          opacity: { xs: 1, md: 0 },
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <KeyboardArrowLeft sx={{ fontSize: 40 }} />
      </IconButton>

      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 32 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.3)',
          opacity: { xs: 1, md: 0 },
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <KeyboardArrowRight sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setProgress(0);
            }}
            sx={{
              width: 40,
              height: 4,
              bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
              },
            }}
          />
        ))}
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 2,
          '& .MuiLinearProgress-bar': {
            bgcolor: slides[currentSlide].accent,
          },
        }}
      />
    </Box>
  );
} 