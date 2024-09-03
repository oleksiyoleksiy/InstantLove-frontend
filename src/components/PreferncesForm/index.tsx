import React, { useState, useEffect } from 'react'
import { Gender, Preferences } from '../../types'
import AgeSelector from '../AgeSelector'
import GenderSelector from '../GenderSelector'
import styles from './index.module.scss'
import { SearchHeartFill } from 'react-bootstrap-icons'

interface Error {
  gender?: string
}

interface Props {
  preferences?: Preferences
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setGender: (gender: Gender | '') => void
  setAge: (age: number) => void
  setIsRange: (isRange: boolean) => void
  setAgeRange: (ageRange: number[]) => void
  gender: Gender | ''
  age: number
  ageRange: number[]
  isRange: boolean
}

function PreferencesForm({
  onFormSubmit,
  setGender,
  setAge,
  setIsRange,
  setAgeRange,
  gender,
  age,
  ageRange,
  isRange,
}: Props) {
  const minAge = 14
  const maxAge = 40
  const [errors, setErrors] = useState<Error>({})

  const validateForm = () => {
    const newErrors: Error = {}
    // if (!preferences?.gender) newErrors.gender = 'Please select your gender.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (validateForm()) {
      onFormSubmit(e)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.header}>
        <SearchHeartFill className={styles.header__icon} />
        <h1 className={styles.header__title}>Preferences</h1>
      </div>
      <AgeSelector
        isRange={isRange}
        age={age}
        ageRange={ageRange}
        minAge={minAge}
        maxAge={maxAge}
        onSwitchChange={setIsRange}
        onSliderChange={setAgeRange}
        onInputChange={setAge}
      />
      {errors.gender && <div className={styles.error}>{errors.gender}</div>}
      <GenderSelector
        selectedGender={gender}
        setGender={setGender}
        genderList={['male', 'female', 'all']}
      />
      <button type="submit" className={styles.submitButton}>
        Save
      </button>
    </form>
  )
}

export default PreferencesForm
