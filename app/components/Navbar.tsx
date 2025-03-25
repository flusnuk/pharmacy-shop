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
  Slide
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart as ShoppingCartIcon, LocalPharmacy } from '@mui/icons-material';
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
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  const removeFromCart = (medicineId: number) => {
    const updatedCart = cartService.removeItem(medicineId);
    setCart(updatedCart);
    setCartCount(cartService.getTotalItems());
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    const updatedCart = cartService.updateQuantity(medicineId, quantity);
    setCart(updatedCart);
    setCartCount(cartService.getTotalItems());
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
            zIndex: (theme) => theme.zIndex.drawer + 1 
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
                  color: 'primary.main',
                }}
              >
                <LocalPharmacy sx={{ fontSize: 32, mr: 1 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1e40af 30%, #3b82f6 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Pharmacy Shop
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    href={item.path}
                    variant={isActive(item.path) ? 'contained' : 'text'}
                    color="primary"
                    sx={{ 
                      minWidth: 100,
                      display: { xs: item.path === '/' ? 'none' : 'inline-flex', md: 'inline-flex' },
                      '&:hover': {
                        backgroundColor: isActive(item.path) ? 'primary.dark' : 'rgba(30, 64, 175, 0.04)',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <IconButton 
                  onClick={() => setIsCartModalOpen(true)}
                  color="primary"
                  sx={{ 
                    ml: 1,
                    '&:hover': {
                      bgcolor: 'rgba(30, 64, 175, 0.04)',
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