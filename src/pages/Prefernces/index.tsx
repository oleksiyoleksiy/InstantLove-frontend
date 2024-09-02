import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  Arrows,
  GenderFemale,
  GenderMale,
  SearchHeartFill,
} from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import { Gender, Preferences as PreferencesType } from '../../types'
import './index.scss'
import Slider from '@mui/material/Slider'
import { Switch } from '@mui/material'
import { userActions } from '../../store/userSlice'
import { useNavigate } from 'react-router-dom'

interface Error {
  age?: string
  gender?: string
}

function Preferences() {
  const minAge = 14
  const maxAge = 40
  const [isRange, setRange] = useState<boolean>(false)
  const [ageRange, setAgeRange] = useState<number[]>([18, 40])
  const [age, setAge] = useState<number>(18)
  const [gender, setGender] = useState<Gender | ''>('')
  const [errors, setErrors] = useState<Error>({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: Error = {}
    if (!gender) newErrors.gender = 'Please select your gender.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      let preferences: PreferencesType = {
        gender: gender as Gender,
      }

      isRange
        ? (preferences.ageRange = {
            min: ageRange[0],
            max: ageRange[1],
          })
        : (preferences.age = age)

      dispatch(userActions.setPreferences(preferences))
      navigate('/')
    }
  }

  // const setMinValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   let number = parseInt(value)

  //   if (value.length > 2 || number > ageRange[1]) {
  //     number = ageRange[1]
  //   }

  //   setAgeRange([number, ageRange[1]])
  // }

  // const setMaxValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   let number = parseInt(value)

  //   if (number < ageRange[0]) {
  //     number = ageRange[0]
  //   }

  //   if (number > maxAge) {
  //     number = maxAge
  //   }

  //   setAgeRange([ageRange[0], number])
  // }

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    setAgeRange(newValue as number[])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setAge(newValue)
  }

  const handleSwitchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setRange(checked)
    if (!checked) {
      setAge(ageRange[0])
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.header}>
          <SearchHeartFill className={styles.header__icon} />
          <h1 className={styles.header__title}>Preferences</h1>
        </div>
        <div className={styles.form__group}>
          <div className={styles.form__labelHolder}>
            <label className={styles.form__label}>Age</label>
            <Switch checked={isRange} onChange={handleSwitchChange} />
            <Arrows className={styles.form__icon} />
          </div>
          {isRange ? (
            <>
              <Slider
                className={styles.slider}
                value={ageRange}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                min={minAge}
                max={maxAge}
                disableSwap
              />
              <div className={styles.values}>
                <input
                  disabled
                  type="number"
                  // onChange={setMinValue}
                  value={ageRange[0]}
                  min={minAge}
                  max={ageRange[1]}
                  className={styles.form__input}
                />
                <input
                  disabled
                  type="number"
                  // onChange={setMaxValue}
                  value={ageRange[1]}
                  max={maxAge}
                  min={ageRange[0]}
                  className={styles.form__input}
                />
              </div>
            </>
          ) : (
            <input
              type="number"
              onChange={handleInputChange}
              value={age}
              max={maxAge}
              min={minAge}
              className={styles.form__input}
            />
          )}
        </div>
        {errors.gender && <div className={styles.error}>{errors.gender}</div>}
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
            <div
              className={`${styles.radio__holder} ${
                gender === 'all' ? styles.radio_selected : ''
              }`}
            >
              <input
                required
                className={styles.radio__input}
                onChange={e => setGender(e.target.value as Gender)}
                type="radio"
                value="all"
                name="gender"
              />
              <div className={styles.radio__icon}>
                all
              </div>
              {/* <GenderFemale className={styles.radio__icon} /> */}
            </div>
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Save
        </button>
      </form>
    </div>
  )
}

export default Preferences
