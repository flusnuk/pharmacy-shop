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
  Tooltip
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
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
        <CardMedia
          component="img"
          height="200"
          image={medicine.imageUrl || '/images/medicine-placeholder.jpg'}
          alt={medicine.name}
          sx={{ 
            objectFit: 'contain',
            p: 2,
            bgcolor: '#f5f5f5'
          }}
        />
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating 
              value={medicine.rating || 0} 
              readOnly 
              size="small"
              sx={{ color: '#FFA726' }}
            />
            <Typography variant="body2" color="text.secondary">
              {medicine.reviewCount || 0} відгуків
            </Typography>
          </Box>

          <Typography 
            variant="subtitle1" 
            component="div"
            sx={{ 
              fontWeight: 500,
              minHeight: '2.5em',
              lineHeight: 1.2
            }}
          >
            {medicine.name}
          </Typography>

          {medicine.manufacturer && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              Виробник: {medicine.manufacturer}
            </Typography>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            mt: 'auto'
          }}>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main'
                }}
              >
                {formatPrice(medicine.price)} грн
              </Typography>
              {medicine.price && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  {formatPrice(500)} грн
                </Typography>
              )}
            </Box>

            <Tooltip title="Додати в кошик">
              <Button 
                variant="contained" 
                color="primary"
                sx={{ 
                  minWidth: 'auto',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  p: 0
                }}
              >
                <ShoppingCartOutlinedIcon />
              </Button>
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
} 