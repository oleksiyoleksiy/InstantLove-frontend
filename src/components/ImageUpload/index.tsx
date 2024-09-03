import React from 'react'
import { ImageFill, PlusCircleFill, TrashFill } from 'react-bootstrap-icons'
import styles from './index.module.scss'

interface Props {
  files: File[]
  imageUrls: string[]
  limit: number
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
}

function ImageUpload({
  files,
  imageUrls,
  limit,
  onFileChange,
  onRemoveImage,
}: Props) {
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
            onChange={onFileChange}
            className={styles.imageUpload}
            accept=".png,.jpg,.jpeg"
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
          {imageUrls.map((url, index) => (
            <div key={index} className={styles.imageItem}>
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className={styles.image}
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
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
