"use client"

import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button,
  IconButton,
  Stack,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Remove as RemoveIcon,
  LocalPharmacy,
  LocalShipping,
  Payment,
  ShoppingCart,
  Info,
  ArrowBack,
  LocationOn,
  Person
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { CartItem } from '../types/types';
import { cartService } from '../services/cartService';
import CreditCardForm from '../components/CreditCardForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import OrderSuccessModal from '../components/OrderSuccessModal';

const steps = ['Кошик', 'Доставка', 'Оплата', 'Підтвердження'];

interface DeliveryForm {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  deliveryType: 'nova' | 'ukrposhta' | 'address';
  department: string;
  address: string;
}

interface PaymentForm {
  method: 'card' | 'cash';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

const initialDeliveryForm: DeliveryForm = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  deliveryType: 'nova',
  department: '',
  address: '',
};

const initialPaymentForm: PaymentForm = {
  method: 'card',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>(initialDeliveryForm);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(initialPaymentForm);
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setCartItems(cartService.getCart());
  }, []);

  const removeFromCart = (medicineId: number) => {
    const updatedCart = cartService.removeItem(medicineId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    const updatedCart = cartService.updateQuantity(medicineId, quantity);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);

  const handleDeliveryFormChange = (field: keyof DeliveryForm) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setDeliveryForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handlePaymentFormChange = (field: keyof PaymentForm) => (
    value: string | React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value : value.target.value
    }));
  };

  const isDeliveryFormValid = () => {
    const { firstName, lastName, phone, city, deliveryType, department, address } = deliveryForm;
    if (!firstName || !lastName || !phone || !city) return false;
    if (deliveryType === 'address' && !address) return false;
    if (deliveryType !== 'address' && !department) return false;
    return true;
  };

  const isPaymentFormValid = () => {
    const { method, cardNumber, cardExpiry, cardCvv } = paymentForm;
    if (method === 'card') {
      return cardNumber && cardExpiry && cardCvv;
    }
    return true;
  };

  const handleOrderConfirm = () => {
    const newOrderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderNumber(newOrderNumber);
    
    cartService.clearCart();
    
    setIsSuccessModalOpen(true);
  };

  const renderDeliveryStep = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalShipping color="primary" />
            Інформація про доставку
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            {/* Personal Information */}
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person fontSize="small" />
                Особисті дані
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ім'я"
                    value={deliveryForm.firstName}
                    onChange={handleDeliveryFormChange('firstName')}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Прізвище"
                    value={deliveryForm.lastName}
                    onChange={handleDeliveryFormChange('lastName')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Номер телефону"
                    value={deliveryForm.phone}
                    onChange={handleDeliveryFormChange('phone')}
                    required
                    placeholder="+380"
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Delivery Information */}
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" />
                Адреса доставки
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Місто"
                    value={deliveryForm.city}
                    onChange={handleDeliveryFormChange('city')}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <RadioGroup
                      value={deliveryForm.deliveryType}
                      onChange={handleDeliveryFormChange('deliveryType')}
                    >
                      <FormControlLabel 
                        value="nova" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ position: 'relative', width: 60, height: 20 }}>
                              <Image
                                src="/images/nova-poshta.png"
                                alt="Нова Пошта"
                                fill
                                sizes="60px"
                                style={{ objectFit: 'contain' }}
                              />
                            </Box>
                            <Typography>Нова Пошта</Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel 
                        value="ukrposhta" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ position: 'relative', width: 60, height: 20 }}>
                              <Image
                                src="/images/ukrposhta.png"
                                alt="Укрпошта"
                                fill
                                sizes="60px"
                                style={{ objectFit: 'contain' }}
                              />
                            </Box>
                            <Typography>Укрпошта</Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel 
                        value="address" 
                        control={<Radio />} 
                        label="Доставка кур'єром"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {deliveryForm.deliveryType !== 'address' ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Номер відділення"
                      value={deliveryForm.department}
                      onChange={handleDeliveryFormChange('department')}
                      required
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Адреса доставки"
                      value={deliveryForm.address}
                      onChange={handleDeliveryFormChange('address')}
                      required
                      multiline
                      rows={2}
                      placeholder="Вулиця, будинок, квартира"
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, position: 'sticky', top: 84 }}>
          <Typography variant="h6" gutterBottom>
            Сума замовлення
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Товари ({cartItems.length})</Typography>
              <Typography>{totalPrice} грн</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Доставка</Typography>
              <Typography color="success.main">Безкоштовно</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Разом</Typography>
              <Typography variant="h6" color="primary.main">
                {totalPrice} грн
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setActiveStep(prev => prev - 1)}
                fullWidth
              >
                Назад
              </Button>
              <Button
                variant="contained"
                startIcon={<Payment />}
                onClick={() => setActiveStep(prev => prev + 1)}
                fullWidth
                disabled={!isDeliveryFormValid()}
              >
                Далі
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderPaymentStep = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Payment color="primary" />
            Спосіб оплати
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            <FormControl>
              <RadioGroup
                value={paymentForm.method}
                onChange={handlePaymentFormChange('method')}
              >
                <FormControlLabel 
                  value="card" 
                  control={<Radio />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ position: 'relative', width: 80, height: 24 }}>
                        <Image
                          src="/images/payment/visa-mc.png"
                          alt="Card Payment"
                          fill
                          sizes="80px"
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                      <Typography>Оплата картою онлайн</Typography>
                    </Box>
                  }
                />
                <FormControlLabel 
                  value="cash" 
                  control={<Radio />} 
                  label="Оплата при отриманні"
                />
              </RadioGroup>
            </FormControl>

            {paymentForm.method === 'card' && (
              <Box sx={{ mt: 2 }}>
                <CreditCardForm
                  cardNumber={paymentForm.cardNumber || ''}
                  cardExpiry={paymentForm.cardExpiry || ''}
                  cardCvv={paymentForm.cardCvv || ''}
                  onCardNumberChange={(value) => handlePaymentFormChange('cardNumber')(value)}
                  onCardExpiryChange={(value) => handlePaymentFormChange('cardExpiry')(value)}
                  onCardCvvChange={(value) => handlePaymentFormChange('cardCvv')(value)}
                />
              </Box>
            )}
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, position: 'sticky', top: 84 }}>
          <Typography variant="h6" gutterBottom>
            Сума замовлення
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Товари ({cartItems.length})</Typography>
              <Typography>{totalPrice} грн</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Доставка</Typography>
              <Typography color="success.main">Безкоштовно</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">До сплати</Typography>
              <Typography variant="h6" color="primary.main">
                {totalPrice} грн
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => setActiveStep(prev => prev - 1)}
                fullWidth
              >
                Назад
              </Button>
              <Button
                variant="contained"
                startIcon={<Payment />}
                onClick={() => setActiveStep(prev => prev + 1)}
                fullWidth
                disabled={!isPaymentFormValid()}
              >
                Підтвердити
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderConfirmationStep = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalPharmacy color="primary" />
            Підтвердження замовлення
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Stack spacing={3}>
            {/* Order Summary */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Товари
              </Typography>
              {cartItems.map((item) => (
                <Box key={item.medicine.id} sx={{ mb: 2 }}>
                  <Typography>
                    {item.medicine.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.medicine.price * item.quantity} грн
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Delivery Info */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Доставка
              </Typography>
              <Typography>
                {deliveryForm.firstName} {deliveryForm.lastName}
              </Typography>
              <Typography>{deliveryForm.phone}</Typography>
              <Typography>
                {deliveryForm.city}, 
                {deliveryForm.deliveryType === 'address' 
                  ? ` ${deliveryForm.address}`
                  : ` Відділення ${deliveryForm.department}`}
              </Typography>
            </Box>

            {/* Payment Info */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Оплата
              </Typography>
              <Typography>
                {paymentForm.method === 'card' 
                  ? `Карткою онлайн (${paymentForm.cardNumber?.slice(-4)})` 
                  : 'При отриманні'}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, position: 'sticky', top: 84 }}>
          <Typography variant="h6" gutterBottom>
            Сума замовлення
          </Typography>
          <Divider sx={{ my: 2 }} />
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Товари ({cartItems.length})</Typography>
              <Typography>{totalPrice} грн</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Доставка</Typography>
              <Typography color="success.main">Безкоштовно</Typography>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">До сплати</Typography>
              <Typography variant="h6" color="primary.main">
                {totalPrice} грн
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOrderConfirm}
                fullWidth
                sx={{
                  py: 1.5,
                  bgcolor: 'success.main',
                  '&:hover': {
                    bgcolor: 'success.dark',
                  }
                }}
              >
                Підтвердити та оплатити
              </Button>
              <Button
                variant="text"
                startIcon={<ArrowBack />}
                onClick={() => setActiveStep(prev => prev - 1)}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                Повернутися назад
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <LocalPharmacy sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5, mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Ваш кошик порожній
          </Typography>
          <Typography color="text.secondary" paragraph>
            Додайте необхідні ліки з нашого каталогу
          </Typography>
          <Button
            variant="contained"
            href="/catalog"
            startIcon={<ShoppingCart />}
            sx={{ mt: 2 }}
          >
            Перейти до каталогу
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalPharmacy color="primary" />
                  Ваше замовлення
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Stack spacing={2}>
                  {cartItems.map((item) => (
                    <Paper
                      key={item.medicine.id}
                      variant="outlined"
                      sx={{ p: 2 }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
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
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => removeFromCart(item.medicine.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, bgcolor: 'success.light', color: 'white' }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalShipping />
                  <Typography>
                    {totalPrice >= 1000 
                      ? 'Безкоштовна доставка доступна для вашого замовлення' 
                      : `Додайте товарів ще на ${1000 - totalPrice} грн для безкоштовної доставки`}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: 'sticky', top: 84 }}>
                <Typography variant="h6" gutterBottom>
                  Сума замовлення
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Товари ({cartItems.length})</Typography>
                    <Typography>{totalPrice} грн</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Доставка</Typography>
                    <Typography color="success.main">Безкоштовно</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Разом</Typography>
                    <Typography variant="h6" color="primary.main">
                      {totalPrice} грн
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<Payment />}
                    onClick={() => setActiveStep((prev) => prev + 1)}
                  >
                    Оформити замовлення
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && renderDeliveryStep()}
        {activeStep === 2 && renderPaymentStep()}
        {activeStep === 3 && renderConfirmationStep()}
      </Container>
      
      <OrderSuccessModal
        open={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          router.push('/');
        }}
        orderNumber={orderNumber}
      />
    </>
  );
} 