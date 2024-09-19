import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PersonCheckFill, PersonPlusFill } from 'react-bootstrap-icons'
import accountService from '../../services/accountService'
import { LoginData, RegisterData } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authSlice'

const tele = window.Telegram.WebApp

function UserLogin() {
  const [password, setPassword] = useState<string>('')
  const dispatch = useDispatch()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: LoginData = {
      // telegram_id: tele.initDataUnsafe.user.id,
      telegram_id: import.meta.env.VITE_TELEGRAM_ID,
      password: password,
    }

    const response = await accountService.login(data)
    
    if (response) {
      dispatch(authActions.setToken(response))
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={e => handleFormSubmit(e)}>
        <div className={styles.header}>
          <PersonCheckFill className={styles.header__icon} />
          <h1 className={styles.header__title}>Login</h1>
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
        <button className={styles.submitButton}>login</button>
      </form>
    </div>
  )
}

export default UserLogin
