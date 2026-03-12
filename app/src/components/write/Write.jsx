import { useEffect, useRef, useState } from 'react'
import Styles from './Write.module.css'
import Button from '../buttons/Button'
import _delete from '../../assets/icons/icon-delete-white.svg'
import activeDelete from '../../assets/icons/icon-delete-white-1.svg'
import save from '../../assets/icons/icon-save.svg'
import activeSave from '../../assets/icons/icon-save-white.svg'
import imageIcon from '../../assets/icons/icon-image-primary.svg'
import activeImageIcon from '../../assets/icons/icon-image.svg'


export default function Write() {
    const [content, setContent] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (!selectedImage) {
            setPreviewUrl('')
            return undefined
        }

        const nextPreviewUrl = URL.createObjectURL(selectedImage)
        setPreviewUrl(nextPreviewUrl)

        return () => {
            URL.revokeObjectURL(nextPreviewUrl)
        }
    }, [selectedImage])

    const handleImageChange = (event) => {
        const nextFile = event.target.files?.[0] ?? null
        setSelectedImage(nextFile)
    }

    const handleRemoveImage = () => {
        setSelectedImage(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return(
        <section className={Styles.container}>
            <header className={Styles.header}>
                <input 
                    type="text" 
                    className={Styles.titleInput}
                    placeholder='Title'
                />
                <div className={Styles.headerActions}>
                    <Button
                        size={'sm'}
                        variant={'subtle-negative'}
                        icon={_delete}
                        activeIcon={activeDelete}
                    />
                    <Button
                        variant = 'primary'
                        size = 'md'
                        text = 'Save'
                        icon = {save}
                        activeIcon={activeSave}
                    />
                </div>
            </header>
            <hr className={Styles.divider} />

            <div className={Styles.editorTools}>
                <Button
                    variant='primary'
                    size='lg'
                    text='이미지 첨부'
                    icon={imageIcon}
                    activeIcon={activeImageIcon}
                    className={Styles.imageUploadButton}
                    onClick={() => fileInputRef.current?.click()}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className={Styles.fileInput}
                    onChange={handleImageChange}
                />
                {selectedImage && (
                    <button
                        type="button"
                        className={Styles.removeImageButton}
                        onClick={handleRemoveImage}
                    >
                        첨부 이미지 제거
                    </button>
                )}
            </div>

            {previewUrl && (
                <figure className={Styles.preview}>
                    <img
                        src={previewUrl}
                        alt={selectedImage?.name ?? '첨부 이미지 미리보기'}
                        className={Styles.previewImage}
                    />
                    <figcaption className={Styles.previewCaption}>
                        {selectedImage?.name}
                    </figcaption>
                </figure>
            )}

            <textarea 
                name="content"
                className={Styles.contentTextarea}
                placeholder='Tell your story...'
                value={content}
                onChange={(event) => setContent(event.target.value)}
            />
        </section>
    )
}
