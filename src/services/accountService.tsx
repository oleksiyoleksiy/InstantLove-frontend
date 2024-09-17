import axiosInstance from '../api/axiosInstance'
import { LoginData, Token, RegisterData } from '../types'

interface AccountService {
  login: (data: LoginData) => Promise<Token | null>
  register: (data: RegisterData) => Promise<Token | null>
  isUserExists: (telegramId: string) => Promise<boolean | null>
}

const accountService: AccountService = {
  login: async data => {
    try {
      const response = await axiosInstance.post<Token>('/login', data)
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  },
  register: async data => {
    try {
      const response = await axiosInstance.post<Token>('/login', data)
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  },
  isUserExists: async telegramId => {
    try {
      const response = await axiosInstance.post<boolean>('/isUserExists', {
        telegram_id: telegramId,
      })
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  },
}

export default accountService
