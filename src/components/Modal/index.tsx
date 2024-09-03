import React from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { X } from 'react-bootstrap-icons'

interface Props {
  children: React.ReactNode
}

function Modal({ children }: Props) {
  const navigate = useNavigate()

  return (
    <div className={styles.container} onClick={() => navigate('/')}>
      <div className={styles.holder} onClick={e => e.stopPropagation()}>
        <Link to="/" className={styles.closeButton}>
          <X className={styles.closeButton__icon} />
        </Link>
        <div className={styles.formContainer}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
