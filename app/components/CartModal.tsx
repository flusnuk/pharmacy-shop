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
  Fade,
  Badge,
  Divider,
  Paper
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  LocalPharmacy,
  LocalShipping,
  Payment,
  Info,
  ShoppingCart
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CartItem } from '../types/types';
import Image from 'next/image';
import { getImageUrl } from '../utils/imageUtils';

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
          boxShadow: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <Box sx={{ 
            p: 2, 
            bgcolor: 'primary.main', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Badge badgeContent={cartItems.length} color="error" sx={{ mr: 1 }}>
              <ShoppingCart />
            </Badge>
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

          {/* Content */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <Paper sx={{ 
                p: 4,
                textAlign: 'center', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                bgcolor: 'grey.50'
              }}>
                <LocalPharmacy sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary">
                  Ваш кошик порожній
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Додайте необхідні ліки з нашого каталогу
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    onClose();
                    router.push('/catalog');
                  }}
                  startIcon={<ShoppingCart />}
                >
                  Перейти до каталогу
                </Button>
              </Paper>
            ) : (
              <>
                <List disablePadding>
                  {cartItems.map((item) => (
                    <Paper
                      key={item.medicine.id}
                      elevation={0}
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          borderColor: 'primary.main',
                        }
                      }}
                    >
                      <ListItem
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 2,
                          p: 2
                        }}
                      >
                        {/* Product Image */}
                        <Box sx={{ 
                          position: 'relative',
                          width: { xs: '100%', sm: 100 },
                          height: { xs: 150, sm: 100 },
                          borderRadius: 1,
                          overflow: 'hidden',
                          bgcolor: 'grey.100'
                        }}>
                          <Image
                            src={getImageUrl(item.medicine.imageUrl)}
                            alt={item.medicine.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 768px) 100vw, 100px"
                            priority={false}
                            quality={75}
                          />
                        </Box>

                        {/* Product Info */}
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {item.medicine.name}
                              </Typography>
                              {item.medicine.id && (
                                <Tooltip title="Рецептурний препарат" arrow>
                                  <Info fontSize="small" color="primary" />
                                </Tooltip>
                              )}
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {item.medicine.description}
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                              {item.medicine.price} грн
                            </Typography>
                          </Stack>
                        </Box>

                        {/* Actions */}
                        <Stack 
                          direction="row" 
                          alignItems="center" 
                          spacing={1}
                          sx={{ 
                            bgcolor: 'grey.50',
                            borderRadius: 1,
                            p: 1
                          }}
                        >
                          <IconButton 
                            size="small"
                            onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ 
                            minWidth: 40, 
                            textAlign: 'center',
                            fontWeight: 500 
                          }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <Divider orientation="vertical" flexItem />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onRemoveFromCart(item.medicine.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </ListItem>
                    </Paper>
                  ))}
                </List>

                <Paper sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'success.light', 
                  color: 'white',
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
                </Paper>
              </>
            )}
          </Box>

          {/* Footer */}
          {cartItems.length > 0 && (
            <Box sx={{ 
              p: 3, 
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'grey.50'
            }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Загальна сума:</Typography>
                  <Typography variant="h5" color="primary.main" fontWeight="600">
                    {totalPrice} грн
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={onClose}
                    fullWidth
                    startIcon={<LocalPharmacy />}
                    sx={{
                      py: 1.5,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: 'primary.light',
                      }
                    }}
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
                    sx={{
                      py: 1.5,
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      }
                    }}
                  >
                    Оформити замовлення
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
} 