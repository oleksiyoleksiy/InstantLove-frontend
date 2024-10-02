import React, { useEffect, useState } from 'react'
import { ImageFill, PlusCircleFill, TrashFill } from 'react-bootstrap-icons'
import styles from './index.module.scss'
import { Profile } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface Props {
  limit: number
  files: File[]
  onFileChange: (files: File[]) => void
  onImageRemove: (index: number) => void
}

function ImageUpload({ limit, files, onFileChange, onImageRemove }: Props) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const profile = useSelector((s: RootState) => s.user.profile)

  useEffect(() => {
    if (!profile) {
      const newUrls = files.map(file => URL.createObjectURL(file))
      setImageUrls(newUrls)

      return () => {
        newUrls.forEach(url => URL.revokeObjectURL(url))
      }
    }
  }, [files])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles].slice(0, limit)
    onFileChange(newFiles)
    e.target.value = ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageUploadHolder}>
        <div
          className={`${styles.imageUploadContainer} ${
            files.length === limit
              ? styles.imageUploadContainer_disabled
              : styles.imageUploadContainer_active
          }`}
        >
          <div className={styles.uploadPlaceholder}>
            <div className={styles.uploadPlaceholder__iconHolder}>
              <ImageFill className={styles.uploadPlaceholder__imageIcon} />
              <PlusCircleFill className={styles.uploadPlaceholder__plusIcon} />
            </div>
          </div>
          <input
            type="file"
            disabled={files.length === limit}
            onChange={handleFileChange}
            className={styles.imageUpload}
            accept=".png,.jpg,.jpeg,.webp"
            multiple
          />
        </div>
      </div>

      <div className={styles.imageListHolder}>
        <div className={styles.imageList}>
          {profile
            ? profile.images.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img
                    src={import.meta.env.VITE_IMAGE_ROUTE + image.path}
                    alt="profile-image"
                    className={styles.image}
                  />
                  <button
                    type="button"
                    onClick={() => onImageRemove(image.id)}
                    className={styles.removeButton}
                  >
                    <TrashFill className={styles.removeButton__icon} />
                  </button>
                </div>
              ))
            : imageUrls.map((url, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={url} alt="profile-image" className={styles.image} />
                  <button
                    type="button"
                    onClick={() => onImageRemove(index)}
                    className={styles.removeButton}
                  >
                    <TrashFill className={styles.removeButton__icon} />
                  </button>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
