import axios from 'axios'
// import store from '../store'
// import { authActions } from '../store/authSlice'
// import { getNavigate } from '../navigate'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    Accept: 'application/json',
  },
})

// axiosInstance.interceptors.request.use(
//   config => {
//     const accessToken = localStorage.getItem('accessToken')
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         const refreshToken = store.getState().auth.refreshToken

//         if (!refreshToken) {
//           throw new Error('No refresh token available')
//         }

//         const response = await axios.post(
//           `${import.meta.env.VITE_API_DOMAIN}/refresh`,
//           null,
//           {
//             headers: {
//               Accept: 'application/json',
//               Authorization: `Bearer ${refreshToken}`,
//             },
//           }
//         )

//         store.dispatch(authActions.setToken(response.data))

//         const { accessToken } = response.data

//         axiosInstance.defaults.headers.common[
//           'Authorization'
//         ] = `Bearer ${accessToken}`

//         return axiosInstance(originalRequest)
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError)
//         const navigate = getNavigate()
//         store.dispatch(authActions.logout())
//         navigate('/login')
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error) // For all other errors, return the error as is.
//   }
// )

export default axiosInstance
