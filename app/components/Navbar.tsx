"use client"

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton,
  Badge,
  useScrollTrigger,
  Slide,
  InputBase,
  alpha
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon } from '@mui/icons-material';
import { cartService } from '../services/cartService';
import { useEffect, useState } from 'react';
import CartModal from './CartModal';
import { CartItem } from '../types/types';

interface Props {
  window?: () => Window;
}

function HideOnScroll(props: Props & { children: React.ReactElement }) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const menuItems = [
  { path: '/', label: 'Головна' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/about', label: 'Про нас' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/contacts', label: 'Контакти' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(cartService.getTotalItems());
      setCart(cartService.getCart());
    };

    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('storage', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  const removeFromCart = (medicineId: number) => {
    try {
      const updatedCart = cartService.removeItem(medicineId);
      setCart(updatedCart);
      setCartCount(cartService.getTotalItems());
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    try {
      const updatedCart = cartService.updateQuantity(medicineId, quantity);
      setCart(updatedCart);
      setCartCount(cartService.getTotalItems());
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          color="default" 
          elevation={0} 
          sx={{ 
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
              <Box 
                component={Link} 
                href="/" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none',
                  color: '#0ea5e9',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: 'green',
                  }}
                >
                  E Tabl
                  <Box 
                    component="span" 
                    sx={{ 
                      color: '#64748b',
                      fontWeight: 400,
                    }}
                  >
                    etki
                  </Box>
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3,
                ml: 'auto',
              }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    href={item.path}
                    color="inherit"
                    sx={{ 
                      color: isActive(item.path) ? 'primary.main' : '#64748b',
                      fontWeight: 500,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                <Box sx={{ 
                  position: 'relative',
                  borderRadius: 2,
                  bgcolor: alpha('#64748b', 0.05),
                  '&:hover': {
                    bgcolor: alpha('#64748b', 0.1),
                  },
                  mr: 2,
                }}>
                  <IconButton sx={{ p: '10px' }}>
                    <SearchIcon sx={{ color: '#64748b' }} />
                  </IconButton>
                  <InputBase
                    placeholder="Search..."
                    sx={{
                      color: '#64748b',
                      '& .MuiInputBase-input': {
                        p: '8px',
                        transition: 'width 0.2s',
                        width: '7ch',
                        '&:focus': {
                          width: '20ch',
                        },
                      },
                    }}
                  />
                </Box>

                <IconButton 
                  onClick={() => setIsCartModalOpen(true)}
                  sx={{ 
                    color: '#64748b',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                    }
                  }}
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <CartModal
        open={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cartItems={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </>
  );
}