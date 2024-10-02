import React from 'react'
import { PersonBoundingBox } from 'react-bootstrap-icons'
import styles from './index.module.scss'
import ImageUpload from '../../components/ImageUpload'
import GenderSelector from '../../components/GenderSelector'
import { Gender, ProfileError } from '../../types'

interface Props {
  files: File[]
  name: string
  age: number | undefined
  location: string
  gender: Gender | ''
  setFiles: (files: File[]) => void
  setName: (name: string) => void
  setAge: (age: number | undefined) => void
  setLocation: (location: string) => void
  setGender: (gender: Gender | '') => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onImageRemove: (index: number) => void
  errors: ProfileError
  submitButtonText: string
}

function ProfileForm({
  files,
  name,
  age,
  location,
  gender,
  setFiles,
  setName,
  setAge,
  setLocation,
  setGender,
  onSubmit,
  onImageRemove,
  errors,
  submitButtonText,
}: Props) {
  const minAge = 14
  const limit = 5

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.header}>
        <PersonBoundingBox className={styles.header__icon} />
        <h1 className={styles.header__title}>Your Profile</h1>
      </div>

      <ImageUpload
        files={files}
        limit={limit}
        onFileChange={setFiles}
        onImageRemove={onImageRemove}
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
        setGender={setGender}
        genderList={['male', 'female']}
      />
      {errors?.gender && <div className={styles.error}>{errors.gender}</div>}

      <button type="submit" className={styles.submitButton}>
        {submitButtonText}
      </button>
      {errors?.image && <div className={styles.error}>{errors.image}</div>}
    </form>
  )
}

export default ProfileForm
