import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PersonPlusFill } from 'react-bootstrap-icons'
import accountService from '../../services/accountService'
import { RegisterData } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authSlice'

const tele = window.Telegram.WebApp

function UserRegistration() {
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const dispatch = useDispatch()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: RegisterData = {
      // telegram_id: tele.initDataUnsafe.user.id,
      telegram_id: import.meta.env.VITE_TELEGRAM_ID,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    const response = await accountService.register(data)
    
    if (response) {
      dispatch(authActions.setToken(response))
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={e => handleFormSubmit(e)}>
        <div className={styles.header}>
          <PersonPlusFill className={styles.header__icon} />
          <h1 className={styles.header__title}>Registration</h1>
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Password</label>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className={styles.form__input}
            placeholder="Password"
          />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Password Confirmation</label>
          <input
            onChange={e => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
            type="password"
            className={styles.form__input}
            placeholder="Password Confirmation"
          />
        </div>
        <button className={styles.submitButton}>register</button>
      </form>
    </div>
  )
}

export default UserRegistration
