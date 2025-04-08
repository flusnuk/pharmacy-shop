"use client"

import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Rating,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  NewReleases,
  Verified,
  FavoriteBorder
} from '@mui/icons-material';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { cartService } from '@/app/services/cartService';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
    price: number;
    imageUrl?: string;
    isAvailable: boolean;
    description?: string;
    manufacturer?: string;
    discountPrice?: number;
    discount?: number;
    rating?: number;
    reviewsCount?: number;
    isNew?: boolean;
    verified?: boolean;
    stockQuantity?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const randomRating = useMemo(() => (Math.random() * 2 + 3).toFixed(1), []);
  const randomReviews = useMemo(() => Math.floor(Math.random() * 50) + 10, []);

  const displayRating = product.rating || parseFloat(randomRating);
  const displayReviewsCount = product.reviewsCount || randomReviews;

  const categoryColors = {
    "Ліки від болю": { color: "#2196f3", gradient: "linear-gradient(135deg, #2196f3, #21CBF3)" },
    "Антибіотики": { color: "#f44336", gradient: "linear-gradient(135deg, #f44336, #ff7961)" },
    "Вітаміни": { color: "#4caf50", gradient: "linear-gradient(135deg, #4caf50, #80e27e)" },
  };

  const categoryStyle = categoryColors[product.category.name as keyof typeof categoryColors] || 
    { color: theme.palette.primary.main, gradient: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` };

  const handleAddToCart = async () => {
    if (!product.isAvailable || isAdding) return;
    
    setIsAdding(true);
    try {
      await cartService.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || '',
        categoryId: product.category.id,
        isAvailable: product.isAvailable,
        description: product.description || '',
        manufacturer: product.manufacturer || '',
        usage_instructions: '',
        stockQuantity: 1,
        createdAt: new Date()
      });
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        background: 'white',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.08)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0,0,0,0.12)' 
          : '0 8px 24px rgba(0,0,0,0.06)',
        opacity: product.isAvailable ? 1 : 0.7,
      }}
    >
      {/* Category Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 2,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Chip
          label={product.category.name}
          size="small"
          sx={{
            background: categoryStyle.gradient,
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: '24px',
            borderRadius: '12px',
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
        {product.isNew && (
          <Chip
            icon={<NewReleases sx={{ fontSize: 16 }} />}
            label="Новинка"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #00BFA6, #00897B)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              height: '24px',
              borderRadius: '12px',
              '& .MuiChip-icon': { 
                color: 'white',
                fontSize: '16px',
              },
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
          />
        )}
      </Box>

      {/* Favorite Button */}
      <IconButton
        onClick={() => setIsFavorite(!isFavorite)}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          bgcolor: 'white',
          width: 36,
          height: 36,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'white',
            transform: 'scale(1.1) rotate(8deg)',
            color: theme.palette.error.main,
          },
        }}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Image Container */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: '75%', // 4:3 aspect ratio
          overflow: 'hidden',
          background: alpha(categoryStyle.color, 0.03),
        }}
      >
        <Image
          src={product.imageUrl || '/images/default-medicine.jpg'}
          alt={product.name}
          fill
          className="product-image"
          style={{
            objectFit: 'contain',
            padding: '20px',
            transition: 'all 0.6s ease-in-out',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        {product.discount && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              background: 'linear-gradient(135deg, #f44336, #ff7961)',
              color: 'white',
              py: 0.5,
              px: 1.5,
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.875rem',
              boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
            }}
          >
            -{product.discount}%
          </Box>
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1.5,
        p: 2.5,
      }}>
        {/* Title and Rating */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: 1.4,
              minHeight: '2.8em',
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={displayRating} precision={0.5} size="small" readOnly />
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem',
              }}
            >
              ({displayReviewsCount})
            </Typography>
          </Box>
        </Box>

        {/* Manufacturer */}
        {product.manufacturer && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Verified sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            {product.manufacturer}
          </Typography>
        )}

        {/* Price and Stock */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'baseline', 
            gap: 1,
            mb: 1,
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: product.discount ? 'error.main' : 'text.primary',
              }}
            >
              {product.discount 
                ? (Number(product.price) * (1 - Number(product.discount) / 100)).toFixed(2)
                : Number(product.price).toFixed(2)} ₴
            </Typography>
            {product.discount && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                }}
              >
                {Number(product.price).toFixed(2)} ₴
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: product.isAvailable ? 'success.main' : 'error.main',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {product.isAvailable ? 'В наявності' : 'Немає в наявності'}
            </Typography>
            {product.stockQuantity && product.stockQuantity <= 100 && product.isAvailable && (
              <Typography
                variant="body2"
                sx={{
                  color: 'warning.main',
                  fontSize: '0.75rem',
                }}
              >
                (залишилось {product.stockQuantity} шт.)
              </Typography>
            )}
          </Box>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={!product.isAvailable || isAdding}
          sx={{
            mt: 2,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            background: product.isAvailable ? categoryStyle.gradient : undefined,
            boxShadow: product.isAvailable 
              ? '0 4px 12px rgba(0,0,0,0.1)' 
              : undefined,
            '&:hover': {
              background: product.isAvailable ? categoryStyle.gradient : undefined,
              filter: 'brightness(1.1)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          {isAdding ? 'Додається...' : 'Додати в кошик'}
        </Button>
      </CardContent>
    </Card>
  );
} 