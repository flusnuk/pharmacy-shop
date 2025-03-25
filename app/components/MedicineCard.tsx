import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Button,
  Box,
  Stack,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Medicine } from '@/app/types/types'

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const formatPrice = (price: number | string) => {
    return Number(price).toFixed(2)
  }

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ 
          position: 'relative',
          height: 200,
          bgcolor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <CardMedia
            component="img"
            image={medicine.imageUrl || '/images/medicine-placeholder.jpg'}
            alt={medicine.name}
            sx={{ 
              height: '80%',
              width: 'auto',
              maxWidth: '80%',
              objectFit: 'contain',
              transition: 'transform 0.3s ease',
              filter: !medicine.isAvailable ? 'grayscale(100%)' : 'none',
              opacity: !medicine.isAvailable ? 0.7 : 1,
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            bgcolor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
        
        {/* Status Chips */}
        <Box sx={{ 
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          {!medicine.isAvailable && (
            <Chip
              label="Немає в наявності"
              color="error"
              size="small"
              variant="filled"
              sx={{ 
                bgcolor: 'error.main',
                color: 'white',
                fontWeight: 500,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          )}
        </Box>
      </Box>

      <CardContent sx={{ 
        flexGrow: 1, 
        p: 1.5,
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Stack spacing={1} sx={{ height: '100%' }}>
          {/* Status Badges */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ minHeight: 24 }}>
            {medicine.isAvailable ? (
              medicine.stockQuantity <= 100 && (
                <Chip
                  label={`Залишилось ${medicine.stockQuantity} шт.`}
                  color="warning"
                  size="small"
                  variant="outlined"
                />
              )
            ) : (
              <Chip
                label="Немає в наявності"
                color="error"
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          {/* Rating and Reviews */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: 20 }}>
            <Rating 
              value={medicine.rating || 0} 
              readOnly 
              size="small"
              sx={{ color: '#FFA726' }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: '0.75rem' }}
            >
              {medicine.reviewCount || 0} відгуків
            </Typography>
          </Box>

          {/* Title */}
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 500,
              fontSize: '1rem',
              lineHeight: 1.2,
              minHeight: '2.4rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {medicine.name}
          </Typography>

          {/* Manufacturer */}
          <Box sx={{ minHeight: 20 }}>
            {medicine.manufacturer && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <span style={{ color: '#666' }}>Виробник:</span> {medicine.manufacturer}
              </Typography>
            )}
          </Box>

          {/* Usage Instructions */}
          <Box sx={{ minHeight: 60 }}>
            {medicine.usage_instructions && (
              <Box sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.02)',
                borderRadius: 2,
                p: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    alignItems: 'flex-start',
                    gap: 1,
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    lineHeight: 1.4
                  }}
                >
                  <InfoOutlinedIcon 
                    fontSize="small" 
                    sx={{ 
                      color: 'primary.main',
                      mt: 0.2,
                      flexShrink: 0,
                      float: 'left',
                      marginRight: 1
                    }} 
                  />
                  {medicine.usage_instructions}
                </Typography>
              </Box>
            )}
          </Box>
          
          {/* Price and Action */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mt: 'auto',
            pt: 1,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Stack spacing={0.5}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: '1.1rem'
                }}
              >
                {formatPrice(medicine.price)} грн
              </Typography>
              {medicine.price && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                    fontSize: '0.75rem'
                  }}
                >
                  {formatPrice(500)} грн
                </Typography>
              )}
            </Stack>

            <Tooltip title={medicine.isAvailable ? "Додати в кошик" : "Немає в наявності"}>
              <span>
                <Button 
                  variant="contained" 
                  color="primary"
                  disabled={!medicine.isAvailable}
                  sx={{ 
                    minWidth: 'auto',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    p: 0,
                    '&.Mui-disabled': {
                      bgcolor: 'action.disabledBackground',
                      color: 'action.disabled'
                    }
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
} 