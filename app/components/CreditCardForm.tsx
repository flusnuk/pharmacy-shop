"use client"

import { useState } from 'react';
import { Box, TextField, Typography, Stack } from '@mui/material';
import { CreditCard, Lock } from '@mui/icons-material';
import Image from 'next/image';

interface CreditCardFormProps {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvvChange: (value: string) => void;
}

export default function CreditCardForm({
  cardNumber,
  cardExpiry,
  cardCvv,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvvChange,
}: CreditCardFormProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(event.target.value);
    onCardNumberChange(formatted);
  };

  const handleExpiryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(event.target.value);
    onCardExpiryChange(formatted);
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').substr(0, 3);
    onCardCvvChange(value);
  };

  const getCardType = () => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return '/images/payment/visa.png';
    if (number.startsWith('5')) return '/images/payment/mastercard.png';
    return '/images/payment/card-generic.png';
  };

  return (
    <Box sx={{ perspective: '1000px' }}>
      <Box
        sx={{
          position: 'relative',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          mb: 3,
        }}
      >
        {/* Front of the card */}
        <Box
          sx={{
            width: '100%',
            height: 240,
            p: 3,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            position: 'relative',
            backfaceVisibility: 'hidden',
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '50px 50px',
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CreditCard sx={{ fontSize: 32 }} />
              <Box sx={{ position: 'relative', width: 60, height: 40 }}>
                <Image 
                  src={getCardType()} 
                  alt="Card type"
                  fill
                  sizes="60px"
                  style={{ 
                    objectFit: 'contain',
                    opacity: 0.9
                  }}
                />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ letterSpacing: 4 }}>
              {cardNumber || '•••• •••• •••• ••••'}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 'auto' }}>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Термін дії
                </Typography>
                <Typography sx={{ letterSpacing: 2 }}>
                  {cardExpiry || 'MM/YY'}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Back of the card */}
        <Box
          sx={{
            width: '100%',
            height: 240,
            p: 3,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: 'white',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '50px 50px',
          }}
        >
          <Box sx={{ width: '100%', height: 40, bgcolor: 'black', my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              CVV
            </Typography>
            <Box sx={{ 
              bgcolor: 'white', 
              color: 'black',
              px: 2,
              py: 1,
              borderRadius: 1,
              width: 60,
              textAlign: 'center'
            }}>
              {cardCvv || '•••'}
            </Box>
          </Box>
        </Box>
      </Box>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Номер карти"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1234 5678 9012 3456"
          InputProps={{
            startAdornment: <CreditCard sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Термін дії"
            value={cardExpiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
          />
          <TextField
            fullWidth
            label="CVV"
            value={cardCvv}
            onChange={handleCvvChange}
            type={isFlipped ? 'text' : 'password'}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
} 