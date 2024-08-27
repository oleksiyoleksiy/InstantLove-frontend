import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import { ArrowThroughHeartFill, Heart, HeartFill } from 'react-bootstrap-icons'
import './index.scss'

function NavigationPanel() {
  return (
    <nav className={styles.container}>
      <NavLink active="active" className={styles.link}>
        <ArrowThroughHeartFill className={styles.link__icon} />
      </NavLink>
    </nav>
  )
}

export default NavigationPanel
