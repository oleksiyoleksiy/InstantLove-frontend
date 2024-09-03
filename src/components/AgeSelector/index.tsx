import React from 'react'
import Slider from '@mui/material/Slider'
import { Switch } from '@mui/material'
import { Arrows } from 'react-bootstrap-icons'
import styles from './index.module.scss'
import './index.scss'

interface AgeSelectorProps {
  isRange: boolean
  age: number
  ageRange: number[]
  minAge: number
  maxAge: number
  onSwitchChange: (checked: boolean) => void
  onSliderChange: (newValue: number[]) => void
  onInputChange: (newValue: number) => void
}

const AgeSelector: React.FC<AgeSelectorProps> = ({
  isRange,
  age,
  ageRange,
  minAge,
  maxAge,
  onSwitchChange,
  onSliderChange,
  onInputChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelHolder}>
        <label className={styles.label}>Age</label>
        <Switch
          checked={isRange}
          onChange={e => onSwitchChange(e.target.checked)}
        />
        <Arrows className={styles.icon} />
      </div>
      {isRange ? (
        <>
          <Slider
            className={styles.slider}
            value={ageRange}
            onChange={(e, newValue) => onSliderChange(newValue as number[])}
            valueLabelDisplay="auto"
            min={minAge}
            max={maxAge}
            disableSwap
          />
          <div className={styles.values}>
            <input
              disabled
              type="number"
              value={ageRange[0]}
              min={minAge}
              max={ageRange[1]}
              className={styles.input}
            />
            <input
              disabled
              type="number"
              value={ageRange[1]}
              max={maxAge}
              min={ageRange[0]}
              className={styles.input}
            />
          </div>
        </>
      ) : (
        <input
          type="number"
          value={age}
          onChange={e => onInputChange(parseInt(e.target.value))}
          max={maxAge}
          min={minAge}
          className={styles.input}
        />
      )}
    </div>
  )
}

export default AgeSelector
