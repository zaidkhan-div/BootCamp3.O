import { useState, useRef, useEffect } from "react";
import Img1 from "../../../assets/images/profileImg.png";
import Img2 from "../../../assets/images/profileImg.png";
import Img3 from "../../../assets/images/profileImg.png";
import Img4 from "../../../assets/images/profileImg.png";
import Img5 from "../../../assets/images/profileImg.png";
import Img6 from "../../../assets/images/profileImg.png";
import Img7 from "../../../assets/images/profileImg.png";

import { MoreVertical } from "lucide-react";
import ProfileSidebar from "../../../components/common/ProfileSidebar";

const Notification = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const wrapperRef = useRef(null);

  const notifications = [
    { img: Img1, name: "Smith jones", text: "fill up the quotation foam", time: "12:22" },
    { img: Img2, name: "David robins", text: "fill up th quotation foam", time: "12:22" },
    { img: Img3, name: "Ethan jones", text: "fill up the quotation foam", time: "12:22" },
    { img: Img4, name: "Williams roy", text: "fill up the quotation foam", time: "12:22" },
    { img: Img5, name: "Donald trump", text: "fill up the quotation foam", time: "12:22" },
    { img: Img6, name: "Kevin roy", text: "fill up the quotation foam", time: "12:22" },
    { img: Img7, name: "Sam jones", text: "fill up the quotation foam", time: "12:22" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (

<div className="flex">
  <ProfileSidebar />
    <div className="w-full max-w-[1092px] h-auto my-[32px] mx-auto relative px-4">
      <div className="flex flex-col">
        
        <h1 className="text-center text-[25px] font-[700] mb-[8px]">
          Notifications
        </h1>

        <p className="text-gray-600 font-medium text-[16px] mb-[18px]">
          You have <span className="text-blue-600 font-medium">2 notifications</span> today.
        </p>

        <div className="flex flex-col gap-[38px] relative">
          {notifications.map((item, index) => (
            <div
              key={index}
              ref={wrapperRef}
              className="flex items-center justify-between w-full relative 
                         max-sm:flex-col max-sm:items-start max-sm:gap-2"
            >

              <div className="flex items-center gap-[12px]">
                <img
                  src={item.img}
                  className="w-[57px] h-[57px] rounded-full object-cover"
                />
                <div>
                  <p className="text-[18px] font-medium">
                    {item.name}
                    <span className="text-gray-600 font-normal">, {item.text}</span>
                  </p>
                  <p className="text-gray-500 text-[18px]">{item.time}</p>
                </div>
              </div>

              <div className="max-sm:mt-2">
                {openMenu === index ? (
                  <button
                    onClick={() => setOpenMenu(null)}
                    className="absolute right-0 top-6 bg-white shadow-lg border border-grey rounded-md px-[26px] py-[6px] font-[700] text-[16px] cursor-pointer hover:bg-gray-100 transition"
                  >
                    Delete
                  </button>
                ) : (
                  <div
                    onClick={() => setOpenMenu(index)}
                    className="cursor-pointer"
                  >
                    <MoreVertical className="text-gray-600" />
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
</div>

  );
};

export default Notification;