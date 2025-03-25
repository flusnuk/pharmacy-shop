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
  Backdrop,
  Fade,
  Badge,
  Divider,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  LocalPharmacy,
  LocalShipping,
  Payment,
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

// Додайте константу для вартості доставки
const DELIVERY_COST = 140;
const FREE_DELIVERY_THRESHOLD = 1000;

export default function CartModal({ 
  open, 
  onClose, 
  cartItems, 
  onRemoveFromCart,
  onUpdateQuantity 
}: CartModalProps) {
  const router = useRouter();
  const theme = useTheme();
  const subtotalPrice = cartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
  const deliveryCost = subtotalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_COST;
  const totalPrice = subtotalPrice + deliveryCost;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backgroundColor: alpha(theme.palette.background.default, 0.8) }
        },
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: 800 },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: theme.shadows[24],
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <Box sx={{ 
            p: 2.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Badge 
              badgeContent={cartItems.length} 
              color="error"
              sx={{ 
                '& .MuiBadge-badge': {
                  bgcolor: 'error.main',
                  color: 'white',
                }
              }}
            >
              <ShoppingCart />
            </Badge>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Кошик замовлення
            </Typography>
            <IconButton 
              onClick={onClose}
              size="small"
              sx={{ 
                color: 'inherit',
                '&:hover': { 
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  border: '2px dashed',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  borderRadius: 2
                }}
              >
                <LocalPharmacy sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Ваш кошик порожній
                </Typography>
                <Typography color="text.secondary">
                  Додайте необхідні ліки з нашого каталогу
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    onClose();
                    router.push('/catalog');
                  }}
                  startIcon={<ShoppingCart />}
                  sx={{ 
                    mt: 2,
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    boxShadow: theme.shadows[2]
                  }}
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
                        borderRadius: 2,
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4]
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
                          width: { xs: '100%', sm: 120 },
                          height: { xs: 120, sm: 120 },
                          borderRadius: 2,
                          overflow: 'hidden',
                          bgcolor: alpha(theme.palette.primary.main, 0.03),
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1)
                        }}>
                          <Image
                            src={getImageUrl(item.medicine.imageUrl)}
                            alt={item.medicine.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 768px) 100vw, 120px"
                            priority={false}
                            quality={75}
                          />
                        </Box>

                        {/* Product Info */}
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack spacing={1}>
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                              {item.medicine.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.medicine.description}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              color="primary.main"
                              sx={{ fontWeight: 600 }}
                            >
                              {item.medicine.price * item.quantity} грн
                            </Typography>
                          </Stack>
                        </Box>

                        {/* Actions */}
                        <Stack 
                          direction="row" 
                          alignItems="center" 
                          spacing={1}
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.03),
                            p: 1,
                            borderRadius: 2
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => onUpdateQuantity(item.medicine.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            sx={{
                              '&:not(.Mui-disabled):hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main'
                              }
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography 
                            sx={{ 
                              minWidth: 32,
                              textAlign: 'center',
                              fontWeight: 600
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => onUpdateQuantity(item.medicine.id, item.quantity + 1)}
                            sx={{
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main'
                              }
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                          <Divider orientation="vertical" flexItem />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => onRemoveFromCart(item.medicine.id)}
                            sx={{
                              '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.1)
                              }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </ListItem>
                    </Paper>
                  ))}
                </List>

                <Paper 
                  elevation={0}
                  sx={{ 
                    mt: 3, 
                    p: 2, 
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: 'success.dark',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.success.main, 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LocalShipping />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {subtotalPrice >= FREE_DELIVERY_THRESHOLD 
                      ? 'Безкоштовна доставка доступна для вашого замовлення'
                      : `Додайте товарів ще на ${FREE_DELIVERY_THRESHOLD - subtotalPrice} грн для безкоштовної доставки`}
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
              bgcolor: alpha(theme.palette.primary.main, 0.02)
            }}>
              <Stack spacing={2}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center' 
                }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 200 }}>
                      <Typography color="text.secondary">Товари:</Typography>
                      <Typography>{subtotalPrice} грн</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 200 }}>
                      <Typography color="text.secondary">Доставка:</Typography>
                      <Typography>
                        {deliveryCost === 0 
                          ? <span style={{ color: theme.palette.success.main }}>Безкоштовно</span>
                          : `${deliveryCost} грн`
                        }
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>
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
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        borderColor: 'primary.dark',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
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
                      borderRadius: 2,
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