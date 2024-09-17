import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { userActions } from '../../store/userSlice'
import { Gender, ProfileError, Profile as ProfileType } from '../../types'
import ProfileForm from '../../components/ProfileForm'

function Profile() {
  const minAge = 14
  const limit = 5
  const [files, setFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [errors, setErrors] = useState<ProfileError>({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const validateForm = () => {
  //   const newErrors: ProfileError = {}

  //   if (!name) newErrors.name = 'Please fill in the name field.'
  //   if (age === undefined) newErrors.age = 'Please fill in the age field.'
  //   if (!gender) newErrors.gender = 'Please select your gender.'
  //   if (!location) newErrors.location = 'Please fill in the location field.'
  //   if (imageUrls.length === 0)
  //     newErrors.image = 'Please select at least one image.'

  //   setErrors(newErrors)

  //   return Object.keys(newErrors).length === 0
  // }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (!validateForm()) {
    //   Object.values(errors).forEach(error => {
    //     if (error) toast.error(error)
    //   })
    //   return
    // }

    const profile: ProfileType = {
      name,
      age: age as number,
      gender: gender as Gender,
      images: imageUrls,
      location,
    }

    dispatch(userActions.setProfile(profile))
    navigate('/new/preferences')
  }

  return (
    <div className={styles.container}>
      <ProfileForm
        files={files}
        imageUrls={imageUrls}
        name={name}
        age={age}
        location={location}
        gender={gender}
        setFiles={setFiles}
        setImageUrls={setImageUrls}
        setName={setName}
        setAge={setAge}
        setLocation={setLocation}
        setGender={setGender}
        errors={errors}
        onSubmit={handleFormSubmit}
        submitButtonText="create"
      />
    </div>
  )
}

export default Profile
