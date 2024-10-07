import axiosInstance from '../api/axiosInstance'
import { Profile } from '../types'

interface SuggestionService {
  index: (token: string) => Promise<Profile[] | undefined>
}

const suggestionService: SuggestionService = {
  index: async token => {
    try {
      const response = await axiosInstance.get<Profile[]>('/suggestion', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
    }
  },
}

export default suggestionService
