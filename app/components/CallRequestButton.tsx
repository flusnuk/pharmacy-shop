"use client"

import { useState } from 'react';
import { Fab, Zoom, useTheme, alpha } from '@mui/material';
import { Phone as PhoneIcon } from '@mui/icons-material';
import CallRequestModal from './CallRequestModal';

export default function CallRequestButton() {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="Замовити дзвінок"
          onClick={() => setIsModalOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            zIndex: 1000,
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s ease',
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
          }}
        >
          <PhoneIcon />
        </Fab>
      </Zoom>

      <CallRequestModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 