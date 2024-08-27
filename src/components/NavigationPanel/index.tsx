import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import { ArrowThroughHeartFill, Heart, HeartFill } from 'react-bootstrap-icons'
import './index.scss'

function NavigationPanel() {
  return (
    <nav className={styles.container}>
      <NavLink to="/" active className={styles.link}>
        <ArrowThroughHeartFill className={styles.link__icon} />
      </NavLink>
      <NavLink to="/liked" active className={styles.link}>
        <HeartFill className={styles.link__icon} />
      </NavLink>
    </nav>
  )
}

export default NavigationPanel
