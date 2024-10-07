import axiosInstance from '../api/axiosInstance'
import { Preferences, PreferencesData, Profile } from '../types'

interface Item {
  preferences: Preferences
  suggestions: Profile[]
}

interface PreferenceService {
  index: (token: string) => Promise<Preferences | undefined>
  store: (token: string, data: PreferencesData) => Promise<Preferences | undefined>
  update: (
    token: string,
    data: PreferencesData,
    id: number
  ) => Promise<Item | undefined>
}

const preferenceService: PreferenceService = {
  index: async token => {
    try {
      const response = await axiosInstance.get<Preferences>('/preference', {
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
  store: async (token, data) => {
    try {
      const response = await axiosInstance.post<Preferences>(
        '/preference',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
    }
  },
  update: async (token, data, id) => {
    try {
      const response = await axiosInstance.put<Preferences>(
        `/preference/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
    }
  },
}

export default preferenceService
