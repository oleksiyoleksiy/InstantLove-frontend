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
  id: number
  name: string
  age: number
  gender: Gender
  images: Image[]
  location: string
}

export interface ProfileData {
  name: string
  age: number
  gender: Gender
  images: File[]
  location: string
}

export interface AgeRange {
  max: number
  min: number
}

export interface Preferences {
  id: number
  age?: number
  max_age?: number
  min_age?: number
  gender: Gender 
}

export interface PreferencesData {
  age?: number
  max_age?: number
  min_age?: number
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
    id: string
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

export interface Image {
  id: number
  path: string
}
