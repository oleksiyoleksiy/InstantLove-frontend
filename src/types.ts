export interface Item {
  id: number
  name: string
  age: number
  gender: Gender
  url: string
  is_liked_you: boolean
}

export type Gender = 'male' | 'female' | 'all'

export interface Profile {
  name: string
  age: number
  gender: Gender
  images: string[]
  location: string
}

export interface AgeRange {
  max: number
  min: number
}

export interface Preferences {
  age?: number
  ageRange?: AgeRange
  gender: Gender
}

export interface ProfileError {
  name?: string
  age?: string
  location?: string
  gender?: string
  image?: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface InitDataUnsafe {
  auth_date: string
  hash: string
  query_id: string
  user: {
    id: string,
    first_name?: string
    last_name?: string
  }
}

export interface LoginData {
  telegram_id: string
  password: string
}

export interface RegisterData extends LoginData {
  password_confirmation: string
} 
