import { ReactNode } from 'react'
import styles from './index.module.scss'
import { Item } from '../../types'

interface Props {
  item: Item
  className: string
  children?: ReactNode
}

function Card({ item, className, children }: Props) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ backgroundImage: 'url(' + item.url + ')' }}
    >
      {children}
    </div>
  )
}

export default Card
