import React from 'react'
import { PersonBoundingBox } from 'react-bootstrap-icons'
import styles from './index.module.scss'
import ImageUpload from '../../components/ImageUpload'
import GenderSelector from '../../components/GenderSelector'
import { Gender, ProfileError } from '../../types'



interface Props {
  files: File[]
  imageUrls: string[]
  name: string
  age: number | undefined
  location: string
  gender: Gender | ''
  setFiles: (files: File[]) => void
  setImageUrls: (imageUrls: string[]) => void
  setName: (name: string) => void
  setAge: (age: number | undefined) => void
  setLocation: (location: string) => void
  setGender: (gender: Gender | '') => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: ProfileError
}

function ProfileForm({
  files,
  imageUrls,
  name,
  age,
  location,
  gender,
  setFiles,
  setImageUrls,
  setName,
  setAge,
  setLocation,
  setGender,
  onSubmit,
  errors,
}: Props) {
  const minAge = 14
  const limit = 5

  const addImage = (file: File) => {
    if (files.length < limit) {
      const newUrl = URL.createObjectURL(file)
      setFiles([...files, file])
      setImageUrls([...imageUrls, newUrl])
    }
  }

  const removeImage = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      addImage(file)
      e.target.value = ''
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.header}>
        <PersonBoundingBox className={styles.header__icon} />
        <h1 className={styles.header__title}>Your Profile</h1>
      </div>
      <ImageUpload
        files={files}
        imageUrls={imageUrls}
        limit={limit}
        onFileChange={handleFileChange}
        onRemoveImage={removeImage}
      />
      <div className={styles.form__group}>
        <label className={styles.form__label}>Name</label>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
          className={styles.form__input}
          placeholder="Name"
        />
        {errors?.name && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div className={styles.form__group}>
        <label className={styles.form__label}>Location</label>
        <input
          onChange={e => setLocation(e.target.value)}
          value={location}
          type="text"
          className={styles.form__input}
          placeholder="Location"
        />
        {errors?.location && (
          <div className={styles.error}>{errors.location}</div>
        )}
      </div>
      <div className={styles.form__group}>
        <label className={styles.form__label}>Age</label>
        <input
          onChange={e => setAge(parseInt(e.target.value) || undefined)}
          value={age !== undefined ? age : ''}
          min={minAge}
          type="number"
          className={styles.form__input}
          placeholder="Age"
        />
        {errors?.age && <div className={styles.error}>{errors.age}</div>}
      </div>
      <GenderSelector
        selectedGender={gender}
        genderList={['male', 'female']}
        setGender={setGender}
      />
      {errors?.gender && <div className={styles.error}>{errors.gender}</div>}
      <button type="submit" className={styles.submitButton}>
        Create
      </button>
      {errors?.image && <div className={styles.error}>{errors.image}</div>}
    </form>
  )
}

export default ProfileForm
