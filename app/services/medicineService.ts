import axios from 'axios'
import { MedicineFilters } from '@/app/types/types'

interface IMedicineCreate {
  categoryId: number
  name: string
  description: string
  price: number
  stockQuantity: number
  imageUrl: string
  manufacturer: string
  isAvailable: boolean
}

export const medicineService = {
  fetchMedicines: async (filters?: MedicineFilters) => {
    try {
      const params = new URLSearchParams()
      
      if (filters?.category && filters.category !== 'all') {
        params.append('category', filters.category)
      }
      
      if (filters?.sortPrice) {
        params.append('sortPrice', filters.sortPrice)
      }

      if (filters?.search && filters.search.trim() !== '') {
        params.append('search', filters.search)
      }

      if (filters?.page) {
        params.append('page', filters.page.toString())
      }

      if (filters?.limit) {
        params.append('limit', filters.limit.toString())
      }

      const queryString = params.toString()
      const url = `/api/medicines${queryString ? `?${queryString}` : ''}`
      
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching medicines:', error)
      throw error
    }
  },

  fetchMedicineById: async (id: number) => {
    try {
      const response = await axios.get(`/api/medicines/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching medicine:', error)
      throw error
    }
  },

  createMedicine: async (data: IMedicineCreate) => {
    try {
      const response = await axios.post('/api/medicines', data)
      return response.data
    } catch (error) {
      console.error('Error creating medicine:', error)
      throw error
    }
  },

  updateMedicine: async (id: number, data: Partial<IMedicineCreate>) => {
    try {
      const response = await axios.patch(`/api/medicines/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating medicine:', error)
      throw error
    }
  },

  deleteMedicine: async (id: number) => {
    try {
      const response = await axios.delete(`/api/medicines/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting medicine:', error)
      throw error
    }
  },

  fetchMedicinesByCategory: async (categoryId: number) => {
    try {
      const response = await axios.get(`/api/medicines/category/${categoryId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching medicines by category:', error)
      throw error
    }
  }
} 