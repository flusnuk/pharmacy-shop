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
  Paper
} from '@mui/material'
import { Medicine, Category } from '@/app/types/types'
import { medicineService } from '@/app/services/medicineService'
import { categoryService } from '@/app/services/categoryService'
import MedicineCard from '@/app/components/MedicineCard'

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

export default function Catalog() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceSort, setPriceSort] = useState<'none' | 'asc' | 'desc'>('none')
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
  }, [selectedCategory, priceSort])

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMedicines(page)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handlePriceSortChange = (sort: 'none' | 'asc' | 'desc') => {
    setPriceSort(sort)
  }


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
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
              <MedicineCard medicine={medicine} />
            </Grid>
          ))
        )}
      </Grid>

      {pagination.pages > 1 && (
        <Paper 
          elevation={0} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            py: 4,
            mt: 4,
            bgcolor: 'transparent' 
          }}
        >
          <Pagination 
            count={pagination.pages}
            page={pagination.currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Paper>
      )}
    </Container>
  )
}
