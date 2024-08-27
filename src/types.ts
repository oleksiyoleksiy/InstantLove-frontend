interface Item {
  id: number
  name: string
  age: number
  url: string
}

interface State {
  suggestions: Item[]
  liked: Item[]
}
