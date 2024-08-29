import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { ImageFill, PlusCircleFill, TrashFill } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/userSlice'
import { toast } from 'react-toastify'

interface Error {
  name?: string
  age?: string
  location?: string
  gender?: string
  image?: string
}

type Gender = 'male' | 'female'

interface Profile {
  name: string
  age: number
  gender: Gender
  images: File[]
  location: string
}

function Profile() {
  const limit = 5
  const minAge = 14
  const [images, setImages] = useState<File[]>([])
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number | undefined>(undefined)
  const [location, setLocation] = useState<string>('')
  const [gender, setGender] = useState<Gender | ''>('') // Початкове значення - порожній рядок
  const [errors, setErrors] = useState<Error>({})
  const dispatch = useDispatch()

  const addImage = (image: File) => {
    if (images.length < limit) {
      setImages(prevImages => [...prevImages, image])
    }
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
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
    if (images.length === 0)
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

    const profile: Profile = {
      name,
      age: age as number,
      gender: gender as Gender, 
      images,
      location,
    }

    dispatch(userActions.setProfile(profile))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.form__group}>
          <div
            className={`${styles.imageUploadContainer} ${
              images.length === limit
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
              disabled={images.length === limit}
              onChange={handleFileChange}
              className={styles.imageUpload}
              accept=".png,.jpg,.jpeg"
            />
          </div>
        </div>
        <div className={styles.imageListHolder}>
          {images.length > 0 && (
            <div className={styles.limit}>
              {images.length}/{limit}
            </div>
          )}
          <div className={styles.imageList}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageItem}>
                <img
                  src={URL.createObjectURL(image)}
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
          <select
            required
            value={gender || ''}
            onChange={e => setGender(e.target.value as Gender)}
            className={styles.form__input}
          >
            <option value="">Your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Create
        </button>
      </form>
    </div>
  )
}

export default Profile
