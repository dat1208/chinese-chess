import React, { useState } from "react";
import Image from "next/image";
import ChatIcon from '@mui/icons-material/Message';
import ChatDetail from "./Chat/ChatDetail";
import User1 from "../../../public/images/hero1.jpg"
import User2 from "../../../public/images/hero2.jpg"
import User3 from "../../../public/images/hero3.jpg"
import User5 from "../../../public/images/hero5.jpg"
const ModalMain = ({ setShowModal }) => {
    const handleClose = (e) => {
        if (e.target.id === 'main') setShowModal(false)
    }
    const [showMess, setShowMess] = useState(false)
    return (
        <div
            className='fixed inset-0 p-10 bg-indigo-800'
            id='main'
            onClick={handleClose}
            style={{
                width: '350px',
                height: '410px',
                marginTop: '50px',
                marginLeft: '180px',
                borderRadius: '25px',
            }}
        >

            <div>
                {showMess && <ChatDetail setShowMess={setShowMess} />}
                <ChatIcon></ChatIcon>
                <span className="ml-2 text-xl font-medium pb-15">Chat</span>
                <ul className='list-disc space-y-6'>
                    <li onClick={() => showMess ? setShowMess(false) : setShowMess(true)} className='flex items-center space-x-2 text-left p-1 hover:rounded-md hover:bg-indigo-600 '>
                        <Image src={User1} className='w-10 h-10 rounded-full mr-5' />
                        <div>
                            <p className='text-gray-100'><strong>Phan Hoàng Kha</strong></p>
                            <p className='text-gray-100'>Đang kéo deadline lòi l ....</p>

                        </div>

                    </li>
                    <li onClick={() => showMess ? setShowMess(false) : setShowMess(true)} className='flex items-center space-x-2 text-left p-1 hover:rounded-md hover:bg-indigo-600'>
                        <Image src={User2} className='w-10 h-10 rounded-full mr-5' />
                        <div>
                            <p className='text-gray-100'><strong>Thành Đạt</strong></p>
                            <p className='text-gray-100'>Đang kéo deadline lòi l ....</p>
                        </div>
                    </li>
                    <li onClick={() => showMess ? setShowMess(false) : setShowMess(true)} className='flex items-center space-x-2 text-left p-1 hover:rounded-md hover:bg-indigo-600'>
                        <Image src={User3} className='w-10 h-10 rounded-full mr-5' />
                        <div>
                            <p className='text-gray-100'><strong>Nguyên Trung</strong></p>
                            <p className='text-gray-100'>Đang đi Nha trang vói bồ ...</p>
                        </div>
                    </li>
                    <li onClick={() => showMess ? setShowMess(false) : setShowMess(true)} className='flex items-center space-x-2 text-left p-1 hover:rounded-md hover:bg-indigo-600'>
                        <Image src={User5} className='w-10 h-10 rounded-full mr-5' />
                        <div>
                            <p className='text-gray-100'><strong>Thanh Thuận</strong></p>
                            <p className='text-gray-100'>Mới chia tay bùn quá đi  ...</p>
                        </div>
                    </li>
                </ul>
            </div>




        </div>
    );
}

export default ModalMain
