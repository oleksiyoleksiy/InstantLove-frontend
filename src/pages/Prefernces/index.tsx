import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Gender, PreferencesData } from '../../types'
import { userActions } from '../../store/userSlice'
import styles from './index.module.scss'
import PreferencesForm from '../../components/PreferncesForm'
import preferenceService from '../../services/preferenceService'
import { RootState } from '../../store'
import { toast } from 'react-toastify'

function Preferences() {
  const [isRange, setIsRange] = useState<boolean>(false)
  const [ageRange, setAgeRange] = useState<number[]>([18, 40])
  const [age, setAge] = useState<number>(18)
  const [gender, setGender] = useState<Gender | ''>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((s: RootState) => s.auth.accessToken)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (token && gender) {
      const data: PreferencesData = {
        gender,
      }

      if (isRange) {
        data.min_age = ageRange[0]
        data.max_age = ageRange[1]
      } else {
        data.age = age
      }

      const response = await preferenceService.store(token, data)

      if (response) {
        dispatch(userActions.setPreferences(response))
        navigate('/')
      }
    }
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
        submitButtonText="save"
      />
    </div>
  )
}

export default Preferences
