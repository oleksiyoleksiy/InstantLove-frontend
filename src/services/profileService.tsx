import axiosInstance from '../api/axiosInstance'
import { Profile } from '../types'

interface ProfileResponse {
  name: string
  age: number
  gender: 'male' | 'female'
  location: string
  images: string[]
}

interface ProfileService {
  index: (token: string) => Promise<ProfileResponse | null>
  store: (token: string, data: Profile) => Promise<ProfileResponse | null>
  update: (
    token: string,
    data: Profile,
    profileId: number
  ) => Promise<ProfileResponse | null>
}

const profileService: ProfileService = {
  index: async token => {
    try {
      const response = await axiosInstance.get<ProfileResponse>('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  },
  store: async (token, data) => {
    try {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('age', data.age.toString())
      formData.append('gender', data.gender)
      formData.append('location', data.location)

      data.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file)
      })

      const response = await axiosInstance.post<ProfileResponse>(
        '/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
      return null
    }
  },
  update: async (token, data) => {
    try {
      const response = await axiosInstance.post<ProfileResponse>(
        '/profile/update',
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
      return null
    }
  },
}

export default profileService
