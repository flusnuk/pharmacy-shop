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
  Tooltip,
  Zoom
} from '@mui/material';
import { 
  ShoppingCart, 
  Favorite, 
  LocalOffer,
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

  // Генеруємо випадкові значення для рейтингу та відгуків
  const randomRating = useMemo(() => (Math.random() * 2 + 3).toFixed(1), []); // від 3.0 до 5.0
  const randomReviews = useMemo(() => Math.floor(Math.random() * 50) + 10, []); // від 10 до 60

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

  const renderAvailabilityStatus = () => {
    if (!product.isAvailable) {
      return (
        <Typography 
          variant="body2" 
          sx={{ color: 'error.main', mb: 2, fontWeight: 500 }}
        >
          Немає в наявності
        </Typography>
      );
    }

    return (
      <Typography 
        variant="body2" 
        sx={{ color: 'success.main', mb: 2, fontWeight: 500 }}
      >
        В наявності
      </Typography>
    );
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
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        background: 'white',
        '&:hover': {
          transform: 'translateY(-8px)',
          '&::after': {
            transform: 'scale(1)'
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 4,
          background: categoryStyle.gradient,
          transform: 'scale(0)',
          transition: 'transform 0.3s ease-in-out',
          transformOrigin: 'center'
        },
        opacity: product.isAvailable ? 1 : 0.7,
      }}
    >
      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {product.isNew && (
            <Zoom in>
              <Chip
                icon={<NewReleases />}
                label="Новинка"
                size="small"
                sx={{
                  background: categoryStyle.gradient,
                  color: 'white',
                  fontWeight: 500,
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            </Zoom>
          )}
          {product.discount && (
            <Zoom in>
              <Chip
                icon={<LocalOffer />}
                label={`-${product.discount}%`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.light})`,
                  color: 'white',
                  fontWeight: 500,
                  '& .MuiChip-icon': { color: 'white' }
                }}
              />
            </Zoom>
          )}
          {product.stockQuantity && product.stockQuantity <= 100 && product.isAvailable && (
            <Zoom in>
              <Chip
                label={`Залишилось ${product.stockQuantity} шт.`}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.light})`,
                  color: 'white',
                  fontWeight: 500
                }}
              />
            </Zoom>
          )}
        </Box>
      </Box>

      {/* Favorite Button */}
      <IconButton
        onClick={() => setIsFavorite(!isFavorite)}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          bgcolor: 'white',
          boxShadow: 2,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'white',
            transform: 'scale(1.1)',
            color: theme.palette.error.main
          }
        }}
      >
        {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Image Container */}
      <Box sx={{ 
        position: 'relative', 
        pt: '100%',
        overflow: 'hidden'
      }}>
        <Image
          src={product.imageUrl || '/images/default-medicine.jpg'}
          alt={product.name}
          fill
          className="product-image"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.6s ease-in-out'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isHovered ? `linear-gradient(to top, ${alpha(categoryStyle.color, 0.1)}, transparent)` : 'transparent',
            transition: 'background 0.3s ease'
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Category with Icon */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
            background: alpha(categoryStyle.color, 0.1),
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: categoryStyle.color,
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontWeight: 500
            }}
          >
            {product.category.name}
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            minHeight: 50,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'color 0.3s ease',
            color: isHovered ? categoryStyle.color : 'inherit'
          }}
        >
          {product.name}
        </Typography>

        {/* Availability Status */}
        {renderAvailabilityStatus()}

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating 
            value={displayRating}
            readOnly 
            size="small"
            precision={0.1}
            sx={{
              '& .MuiRating-iconFilled': {
                color: categoryStyle.color
              }
            }}
          />
          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
            ({displayReviewsCount})
          </Typography>
          {product.verified && (
            <Tooltip title="Сертифікований товар" arrow>
              <Verified sx={{ ml: 1, color: categoryStyle.color, fontSize: 20 }} />
            </Tooltip>
          )}
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
          {product.discount ? (
            <>
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: 'bold',
                  mr: 1,
                  color: theme.palette.error.main
                }}
              >
                {product.discountPrice} ₴
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {product.price} ₴
              </Typography>
            </>
          ) : (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: categoryStyle.color
              }}
            >
              {product.price} ₴
            </Typography>
          )}
        </Box>

        {/* Updated Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          disabled={!product.isAvailable || isAdding}
          onClick={handleAddToCart}
          sx={{
            background: product.isAvailable ? categoryStyle.gradient : 'grey.300',
            borderRadius: 2,
            py: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: product.isAvailable ? categoryStyle.gradient : 'grey.300',
              transform: product.isAvailable ? 'translateY(-2px)' : 'none',
              boxShadow: product.isAvailable ? `0 8px 20px ${alpha(categoryStyle.color, 0.4)}` : 'none'
            }
          }}
        >
          {isAdding ? 'Додається...' : product.isAvailable ? 'До кошика' : 'Немає в наявності'}
        </Button>
      </CardContent>
    </Card>
  );
} 