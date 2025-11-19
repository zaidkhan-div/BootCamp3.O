import React from 'react'
import { EyeClosed, Folder, MoveRight, Send } from 'lucide-react'
import Logo from "../../assets/images/logo.png"

const NewInvoice = () => {
    return (
        <section className="px-4 md:px-7 pt-6 md:pt-8 w-full bg-white min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-semibold">New Invoice</h1>

                <div className="flex flex-wrap items-center gap-2 md:gap-4">

                    <button className="bg-[#F9F9F9] text-sm md:text-base rounded-lg px-3 py-2 flex items-center gap-2">
                        <EyeClosed size={16} />
                        Hide Preview
                    </button>

                    <button className="bg-[#1C2730] text-sm md:text-base text-white rounded-lg px-3 py-2 flex items-center gap-2">
                        <Folder size={16} />
                        Save as Draft
                    </button>

                    <button className="bg-[#F9F9F9] text-sm md:text-base rounded-lg px-3 py-2 flex items-center gap-2">
                        <Send size={16} />
                        Send Invoice
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                {/* Left Form Section */}
                <div className="bg-[#C2C2C21F] rounded-lg border-2 border-[#C2C2C21F] px-5 pt-4 pb-8 min-h-[500px]">

                    <div className="flex flex-col justify-between h-full">

                        {/* Tabs */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                {["Customer Details", "Order Sources", "Add Product", "Price Summary"].map((tab, index) => (
                                    <button
                                        key={index}
                                        className="text-xs text-[#007AFF] font-bold px-2 py-[6px] rounded-2xl border-2 border-[#007AFF] bg-white"
                                    >
                                        {tab}
                                    </button>
                                ))}

                                <button className="text-xs text-[#007AFF] font-bold px-2 py-[6px]">
                                    <MoveRight />
                                </button>
                            </div>

                            {/* Form */}
                            <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <label className="text-sm font-medium">Sub Total</label>
                                        <input
                                            type="text"
                                            placeholder="Add Calculator"
                                            className="text-xs text-[#00000099] border-2 border-[#C7C7C7] rounded-lg pl-4 py-3"
                                        />
                                    </div>
                                ))}
                            </form>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <button className="bg-black text-white text-base rounded-lg py-2">
                                Submit
                            </button>
                            <button className="bg-black text-white text-base rounded-lg py-2">
                                Preview
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Invoice Preview */}
                <div className="bg-[#C2C2C21F] flex flex-col rounded-lg border-2 border-[#C2C2C21F] px-5 pt-4 pb-5">

                    {/* Logo and Address */}
                    <div className="flex justify-between items-center">
                        <img src={Logo} alt="Logo" className="w-20 object-contain" />
                        <p className="text-right text-sm font-semibold">
                            19th Street, Mckinney Walker <br />
                            Jaddah <br />
                            +1-0281-856-6521
                        </p>
                    </div>

                    {/* Invoice & Customer Info */}
                    <div className="flex justify-between border-b-2 border-[#008CFF] mt-3 pb-3">
                        <p className="text-sm font-semibold leading-6">
                            Invoice Number : INV-04568 <br />
                            Date Issued : Nov 01, 2025 <br />
                            Due Date : Nov 10, 2025 <br />
                            07526
                        </p>
                        <p className="text-right text-sm font-semibold leading-6">
                            Thomas Shelby <br />
                            thomasshelby@gmail.com <br />
                            Houston, Texas <br />
                            77002
                        </p>
                    </div>

                    <p className="text-sm font-semibold leading-6 mt-3">
                        Project Description:
                        <br />
                        <span className="font-normal">
                            Add a brief and concise description of the project, item, or service here.
                        </span>
                    </p>

                    {/* Product Table */}
                    <div className="flex flex-col gap-5 mt-3 flex-grow">
                        <p className="font-semibold text-sm">Product Details :</p>

                        {/* Header */}
                        <div className="grid grid-cols-6 gap-2 md:gap-[30px] text-center">
                            {["S.no", "Product Name", "Quantity", "Unit Price", "Discount %", "Tax %"].map((h, i) => (
                                <span
                                    key={i}
                                    className="bg-[#DCEEFF] text-sm rounded-2xl border-2 border-[#007AFF] text-[#007AFF] px-2 py-1"
                                >
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* Data Rows */}
                        <div className="grid grid-cols-6 gap-2 md:gap-[30px] text-center">
                            {[
                                ["01", "02", "03", "04", "05"],
                                ["Gas torch", "Scrapers", "Sealant guns", "Heat gun", "Mixing paddles"],
                                ["60pcs", "45pcs", "30pcs", "80pcs", "15pcs"],
                                ["40.00$", "25.00$", "50.00$", "60.00$", "15.00$"],
                                ["6%", "2%", "3%", "4%", "5%"],
                                ["2%", "1%", "3%", "2%", "4%"]
                            ].map((col, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    {col.map((item, j) => (
                                        <span key={j} className="text-xs font-light">{item}</span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terms */}
                    <div className="border-t-2 border-[#008CFF] pt-2 mt-4">
                        <p className="text-sm font-semibold">Terms & Conditions :</p>
                        <p className="text-sm font-normal">
                            Above information is not an invoice and only an estimate for goods/services.
                            Payment will be due prior to provision or delivery of goods/services.
                        </p>
                        <p className="text-sm font-semibold mt-1">
                            Please Confirm Your Acceptance Of This Quote
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default NewInvoice
