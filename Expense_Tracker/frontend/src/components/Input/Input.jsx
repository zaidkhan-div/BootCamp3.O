import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword)

    return (
        <div className='mb-4'>
            <label className='block text-[13px] text-slate-800 mb-1'>{label}</label>

            {/* ✅ Make container relative so icon can sit inside */}
            <div className='relative flex items-center'>
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    className='w-full bg-transparent outline-none py-2 pr-10 input-box' // ✅ added pr-10
                    value={value}
                    onChange={onChange}
                />

                {/* ✅ position eye icon absolutely inside input */}
                {type === 'password' && (
                    <span
                        className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer'
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <FaRegEye size={22} className='text-primary' />
                        ) : (
                            <FaRegEyeSlash size={22} className='text-slate-400' />
                        )}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input
