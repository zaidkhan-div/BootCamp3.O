import React from "react";
import {
    FileSpreadsheet,
    CheckCircle,
    Hourglass,
    XCircle,
    Search,
    BellDot,
    ChevronsLeft,
    ShoppingBag,
    RefreshCcw,
    LayoutTemplate,
    UsersRound,
} from "lucide-react";
import Img1 from "../../assets/man.jpeg"

function QuotationHistory() {
    // tables data
    const tableData = [
        {
            id: "Q-125",
            date: "12 Nov 2025",
            amount: "200,000",
            status: "Approved",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-126",
            date: "15 Nov 2025",
            amount: "150,000",
            status: "Pending",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-127",
            date: "20 Nov 2025",
            amount: "300,000",
            status: "Pending",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-128",
            date: "25 Nov 2025",
            amount: "250,000",
            status: "Approved",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-129",
            date: "30 Nov 2025",
            amount: "400,000",
            status: "Pending",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-130",
            date: "05 Dec 2025",
            amount: "350,000",
            status: "Approved",
            action: "View File",
            edit: "Edit File",
        },
        {
            id: "Q-131",
            date: "10 Dec 2025",
            amount: "450,000",
            status: "Pending",
            action: "View File",
            edit: "Edit File",
        },
    ];

    // carts
    const carts = [
        {
            icon: FileSpreadsheet,
            heading: "Total Quotations",
            num: "12",
            desc: "All your quotations",
        },
        {
            icon: CheckCircle,
            heading: "Approved",
            num: "25%",
            desc: "Successfully approved",
        },
        {
            icon: Hourglass,
            heading: "Pending",
            num: "08",
            desc: "Waiting for review",
        },
        {
            icon: XCircle,
            heading: "Rejected",
            num: "02",
            desc: "Declined quotations",
        },
    ];

    return (
        <div className="flex">
            {/* right section */}
            <div className="grow space-y-[21px] pt-[16px] pb-[34px] pr-[44px] pl-[24px]">
                {/* top section */}
                <div className="space-y-[34px]">

                    {/* nav */}
                    <div className="h-[45px] flex justify-between items-center">
                        {/* haeding div */}
                        <div>
                            <h1 className="text-[32px] font-bold">My Quotation History,</h1>
                        </div>
                        {/* right content div */}
                        <div className="space-x-4 flex">
                            {/* search bar */}
                            <div className="h-[36px] w-[360px] py-[10px] px-[13px] bg-[#FBFAFA] rounded-[8px] border border-[#00000014] flex gap-1">
                                <span>
                                    <Search className="h-[16px] w-[16px]" />
                                </span>
                                <input type="text" placeholder="Search..." className="outline-none" />
                            </div>

                            {/* bell icon */}
                            <div className="h-[36px] w-[36px] rounded-[8px] bg-[#FBFAFA] border border-[#00000014] flex justify-center items-center">
                                <BellDot className="h-[15px] w-[15px]" />
                            </div>

                            {/* profile info */}
                            <div className="space-x-[6px] flex">
                                <div className="w-[36px] h-[36px] rounded-[50%] p-[2px] border">
                                    <img
                                        src={Img1}
                                        alt="profile img "
                                        className="w-full h-full rounded-[50%]"
                                    />
                                </div>
                                <div>
                                    <p className="h-5 text-[14px]">Brown Martin</p>
                                    <p className="text-[#00000099] font-[400] text-[10px]">
                                        Owner
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* box section */}
                    <div className="h-[144px]">
                        {/* boxes */}
                        <div className="grid grid-cols-4 gap-5">
                            {/* box */}
                            {carts.map((box) => (
                                <div
                                    key={box.heading}
                                    className="h-[144px] border  border-[#0000003D] rounded-[8px] bg-white px-4 py-[19px] space-y-3"
                                >
                                    {/* box top */}
                                    <div className="flex gap-3">
                                        <div className="w-[32px] h-[32px] rounded-[50%] flex justify-center items-center  bg-[#E9EAEC] ">
                                            <box.icon
                                                className={`w-[16px] h-[16px] ${box.heading === "Approved"
                                                    ? "text-green-500"
                                                    : box.heading === "Total Quotations"
                                                        ? "text-blue-500"
                                                        : "text-red-600"
                                                    } `}
                                            />
                                        </div>
                                        <div className="font-bold text-xl text-[#181D27]">
                                            {box.heading}
                                        </div>
                                    </div>
                                    {/* box bottom */}
                                    <div className="space-y-2">
                                        <div className="h-[38px] font-bold text-[28px] flex items-start">
                                            {box.num}
                                        </div>
                                        <div>
                                            <p className="text-[#535862] font-[400] h-[20px] font-[16px]">
                                                {box.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* table section */}
                <div className="bg-white p-3  space-y-[26px]">
                    {/* top row */}
                    <div className="bg-[#FBFBFB] border-b border-b-[#0000001A]">
                        <ul className="grid grid-cols-6 h-[38px] py-2 px-6">
                            <li>Quotation ID</li>
                            <li>Date</li>
                            <li>Amount</li>
                            <li>Status</li>
                            <li>Action</li>
                            <li>Edit</li>
                        </ul>
                    </div>
                    {/* data rows */}
                    {tableData.map((item) => (
                        <ul
                            key={item.id}
                            className="grid grid-cols-6 h-[38px] px-6 border-b border-b-[#0000001A]"
                        >
                            <li className="flex items-center">{item.id}</li>
                            <li className="flex items-center">{item.date}</li>
                            <li className="flex items-center">{item.amount}</li>
                            <li className="flex items-center ">
                                <div
                                    className={`h-[29px] flex justify-center items-center rounded-[8px] px-2 border  ${item.status === "Approved"
                                        ? "border-[#4CAF503D] bg-[#4CAF501F] text-[#0A7A0F]"
                                        : "bg-[#F443361F] border-[#F443363D] text-[#F44336]"
                                        }`}
                                >
                                    {item.status}
                                </div>
                            </li>
                            <li className="flex items-cente cursor-pointer">{item.action}</li>
                            <li className="flex items-cente cursor-pointer">{item.edit}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuotationHistory;