import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Gender, Preferences as PreferencesType } from '../../types'
import { userActions } from '../../store/userSlice'
import PreferencesForm from '../../components/PreferncesForm'
import Modal from '../../components/Modal'
import { RootState } from '../../store'

function UpdatePreferences() {
  const [isRange, setIsRange] = useState<boolean>(false)
  const [ageRange, setAgeRange] = useState<number[]>([18, 40])
  const [age, setAge] = useState<number>(18)
  const [gender, setGender] = useState<Gender | ''>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const preferences = useSelector((s: RootState) => s.user.preferences)

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

  useEffect(() => {
    if (preferences) {
      setGender(preferences.gender || '')
      if (preferences.age !== undefined) {
        setAge(preferences.age)
      } else if (preferences.ageRange) {
        setAgeRange([preferences.ageRange.min, preferences.ageRange.max])
        setIsRange(true)
      }
    }
  }, [preferences])

  return (
    <Modal>
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
        submitButtonText='update'
      />
    </Modal>
  )
}

export default UpdatePreferences
