import React, { useState, useEffect } from 'react'
import { ImageFill, PlusCircleFill, TrashFill } from 'react-bootstrap-icons'
import styles from './index.module.scss'

interface Props {
  limit: number
  onFileChange: (files: File[]) => void
}

function ImageUpload({ limit, onFileChange }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])

  // Очищення URL при розмонтуванні компоненту
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [imageUrls])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles = [...files, ...selectedFiles].slice(0, limit)

    setFiles(newFiles)

    // Очищення старих URL
    imageUrls.forEach(url => URL.revokeObjectURL(url))

    const newImageUrls = newFiles.map(file => URL.createObjectURL(file))
    setImageUrls(newImageUrls)

    onFileChange(newFiles)

    // Очищення input для завантаження повторного файлу
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newImageUrls = imageUrls.filter((_, i) => i !== index)

    // Звільнення URL видаленого зображення
    URL.revokeObjectURL(imageUrls[index])

    setFiles(newFiles)
    setImageUrls(newImageUrls)

    onFileChange(newFiles)
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
            accept=".png,.jpg,.jpeg"
            multiple
          />
        </div>
      </div>

      <div className={styles.imageListHolder}>
        {files.length > 0 && (
          <div className={styles.limit}>
            {files.length}/{limit}
          </div>
        )}
        <div className={styles.imageList}>
          {imageUrls &&
            imageUrls.map((url, index) => (
              <div key={index} className={styles.imageItem}>
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className={styles.image}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
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
