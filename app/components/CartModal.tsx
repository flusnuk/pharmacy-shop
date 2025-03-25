"use client"

import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  IconButton,
  Stack,
  Tooltip,
  Backdrop,
  Fade
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  LocalPharmacy,
  LocalShipping,
  Payment,
  Info
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CartItem } from '../types/types';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (medicineId: number) => void;
  onUpdateQuantity: (medicineId: number, quantity: number) => void;
}

export default function CartModal({ 
  open, 
  onClose, 
  cartItems, 
  onRemoveFromCart,
  onUpdateQuantity 
}: CartModalProps) {
  const router = useRouter();
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: 700 },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box sx={{ 
            p: 2, 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <LocalPharmacy />
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
              Кошик замовлення
            </Typography>
            <IconButton 
              onClick={onClose} 
              size="small" 
              sx={{ 
                color: 'white',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <LocalPharmacy sx={{ fontSize: 48, color: 'primary.main', opacity: 0.5 }} />
                <Typography color="text.secondary">
                  Ваш кошик порожній
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    onClose();
                    router.push('/catalog');
                  }}
                >
                  Перейти до каталогу
                </Button>
              </Box>
            ) : (
              <>
                <List disablePadding>
                  {cartItems.map((item) => (
                    <ListItem
                      key={item.medicine.id}
                      sx={{
                        bgcolor: 'grey.50',
                        mb: 1,
                        borderRadius: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: 1,
                        p: 2
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {item.medicine.name}
                          </Typography>
                          <Tooltip title="Рецептурний препарат" arrow>
                            <Info fontSize="small" color="primary" />
                          </Tooltip>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {item.medicine.description}
                        </Typography>
                        <Typography variant="subtitle2" color="primary.main" sx={{ mt: 1 }}>
                          {item.medicine.price} грн × {item.quantity} = {item.medicine.price * item.quantity} грн
                        </Typography>
                      </Box>
                      <Stack 
                        direction="row" 
                        alignItems="center" 
                        spacing={1}
                        sx={{ 
                          bgcolor: 'background.paper',
                          borderRadius: 1,
                          p: 0.5
                        }}
                      >
                        <IconButton 
                          size="small"
                          onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onRemoveFromCart(item.medicine.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'success.light', 
                  color: 'white',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <LocalShipping />
                  <Typography variant="body2">
                    {totalPrice >= 1000 
                      ? 'Безкоштовна доставка доступна для вашого замовлення'
                      : `Додайте товарів ще на ${1000 - totalPrice} грн для безкоштовної доставки`}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

          {cartItems.length > 0 && (
            <Box sx={{ 
              p: 3, 
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'grey.50'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Загальна сума:</Typography>
                <Typography variant="h6" color="primary.main">{totalPrice} грн</Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={onClose}
                  fullWidth
                  startIcon={<LocalPharmacy />}
                >
                  Продовжити покупки
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onClose();
                    router.push('/cart');
                  }}
                  fullWidth
                  startIcon={<Payment />}
                >
                  Оформити замовлення
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
} 