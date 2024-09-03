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
