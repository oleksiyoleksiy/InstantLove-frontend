export interface Item {
  id: number
  name: string
  age: number
  url: string
  is_liked_you: boolean
}

export type Gender = 'male' | 'female'

export interface Profile {
  name: string
  age: number
  gender: Gender
  images: string[]
  location: string
}

interface AgeRange {
  max: number
  min: number
}

export interface Preferences {
  age: AgeRange
  gender: Gender
  location: string
}
