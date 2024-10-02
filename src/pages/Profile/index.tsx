import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { userActions } from '../../store/userSlice'
import ProfileForm from '../../components/ProfileForm'
import profileService from '../../services/profileService'
import { RootState } from '../../store'
import { ProfileData, ProfileError, Gender } from '../../types'

function Profile() {
  const [files, setFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [errors, setErrors] = useState<ProfileError>({})
  const token = useSelector((s: RootState) => s.auth.accessToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!age || !gender || files.length === 0) {
        setErrors({
          age: !age ? 'Age is required' : undefined,
          gender: !gender ? 'Gender is required' : undefined,
          image:
            files.length === 0 ? 'At least one image is required' : undefined,
        })
        return
      }

      try {
        if (token) {
          const data: ProfileData = {
            name,
            age,
            gender,
            images: files,
            location,
          }

          const response = await profileService.store(token, data)

          if (response) {
            dispatch(userActions.setProfile(response))
            navigate('/new/preferences')
          }
        }
      } catch (error) {
        // Handle error response
      }
    }

    const handleImageRemove = (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
    }

  return (
    <div className={styles.container}>
      <ProfileForm
        files={files}
        name={name}
        age={age}
        location={location}
        gender={gender}
        setFiles={setFiles}
        setName={setName}
        setAge={setAge}
        setLocation={setLocation}
        setGender={setGender}
        errors={errors}
        onImageRemove={handleImageRemove}
        onSubmit={handleFormSubmit}
        submitButtonText="Create"
      />
    </div>
  )
}

export default Profile
