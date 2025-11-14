import React from 'react'
import { CarTaxiFront, Pen, Share2, ShoppingBag, Trash, User, Users } from "lucide-react"

const Dashbaord = () => {
    return (
        <section className='flex flex-col gap-6 p-8'> {/* main div */}
            <h1 className='font-bold text-[32px]'>Welcome Martin Brown, 👋</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-2'>
                <div className='flex flex-col gap-3 px-4 py-5 border-1 border-[#0000003D] rounded-[6px]'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#E9EAEC] rounded-full p-[10px]'>
                            <ShoppingBag size={20} className='text-gray-500' />
                        </div>
                        <h2 className='font-bold text-lg'>Total Quotation</h2>
                    </div>
                    <p className='text-[28px] font-bold'>28</p>
                    <div className='flex flex-row items-center justify-start gap-2'>
                        <p className='text-green-500 bg-green-100 text-xs p-1 gap-2'>+12%</p>
                        <p className='text-sm text-[#535862] font-normal'>vs Last week</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3 px-4 py-5 border-1 border-[#0000003D] rounded-[6px]'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#17B26A0D] rounded-full p-[10px]'>
                            <ShoppingBag size={20} className="text-green-400" />
                        </div>
                        <h2 className='font-bold text-lg'>Pending Quotation</h2>
                    </div>
                    <p className='text-[28px] font-bold'>28</p>
                    <div className='flex flex-row items-center justify-start gap-2'>
                        <p className='text-green-500 bg-green-100 text-xs p-1 gap-2'>+12%</p>
                        <p className='text-sm text-[#535862] font-normal'>vs Last week</p>
                    </div>
                </div>
                <div className='flex flex-col gap-3 px-4 py-5 border-1 border-[#0000003D] rounded-[6px]'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-[#E9EAEC] rounded-full p-[10px]'>
                            <Users size={20} className='text-blue-400' />
                        </div>
                        <h2 className='font-bold text-lg'>New Clients</h2>
                    </div>
                    <p className='text-[28px] font-bold'>28</p>
                    <div className='flex flex-row items-center justify-start gap-2'>
                        <p className='text-green-500 bg-green-100 text-xs p-1 gap-2'>+12%</p>
                        <p className='text-sm text-[#535862] font-normal'>vs Last week</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-3'>  
                <h2 className='font-semibold text-xl'>Recent Quotation</h2>
 
                <div className='flex flex-col rounded-lg rounded-tr-lg border-2  border-gray-500/15 gap-5'>
                    <div className='bg-[#F4F4F4] grid grid-cols-7 py-2.5 px-5'>
                        <span className="font-semibold text-xl text-black">#</span>
                        <span className="font-semibold text-xl text-black">Clients Name</span>
                        <span className="font-semibold text-xl text-black">Date</span>
                        <span className="font-semibold text-xl text-black">Total Amount</span>
                        <span className="font-semibold text-xl text-black">Status</span>
                        <span className="font-semibold text-xl text-black">Action</span>
                        <span className="font-semibold text-xl text-[#00000099]">View all</span>
                    </div>
                    {/* here we will map the data */}
                    <div className='grid grid-cols-7 border-b border-[#00000014] pb-2 px-5'>
                        <span className="font-semibold text-xl text-black">1</span>
                        <span className="font-semibold text-xl text-black">Smith Jones </span>
                        <span className="font-semibold text-xl text-[#00000099]">Jan.02.2025</span>
                        <span className="font-semibold text-xl text-[#00000099]">$230</span>
                        <span className="font-semibold text-sm py-1 px-4 rounded-full bg-green-100 justify-self-start text-green-500 ">Sent</span>
                        <span className="font-semibold text-xl text-black flex flex-row items-center gap-3">
                            <Pen size={20} className="text-green-500 cursor-pointer" />
                            <Trash size={20} className="text-red-500 cursor-pointer" />
                            <Share2 size={20} className="text-blue-500 cursor-pointer" />
                        </span >
                    </div>
                    <div className='grid grid-cols-7 border-b border-[#00000014] pb-2 px-5'>
                        <span className="font-semibold text-xl text-black">1</span>
                        <span className="font-semibold text-xl text-black">Smith Jones </span>
                        <span className="font-semibold text-xl text-[#00000099]">Jan.02.2025</span>
                        <span className="font-semibold text-xl text-[#00000099]">$230</span>
                        <span className="font-semibold text-sm py-1 px-4 rounded-full bg-green-100 justify-self-start text-green-500 ">Sent</span>
                        <span className="font-semibold text-xl text-black flex flex-row items-center gap-3">
                            <Pen size={20} className="text-green-500 cursor-pointer" />
                            <Trash size={20} className="text-red-500 cursor-pointer" />
                            <Share2 size={20} className="text-blue-500 cursor-pointer" />
                        </span >
                    </div>
                    <div className='grid grid-cols-7 border-b border-[#00000014] pb-2 px-5'>
                        <span className="font-semibold text-xl text-black">1</span>
                        <span className="font-semibold text-xl text-black">Smith Jones </span>
                        <span className="font-semibold text-xl text-[#00000099]">Jan.02.2025</span>
                        <span className="font-semibold text-xl text-[#00000099]">$230</span>
                        <span className="font-semibold text-sm py-1 px-4 rounded-full bg-green-100 justify-self-start text-green-500 ">Sent</span>
                        <span className="font-semibold text-xl text-black flex flex-row items-center gap-3">
                            <Pen size={20} className="text-green-500 cursor-pointer" />
                            <Trash size={20} className="text-red-500 cursor-pointer" />
                            <Share2 size={20} className="text-blue-500 cursor-pointer" />
                        </span >
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashbaord
