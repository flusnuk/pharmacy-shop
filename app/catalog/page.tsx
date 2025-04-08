"use client"

import { 
  Container, 
  Typography, 
  Box,
  useTheme,
  Paper,
  Fade,
  InputBase,
  IconButton,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Pagination,
} from '@mui/material';
import { Search, Clear, Category as CategoryIcon, Sort, Remove, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Medicine, Category } from '@/app/types/types';
import { medicineService } from '@/app/services/medicineService';
import { categoryService } from '@/app/services/categoryService';
import ProductCard from '../components/ProductCard';

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

export default function CatalogPage() {
  const theme = useTheme();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 1,
    currentPage: 1,
    limit: 8
  });

  const fetchMedicines = async (page: number = 1) => {
    setLoading(true);
    try {
      const filters = {
        category: selectedCategory,
        sortPrice: priceSort === 'none' ? undefined : priceSort,
        search: searchQuery,
        page,
        limit: pagination.limit
      };
      const data = await medicineService.fetchMedicines(filters);
      setMedicines(data.medicines);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await categoryService.fetchCategories();
        setCategories(categoriesData);
        await fetchMedicines();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchMedicines(1); // Reset to first page when filters change
  }, [selectedCategory, priceSort, searchQuery]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMedicines(page);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceSortChange = (sort: 'none' | 'asc' | 'desc') => {
    setPriceSort(sort);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      pb: 8,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '100%',
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234338ca' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        opacity: 0.5,
        zIndex: 0,
      },
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        position: 'relative',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: 'white',
        pt: { xs: 10, md: 12 },
        pb: { xs: 12, md: 16 },
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/images/pattern.png")',
          opacity: 0.1,
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)',
          zIndex: 1,
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography 
                    variant="overline"
                    sx={{
                      color: theme.palette.secondary.light,
                      fontWeight: 600,
                      letterSpacing: 2,
                      mb: 2,
                      display: 'block',
                    }}
                  >
                    ОНЛАЙН АПТЕКА
                  </Typography>
                  <Typography 
                    variant="h1"
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      mb: 2,
                      lineHeight: 1.2,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: '80px',
                        height: '4px',
                        background: theme.palette.secondary.main,
                        borderRadius: '2px',
                      }
                    }}
                  >
                    Знайдіть необхідні
                    <Box component="span" sx={{ 
                      color: theme.palette.secondary.light,
                      display: 'block',
                      position: 'relative',
                    }}>
                      ліки та товари
                    </Box>
                  </Typography>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontWeight: 400,
                      opacity: 0.9,
                      mb: 4,
                      maxWidth: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.6,
                    }}
                  >
                    Широкий асортимент медичних препаратів та товарів для вашого здоров&apos;я
                  </Typography>

                  {/* Search Bar */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      width: { xs: '100%', md: '90%' },
                      borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <IconButton sx={{ p: '10px', color: theme.palette.primary.main }}>
                      <Search />
                    </IconButton>
                    <InputBase
                      sx={{ 
                        ml: 1, 
                        flex: 1,
                        '& input': {
                          color: theme.palette.primary.dark,
                          '&::placeholder': {
                            color: theme.palette.primary.dark,
                            opacity: 0.7,
                          }
                        }
                      }}
                      placeholder="Пошук товарів..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    {searchQuery && (
                      <IconButton 
                        sx={{ 
                          p: '10px',
                          color: theme.palette.primary.main,
                          '&:hover': {
                            color: theme.palette.primary.dark,
                          }
                        }} 
                        onClick={handleClearSearch}
                      >
                        <Clear />
                      </IconButton>
                    )}
                  </Paper>

                  {/* Filters */}
                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={3} 
                    sx={{ 
                      mb: 4,
                      width: { xs: '100%', md: '90%' },
                    }}
                  >
                    <Box sx={{ 
                      flex: 1,
                      position: 'relative',
                      '&:hover .MuiFormControl-root': {
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <CategoryIcon sx={{ fontSize: 16 }} />
                        </Box>
                        Категорія
                      </Typography>
                      <FormControl 
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            border: '2px solid transparent',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,1)',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            },
                            '&.Mui-focused': {
                              bgcolor: 'rgba(255,255,255,1)',
                              border: `2px solid ${theme.palette.secondary.main}`,
                              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                              },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                          },
                          '& .MuiSelect-select': {
                            py: 1.5,
                            color: theme.palette.primary.dark,
                            fontWeight: 500,
                          },
                        }}
                      >
                        <Select
                          value={selectedCategory}
                          onChange={(e) => handleCategoryChange(e.target.value)}
                          displayEmpty
                          renderValue={(value) => {
                            if (value === 'all') {
                              return 'Всі категорії';
                            }
                            const category = categories.find(cat => cat.id.toString() === value);
                            return category ? category.name : 'Всі категорії';
                          }}
                        >
                          <MenuItem value="all" sx={{ py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CategoryIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                              <Typography>Всі категорії</Typography>
                            </Box>
                          </MenuItem>
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id.toString()} sx={{ py: 1.5 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CategoryIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                                <Typography>{category.name}</Typography>
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ 
                      flex: 1,
                      position: 'relative',
                      '&:hover .MuiFormControl-root': {
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 1,
                          color: 'rgba(255,255,255,0.9)',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                          }}
                        >
                          <Sort sx={{ fontSize: 16 }} />
                        </Box>
                        Сортування за ціною
                      </Typography>
                      <FormControl 
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            bgcolor: 'rgba(255,255,255,0.95)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s ease',
                            border: '2px solid transparent',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255,255,255,1)',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            },
                            '&.Mui-focused': {
                              bgcolor: 'rgba(255,255,255,1)',
                              border: `2px solid ${theme.palette.secondary.main}`,
                              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                              },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              border: 'none',
                            },
                          },
                          '& .MuiSelect-select': {
                            py: 1.5,
                            color: theme.palette.primary.dark,
                            fontWeight: 500,
                          },
                        }}
                      >
                        <Select
                          value={priceSort}
                          onChange={(e) => handlePriceSortChange(e.target.value as 'none' | 'asc' | 'desc')}
                          displayEmpty
                        >
                          <MenuItem value="none" sx={{ py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Remove sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                              <Typography>Без сортування</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="asc" sx={{ py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ArrowUpward sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                              <Typography>Від дешевших до дорожчих</Typography>
                            </Box>
                          </MenuItem>
                          <MenuItem value="desc" sx={{ py: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ArrowDownward sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                              <Typography>Від дорожчих до дешевших</Typography>
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>

                  {/* Search Results Info */}
                  {searchQuery && (
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        mb: 2, 
                        opacity: 0.9,
                        color: theme.palette.secondary.light,
                        fontWeight: 500,
                      }}
                    >
                      {pagination.total > 0 
                        ? `Знайдено ${pagination.total} результатів для "${searchQuery}"` 
                        : `Нічого не знайдено для "${searchQuery}"`}
                    </Typography>
                  )}
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} sx={{ 
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                background: `radial-gradient(circle, ${theme.palette.secondary.light}15 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 0,
              }
            }}>
              <Box
                component="img"
                src="/images/pharmacy-hero.png"
                alt="Pharmacy Hero"
                sx={{
                  width: '80%',
                  maxWidth: 500,
                  height: 'auto',
                  objectFit: 'contain',
                  transform: 'scale(1.1)',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
                  position: 'relative',
                  zIndex: 1,
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%': {
                      transform: 'translateY(0px) scale(1.1) rotate(0deg)',
                    },
                    '50%': {
                      transform: 'translateY(-20px) scale(1.1) rotate(2deg)',
                    },
                    '100%': {
                      transform: 'translateY(0px) scale(1.1) rotate(0deg)',
                    },
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '20px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 80%)',
                    filter: 'blur(10px)',
                    zIndex: -1,
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Grid */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: -10,
          position: 'relative',
          zIndex: 3,
        }}
      >
        <Box sx={{ 
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            zIndex: -1,
          }
        }}>
          {/* Category Header */}
          <Box sx={{
            p: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9))',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }
          }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.dark,
                textAlign: 'center',
                position: 'relative',
                mb: 1,
              }}
            >
              Каталог товарів
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.text.secondary,
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Широкий вибір медичних препаратів за найкращими цінами
            </Typography>
          </Box>

          {/* Products */}
          <Box sx={{ 
            p: 4,
            background: 'rgba(255,255,255,0.6)',
          }}>
            <Grid container spacing={3}>
              {loading ? (
                <Box sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 8,
                  color: theme.palette.primary.main 
                }}>
                  <Typography variant="h6">Завантаження...</Typography>
                </Box>
              ) : medicines.length === 0 ? (
                <Box sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 8,
                  color: theme.palette.primary.main 
                }}>
                  <Typography variant="h6">Ліки не знайдено</Typography>
                </Box>
              ) : (
                medicines.map((medicine) => (
                  <Grid item xs={12} sm={6} md={3} key={medicine.id}>
                    <Box sx={{
                      transition: 'all 0.3s ease-in-out',
                      transform: 'translateY(0)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        '& .MuiPaper-root': {
                          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                        }
                      },
                    }}>
                      <ProductCard
                        product={{
                          id: medicine.id,
                          name: medicine.name,
                          category: categories.find(cat => cat.id === medicine.categoryId) || { id: 0, name: '' },
                          price: medicine.price,
                          imageUrl: medicine.imageUrl,
                          isAvailable: medicine.isAvailable,
                          description: medicine.description,
                          manufacturer: medicine.manufacturer,
                          stockQuantity: medicine.stockQuantity,
                        }}
                      />
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>

            {pagination.pages > 1 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mt: 6,
                pt: 4,
                borderTop: '1px solid rgba(0,0,0,0.05)',
                '& .MuiPaginationItem-root': {
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontWeight: 500,
                  '&.Mui-selected': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                    },
                  },
                  '&:hover': {
                    background: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                  },
                },
              }}>
                <Pagination 
                  count={pagination.pages} 
                  page={pagination.currentPage} 
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 