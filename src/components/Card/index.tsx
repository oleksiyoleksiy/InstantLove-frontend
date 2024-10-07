import { ReactNode, useEffect } from 'react'
import styles from './index.module.scss'
import { Profile } from '../../types'

interface Props {
  item: Profile
  className: string
  children?: ReactNode
}

function Card({ item, className, children }: Props) {

  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ backgroundImage: 'url(' + import.meta.env.VITE_IMAGE_ROUTE + item.images[0].path + ')' }}
    >
      {children}
    </div>
  )
}

export default Card
