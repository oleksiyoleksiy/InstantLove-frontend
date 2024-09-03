import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { userActions } from '../../store/userSlice'
import { Gender, ProfileError, Profile as ProfileType } from '../../types'
import ProfileForm from '../../components/ProfileForm'
import Modal from '../../components/Modal'
import { RootState } from '../../store'

function UpdateProfile() {
  const [files, setFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [errors, setErrors] = useState<ProfileError>({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profile = useSelector((s: RootState) => s.user.profile)

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setAge(profile.age)
      setLocation(profile.location)
      setGender(profile.gender)
      setImageUrls(profile.images)
    }
  }, [])

  const validateForm = () => {
    const newErrors: ProfileError = {}

    if (!name) newErrors.name = 'Please fill in the name field.'
    if (age === undefined) newErrors.age = 'Please fill in the age field.'
    if (!gender) newErrors.gender = 'Please select your gender.'
    if (!location) newErrors.location = 'Please fill in the location field.'
    if (imageUrls.length === 0)
      newErrors.image = 'Please select at least one image.'

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      Object.values(errors).forEach(error => {
        if (error) toast.error(error)
      })
      return
    }

    const profile: ProfileType = {
      name,
      age: age as number,
      gender: gender as Gender,
      images: imageUrls,
      location,
    }

    dispatch(userActions.setProfile(profile))
    navigate('/')
  }

  return (
    <Modal>
      <ProfileForm
        files={files}
        imageUrls={imageUrls}
        name={name}
        age={age}
        location={location}
        gender={gender}
        errors={errors}
        setFiles={setFiles}
        setImageUrls={setImageUrls}
        setName={setName}
        setAge={setAge}
        setLocation={setLocation}
        setGender={setGender}
        onSubmit={handleFormSubmit}
        submitButtonText="update"
      />
    </Modal>
  )
}

export default UpdateProfile
