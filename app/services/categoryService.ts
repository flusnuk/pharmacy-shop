import axios from 'axios'

interface ICategoryCreate {
  name: string
  description: string
  imageUrl: string
}

export const categoryService = {
  fetchCategories: async () => {
    try {
      const response = await axios.get('/api/categories')
      return response.data
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  createCategory: async (data: ICategoryCreate) => {
    try {
      const response = await axios.post('/api/categories', data)
      return response.data
    } catch (error) {
      console.error('Error creating category:', error)
      throw error
    }
  },

  updateCategory: async (id: number, data: Partial<ICategoryCreate>) => {
    try {
      const response = await axios.patch(`/api/categories/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },

  deleteCategory: async (id: number) => {
    try {
      const response = await axios.delete(`/api/categories/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  }
} 