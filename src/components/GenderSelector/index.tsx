import { GenderFemale, GenderMale } from 'react-bootstrap-icons'
import styles from './index.module.scss'
import { Gender } from '../../types'

interface Props {
  genderList: Gender[]
  selectedGender: Gender | ''
  setGender: (gender: Gender) => void
}

function GenderSelector({ selectedGender, genderList, setGender }: Props) {
  const icons = {
    male: <GenderMale className={styles.radio__icon} />,
    female: <GenderFemale className={styles.radio__icon} />,
    all: (
      <div className={`${styles.radio__icon} ${styles.iconHolder}`}>
        <GenderMale className={styles.maleIcon} />
        <GenderFemale className={styles.femaleIcon} />
      </div>
    ),
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>Gender</label>
      <div className={styles.radio}>
        {genderList.map((item, index) => (
          <div
            key={index}
            className={`${styles.radio__holder} ${
              selectedGender === item ? styles.radio_selected : ''
            }`}
          >
            <input
              required
              className={styles.radio__input}
              onChange={e => setGender(e.target.value as Gender)}
              type="radio"
              value={item}
              name="gender"
            />
            {icons[item]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenderSelector
