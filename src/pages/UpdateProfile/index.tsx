import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../../store/userSlice'
import { Gender, Profile, ProfileData, ProfileError } from '../../types'
import ProfileForm from '../../components/ProfileForm'
import Modal from '../../components/Modal'
import { RootState } from '../../store'
import imageService from '../../services/imageService'
import profileService from '../../services/profileService'

function UpdateProfile() {
  const [files, setFiles] = useState<File[]>([]) // Для нових файлів
  const [imageUrls, setImageUrls] = useState<string[]>([]) // Для нових зображень (preview)
  const [name, setName] = useState<string>('') // Поле для імені
  const [age, setAge] = useState<number | undefined>(undefined) // Поле для віку
  const [location, setLocation] = useState<string>('') // Поле для місцезнаходження
  const [gender, setGender] = useState<Gender | ''>('') // Поле для гендеру
  const [errors, setErrors] = useState<ProfileError>({}) // Для помилок у формі
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector((s: RootState) => s.user.profile)
  const token = useSelector((s: RootState) => s.auth.accessToken)

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setAge(profile.age)
      setLocation(profile.location)
      setGender(profile.gender)
      // setImages()
    }
  }, [profile])

  // const setImages = async () => {
  //   try {
  //     if (profile) {
  //       const loadedFiles = await Promise.all(
  //         profile.images.map(
  //           async image => await imageService.getImage(image) // Отримуємо файли
  //         )
  //       )

  //       setFiles(loadedFiles as File[])
  //       setImageUrls(
  //         profile.images.map(i => import.meta.env.VITE_IMAGE_ROUTE + i)
  //       )
  //     }
  //   } catch (error) {
  //     console.error('Failed to load images:', error)
  //   }
  // }

  // // Валідація форми
  // const validateForm = () => {
  //   const newErrors: ProfileError = {}

  //   if (!name) newErrors.name = 'Please fill in the name field.'
  //   if (age === undefined) newErrors.age = 'Please fill in the age field.'
  //   if (!gender) newErrors.gender = 'Please select your gender.'
  //   if (!location) newErrors.location = 'Please fill in the location field.'
  //   if (files.length === 0 && oldFiles.length === 0)
  //     newErrors.image = 'Please select at least one image.'

  //   setErrors(newErrors)

  //   return Object.keys(newErrors).length === 0
  // }

  // Обробка відправки форми
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (!validateForm()) {
    //   Object.values(errors).forEach(error => {
    //     if (error) toast.error(error)
    //   })
    //   return
    // }

    if (profile && token) {
      const data = {
        name: name,
        location: location,
        age: age,
        gender: gender,
      }

      const response = await profileService.update(token, data, profile.id)

      if (response) {
        dispatch(userActions.setProfile(response))
        toast.success('your profile was updated')
        navigate('/')
      }
    }
  }

  const handleImageRemove = async (index: number) => {
    
    
    if (token && profile) {
      if (profile.images.length === 1) {
        toast.error('at least one image must be in your profile')
        return
      }

      const response = await imageService.destroy(token, profile.id, index)

      console.log(response)

      if (response) {
        dispatch(userActions.setProfile(response))
      }
    }
  }

  const handleImageAdd = async (images: File[]) => {
    if (token && profile) {
      console.log(profile)

      const data = {
        images: images,
      }

      const response = await imageService.store(token, profile.id, data)

      if (response) {
        dispatch(userActions.setProfile(response))
      }
    }
  }

  return (
    <Modal>
      <ProfileForm
        files={files}
        // imageUrls={imageUrls}
        profile={profile}
        name={name}
        age={age}
        location={location}
        gender={gender}
        errors={errors}
        setFiles={handleImageAdd}
        setName={setName}
        setAge={setAge}
        setLocation={setLocation}
        setGender={setGender}
        onSubmit={handleFormSubmit}
        submitButtonText="Update"
        onImageRemove={handleImageRemove}
      />
    </Modal>
  )
}

export default UpdateProfile
