// import { Autocomplete, TextField } from '@mui/material'
// import { useEffect, useState } from 'react'
// import { useDebouncedCallback } from 'use-debounce'
// import Fuse from 'fuse.js'
// import cities from 'cities.json'

// interface City {
//   name: string
//   country: string
//   lat: number
//   lng: number
//   admin1: string
//   admin2: string
// }

// interface Props {
//   location: string
//   onChange: (location: string) => void
// }

// const fuse = new Fuse(cities as City[], {
//   keys: ['name'],
//   threshold: 0.1,
// })

// function LocationSelect({ location, onChange }: Props) {
//   const [options, setOptions] = useState<string[]>([])

//   useEffect(() => {
//     if (!location) {
//       setOptions([])
//     }
//   }, [location])

//   const fetchLocations = useDebouncedCallback((query: string) => {
//     const results = fuse.search(query) // Шукаємо відповідності через Fuse.js
//     const filteredCities = results.slice(0, 10).map(result => result.item.name) // Перші 10 результатів

//     setOptions(filteredCities)
//   }, 300) // 300 мс затримки

//   useEffect(() => {
//     if (location) {
//       fetchLocations(location) // Викликаємо пошук з затримкою
//     }
//   }, [location])

//   const handleInputChange = (event: any, newInputValue: string) => {
//     onChange(newInputValue)
//   }

//   const handleSelectChange = (event: any, newValue: string | null) => {
//     if (newValue) {
//       onChange(newValue)
//     }
//   }

//   return (
//     <Autocomplete
//       disablePortal
//       value={location}
//       onInputChange={handleInputChange}
//       onChange={handleSelectChange}
//       options={options}
//       sx={{ width: 300 }}
//       renderInput={params => <TextField {...params} />}
//     />
//   )
// }

// export default LocationSelect
