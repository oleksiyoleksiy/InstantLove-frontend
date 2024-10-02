import axiosInstance from '../api/axiosInstance'
import { Profile } from '../types'

interface Data {
  images: File[]
}

interface ImageService {
  store: (
    token: string,
    profileId: number,
    data: Data
  ) => Promise<Profile | undefined>
  destroy: (
    token: string,
    profileId: number,
    imageId: number
  ) => Promise<Profile | undefined>
}

const imageService: ImageService = {
  store: async (token, profileId, data) => {
    try {
      const response = await axiosInstance.post<Profile>(
        `/profile/${profileId}/image`,
        data,
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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
  destroy: async (token, profileId, imageId) => {
    try {
      const response = await axiosInstance.delete<Profile>(
        `/profile/${profileId}/image/${imageId}`,
        {
          headers: {
            Authorization: `bearer ${token}`,
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

export default imageService
