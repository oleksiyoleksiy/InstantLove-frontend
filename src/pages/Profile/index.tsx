import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import {
  GenderFemale,
  GenderMale,
  ImageFill,
  PersonBoundingBox,
  PlusCircleFill,
  TrashFill,
} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { toast } from 'react-toastify'
import { Gender, Profile as ProfileType } from '../../types'
import { useNavigate } from 'react-router-dom'

interface Error {
  name?: string
  age?: string
  location?: string
  gender?: string
  image?: string
}

function Profile() {
  const limit = 5
  const minAge = 14
  const [files, setFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [gender, setGender] = useState<Gender | ''>('')
  const [errors, setErrors] = useState<Error>({})
  const [profile, setProfile] = useState<ProfileType>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addImage = (file: File) => {
    if (files.length < limit) {
      const newUrl = URL.createObjectURL(file)
      setFiles(prevFiles => [...prevFiles, file])
      setImageUrls(prevUrls => [...prevUrls, newUrl])
    }
  }

  const removeImage = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      addImage(file)
      e.target.value = ''
    }
  }

  const validateForm = () => {
    const newErrors: Error = {}

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

    setProfile(profile)
    dispatch(userActions.setProfile(profile))
    navigate('/new/preferences')
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.header}>
          <PersonBoundingBox className={styles.header__icon} />
          <h1 className={styles.header__title}>your profile</h1>
        </div>
        <div className={styles.form__group}>
          <div
            className={`${styles.imageUploadContainer} ${
              files.length === limit
                ? styles.imageUploadContainer_disabled
                : styles.imageUploadContainer_active
            }`}
          >
            <div className={styles.uploadPlaceholder}>
              <div className={styles.uploadPlaceholder__iconHolder}>
                <ImageFill className={styles.uploadPlaceholder__imageIcon} />
                <PlusCircleFill
                  className={styles.uploadPlaceholder__plusIcon}
                />
              </div>
            </div>
            <input
              type="file"
              disabled={files.length === limit}
              onChange={handleFileChange}
              className={styles.imageUpload}
              accept=".png,.jpg,.jpeg"
            />
          </div>
        </div>
        <div className={styles.imageListHolder}>
          {files.length > 0 && (
            <div className={styles.limit}>
              {files.length}/{limit}
            </div>
          )}
          <div className={styles.imageList}>
            {imageUrls.map((url, index) => (
              <div key={index} className={styles.imageItem}>
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className={styles.image}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.removeButton}
                >
                  <TrashFill className={styles.removeButton__icon} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Name</label>
          <input
            required
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            className={styles.form__input}
            placeholder="Name"
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Location</label>
          <input
            required
            onChange={e => setLocation(e.target.value)}
            value={location}
            type="text"
            className={styles.form__input}
            placeholder="Location"
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Age</label>
          <input
            required
            onChange={e => setAge(parseInt(e.target.value) || undefined)}
            value={age !== undefined ? age : ''}
            min={minAge}
            type="number"
            className={styles.form__input}
            placeholder="Age"
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Gender</label>
          <div className={styles.radio}>
            <div
              className={`${styles.radio__holder} ${
                gender === 'male' ? styles.radio_selected : ''
              }`}
            >
              <input
                required
                className={styles.radio__input}
                onChange={e => setGender(e.target.value as Gender)}
                type="radio"
                value="male"
                name="gender"
                />
              <GenderMale className={styles.radio__icon} />
            </div>
            <div
              className={`${styles.radio__holder} ${
                gender === 'female' ? styles.radio_selected : ''
              }`}
              >
              <input
                required
                className={styles.radio__input}
                onChange={e => setGender(e.target.value as Gender)}
                type="radio"
                value="female"
                name="gender"
              />
              <GenderFemale className={styles.radio__icon} />
            </div>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  )
}

export default Profile
