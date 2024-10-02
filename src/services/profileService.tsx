import axiosInstance from '../api/axiosInstance'
import { Gender, Profile, ProfileData } from '../types'

interface ProfileService {
  index: (token: string) => Promise<Profile | undefined>
  store: (token: string, data: ProfileData) => Promise<Profile | undefined>
  update: (
    token: string,
    data: object,
    id: number
  ) => Promise<Profile | undefined>
}

const profileService: ProfileService = {
  index: async token => {
    try {
      const response = await axiosInstance.get<Profile>('/profile', {
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
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('age', data.age.toString())
      formData.append('gender', data.gender)
      formData.append('location', data.location)

      data.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file)
      })

      const response = await axiosInstance.post<Profile>('/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (e: any) {
      if (e.response && e.response.data) {
        console.log(e.response.data)
      }
    }
  },
  update: async (token, data, id) => {
    try {
      const response = await axiosInstance.put<Profile>(
        `/profile/${id}`,
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

export default profileService
