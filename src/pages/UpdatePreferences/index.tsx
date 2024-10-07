import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Gender, PreferencesData } from '../../types'
import { userActions } from '../../store/userSlice'
import PreferencesForm from '../../components/PreferncesForm'
import Modal from '../../components/Modal'
import { RootState } from '../../store'
import preferenceService from '../../services/preferenceService'
import { toast } from 'react-toastify'
import suggestionService from '../../services/suggestionService'
import { matchActions } from '../../store/matchSlice'

function UpdatePreferences() {
  const [isRange, setIsRange] = useState<boolean>(false)
  const [ageRange, setAgeRange] = useState<number[]>([18, 40])
  const [age, setAge] = useState<number>(18)
  const [gender, setGender] = useState<Gender | ''>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const preferences = useSelector((s: RootState) => s.user.preferences)
  const token = useSelector((s: RootState) => s.auth.accessToken)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (token && gender && preferences) {
      const data: PreferencesData = {
        gender,
      }

      if (isRange) {
        data.min_age = ageRange[0]
        data.max_age = ageRange[1]
      } else {
        data.age = age
      }

      const response = await preferenceService.update(
        token,
        data,
        preferences.id
      )

      if (response) {
        dispatch(userActions.setPreferences(response.preferences))
        dispatch(matchActions.setSuggestions(response.suggestions))
        toast.success('your preferences was updated')
        navigate('/')
      }
    }
  }

  useEffect(() => {
    if (!preferences) {
      fetchPreferences()
    }
  }, [])

  const fetchPreferences = async () => {

    if (token) {
      const response = await preferenceService.index(token)

      if (response) {
        dispatch(userActions.setPreferences(response))
      }
    }
  }

  useEffect(() => {
    if (preferences) {
      setGender(preferences.gender)
      setIsRange(!preferences.age)

      if (preferences.age) {
        setAge(preferences.age)
      }

      if (preferences.min_age && preferences.max_age) {
        setAgeRange([preferences.min_age, preferences.max_age])
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
        submitButtonText="update"
      />
    </Modal>
  )
}

export default UpdatePreferences
