"use client"

import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  Stack,
  Fade
} from '@mui/material';
import { CheckCircle, Home, ShoppingBag } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
}

export default function OrderSuccessModal({ open, onClose, orderNumber }: OrderSuccessModalProps) {
  const router = useRouter();

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
          borderRadius: 2,
          p: 4,
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          textAlign: 'center'
        }}>
          <CheckCircle sx={{ 
            fontSize: 64, 
            color: 'success.main',
            mb: 2
          }} />
          
          <Typography variant="h5" gutterBottom>
            Замовлення успішно оформлено!
          </Typography>
          
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Дякуємо за ваше замовлення. Номер вашого замовлення:
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              bgcolor: 'grey.100',
              py: 1,
              px: 2,
              borderRadius: 1,
              display: 'inline-block',
              mb: 3
            }}
          >
            №{orderNumber}
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Ми надіслали деталі замовлення на вашу електронну пошту. 
            Ви можете відстежувати статус замовлення в особистому кабінеті.
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingBag />}
              onClick={() => router.push('/')}
              sx={{
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              Мої замовлення
            </Button>
            <Button
              variant="text"
              startIcon={<Home />}
              onClick={() => router.push('/')}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
              Повернутися на головну
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
} 