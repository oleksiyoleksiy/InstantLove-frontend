import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import {
  ImageFill,
  PlusCircleFill,
  Trash2Fill,
  TrashFill,
} from 'react-bootstrap-icons'

function Profile() {
  const limit: number = 5
  const minAge: number = 14
  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    console.log(images)
  }, [images])

  const addImage = (image: File) => {
    setImages(prevImages => [...prevImages, image])
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      addImage(file)
      e.target.value = ''
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.form__group}>
          <div
            className={`${styles.imageUploadContainer} ${
              images.length === limit
                ? styles.imageUploadContainer_disabled
                : styles.imageUploadContainer_active
            }`}
          >
            <div className={styles.uploadPlaceholder}>
              <div className={styles.uploadPlaceholder__iconHolder}>
                <ImageFill className={styles.uploadPlaceholder__imageIcon} />
                <PlusCircleFill
                  className={styles.uploadPlaceholder__plusIcon}
                />
              </div>
            </div>
            <input
              type="file"
              required
              disabled={images.length === limit}
              onChange={e => handleFileChange(e)}
              className={styles.imageUpload}
              accept=".png,.jpg,.jpeg"
            />
          </div>
        </div>
        <div className={styles.imageListHolder}>
          {images.length > 0 && (
            <div className={styles.limit}>
              {images.length}/{limit}
            </div>
          )}
          <div className={styles.imageList}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageItem}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className={styles.image}
                />
                <button
                  onClick={() => removeImage(index)}
                  className={styles.removeButton}
                >
                  <TrashFill className={styles.removeButton__icon} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Name</label>
          <input required type="text" className={styles.form__input} placeholder='Name' />
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Location</label>
          <input required type="text" className={styles.form__input} placeholder='Location'/>
        </div>
        <div className={styles.form__group}>
          <label className={styles.form__label}>Age</label>
          <input required min={minAge} type="number" className={styles.form__input} placeholder='Age'/>
        </div>
            <button type='submit' className={styles.submitButton}>Create</button>
      </div>
    </div>
  )
}

export default Profile
