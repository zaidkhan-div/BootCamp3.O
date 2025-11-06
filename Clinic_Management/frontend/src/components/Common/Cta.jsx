import { Stethoscope, Syringe, Heart, Microscope } from 'lucide-react'
import React from 'react'

const Cta = () => {

    return (
        <div className='w-full py-6 bg-blue-600 flex flex-wrap items-center justify-around px-10 gap-6'>
            <div className='flex items-center gap-4'>
                <Stethoscope color='white' size={25} />
                <p className='text-base md:text-xl font-semibold text-white'>General Physician</p>
            </div>
            <div className='flex items-center gap-4'>
                <Syringe color='white' size={25} />
                <p className='text-base md:text-xl font-semibold text-white'>Vaccination Services</p>
            </div>
            <div className='flex items-center gap-4'>
                <Heart color='white' size={25} />
                <p className='text-base md:text-xl font-semibold text-white'>Cardiology Care</p>
            </div>
            <div className='flex items-center gap-4'>
                <Microscope color='white' size={25} />
                <p className='text-base md:text-xl font-semibold text-white'>Lab & Diagnostics</p>
            </div>
        </div>
    )
}

export default Cta