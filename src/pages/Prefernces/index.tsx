import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Gender, Preferences as PreferencesType } from '../../types'
import { userActions } from '../../store/userSlice'
import styles from './index.module.scss'
import PreferencesForm from '../../components/PreferncesForm'

function Preferences() {
  const [isRange, setIsRange] = useState<boolean>(false)
  const [ageRange, setAgeRange] = useState<number[]>([18, 40])
  const [age, setAge] = useState<number>(18)
  const [gender, setGender] = useState<Gender | ''>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const preferences: PreferencesType = {
      gender: gender as Gender,
      ...(isRange
        ? { ageRange: { min: ageRange[0], max: ageRange[1] } }
        : { age }),
    }

    dispatch(userActions.setPreferences(preferences))
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <PreferencesForm
        gender={gender}
        age={age}
        ageRange={ageRange}
        isRange={isRange}
        setIsRange={setIsRange}
        setAgeRange={setAgeRange}
        setAge={setAge}
        setGender={setGender}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default Preferences
