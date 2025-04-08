"use client"

import { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  TextField,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Alert,
  Stack
} from '@mui/material';
import { Close as CloseIcon, Phone as PhoneIcon } from '@mui/icons-material';

interface CallRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const PHONE_REGEX = /^\+?3?8?(0\d{9})$/;

export default function CallRequestModal({ open, onClose }: CallRequestModalProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const errors = {
      name: '',
      phone: ''
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Ім'я обов'язкове";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Номер телефону обов'язковий";
      isValid = false;
    } else if (!PHONE_REGEX.test(formData.phone)) {
      errors.phone = "Введіть коректний український номер телефону";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/call-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/[^\d+]/g, '')
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Помилка при відправці запиту');
      }

      setSuccess(true);
      setFormData({ name: '', phone: '' });
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : 'Помилка при відправці запиту. Спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Fade in={open}>
        <Box sx={{
          bgcolor: 'background.paper',
          borderRadius: 3,
          p: 4,
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          boxShadow: theme.shadows[24],
        }}>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 2
              }}
            >
              <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </Box>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Замовити дзвінок
            </Typography>
            <Typography color="text.secondary">
              Залиште свої контактні дані, і наш консультант зв&apos;яжеться з вами найближчим часом
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Дякуємо! Ми зв&apos;яжемося з вами найближчим часом.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Ваше ім'я"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
                placeholder="Іван"
              />

              <TextField
                fullWidth
                label="Номер телефону"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+380"
                required
                error={!!formErrors.phone}
                helperText={formErrors.phone || "Формат: +380XXXXXXXXX"}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                startIcon={<PhoneIcon />}
                sx={{
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  borderRadius: 2
                }}
              >
                {isSubmitting ? 'Відправка...' : 'Замовити дзвінок'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
} 