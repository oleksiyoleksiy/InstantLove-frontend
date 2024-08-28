import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import {
  ArrowThroughHeartFill,
  Heart,
  HeartFill,
  PersonHeart,
  PersonHearts,
} from 'react-bootstrap-icons'
import './index.scss'

function NavigationPanel() {
  return (
    <nav className={styles.container}>
      <div className={styles.holder}>
        <NavLink to="/" active="active" className={styles.link}>
          <ArrowThroughHeartFill className={styles.link__icon} />
        </NavLink>
        <NavLink to="/liked" active="active" className={styles.link}>
          <HeartFill className={styles.link__icon} />
        </NavLink>
        <NavLink to="/matches" active="active" className={styles.link}>
          <PersonHeart className={styles.link__icon} />
        </NavLink>
      </div>
    </nav>
  )
}

export default NavigationPanel
