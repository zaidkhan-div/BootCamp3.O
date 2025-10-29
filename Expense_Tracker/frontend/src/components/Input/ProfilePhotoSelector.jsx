import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setProfilePic }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(file);

            // Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemove = () => {
        setProfilePic(null);
        setPreviewUrl(null);
    }

    const chooseFile = () => {
        inputRef.current.click();
    }

    return (
        <div className='flex justify-center mb-6'>
            <input type='file' accept='image/*' ref={inputRef} onChange={handleImageChange}
                className='hidden' />
            {
                !image ? (
                    <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                        <LuUser className='text-4xl text-primary' />
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                            onClick={chooseFile}>
                            <LuUpload />
                        </button>
                    </div>
                ) : (
                    <div className='relative'>
                        <img src={previewUrl}
                            alt="Profile Pic"
                            className='w-20 h-20 rounded-full object-cover' />
                        <button
                            type='button'
                            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                            onClick={handleRemove}>
                            <LuTrash />
                        </button>
                    </div>
                )
            }
            
        </div>
    )
}

export default ProfilePhotoSelector
