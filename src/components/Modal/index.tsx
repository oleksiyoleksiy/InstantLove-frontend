import React from 'react'
import styles from './index.module.scss'

interface Props {
  children: React.ReactNode
}

function Modal({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}

export default Modal
