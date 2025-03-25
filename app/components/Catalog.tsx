"use client"

import { useEffect, useState } from 'react'
import { 
  Container, 
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  Pagination,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Medicine, Category } from '@/app/types/types'
import { medicineService } from '@/app/services/medicineService'
import { categoryService } from '@/app/services/categoryService'
import ProductCard from './ProductCard'
import { Search, Clear } from '@mui/icons-material'

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

export default function Catalog() {
  const theme = useTheme();
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 1,
    currentPage: 1,
    limit: 8
  })

  const fetchMedicines = async (page: number = 1) => {
    setLoading(true)
    try {
      const filters = {
        category: selectedCategory,
        sortPrice: priceSort === 'none' ? undefined : priceSort,
        search: searchQuery,
        page,
        limit: pagination.limit
      }
      const data = await medicineService.fetchMedicines(filters)
      setMedicines(data.medicines)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching medicines:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await categoryService.fetchCategories()
        setCategories(categoriesData)
        await fetchMedicines()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    fetchMedicines(1) // Reset to first page when filters change
  }, [selectedCategory, priceSort, searchQuery])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMedicines(page)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handlePriceSortChange = (sort: 'none' | 'asc' | 'desc') => {
    setPriceSort(sort)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Пошук ліків..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} size="small">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              bgcolor: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                }
              }
            }
          }}
        />
      </Box>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ 
          mb: 4,
          '& .MuiFormControl-root': {
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.02),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                }
              }
            }
          }
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Категорія</InputLabel>
          <Select
            value={selectedCategory}
            label="Категорія"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="all">Всі категорії</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id.toString()}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Сортування за ціною</InputLabel>
          <Select
            value={priceSort}
            label="Сортування за ціною"
            onChange={(e) => handlePriceSortChange(e.target.value as 'none' | 'asc' | 'desc')}
          >
            <MenuItem value="none">Без сортування</MenuItem>
            <MenuItem value="asc">Від дешевших до дорожчих</MenuItem>
            <MenuItem value="desc">Від дорожчих до дешевших</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {searchQuery && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">
            {pagination.total > 0 
              ? `Знайдено ${pagination.total} результатів для "${searchQuery}"` 
              : `Нічого не знайдено для "${searchQuery}"`}
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {loading ? (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            <Typography>Завантаження...</Typography>
          </Box>
        ) : medicines.length === 0 ? (
          <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
            <Typography>Ліки не знайдено</Typography>
          </Box>
        ) : (
          medicines.map((medicine) => (
            <Grid item xs={12} sm={6} md={3} key={medicine.id}>
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
            </Grid>
          ))
        )}
      </Grid>

      {pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pagination.pages} 
            page={pagination.currentPage} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>
      )}
    </Container>
  )
}
