import React, { useState } from "react";
import Image from "next/image";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ModalMain from "../ModalMain";
import User1 from "../../../../public/images/hero1.jpg"
import User4 from "../../../../public/images/hero4.jpg"
const ChatDetail = ({ }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div
            className='fixed inset-0 p-10 bg-indigo-800'
            id='main'
            style={{
                width: '350px',
                height: '410px',
                marginTop: '50px',
                marginLeft: '180px',
                borderRadius: '25px',
            }}
        >

            <div>
                <button
                    onClick={() => showModal ? setShowModal(false) : setShowModal(true)}
                >
                    <ArrowBackIosIcon className="h-6 w-6" ></ArrowBackIosIcon>

                    <span className="ml-2 text-sm font-medium">Back</span>
                </button>
                {/* Phần chat */}
                <div className="p-4 text-black rounded-lg">
                    <div className="flex justify-start mb-3">
                        <div className="flex items-center group relative">
                            <Image src={User1} className='w-10 h-10 rounded-full mr-5' />
                            <div className="bg-gray-200 p-2 rounded-lg">Xin chào!</div>
                            <div className="hidden group-hover:block absolute -top-10 -left-17 text-black bg-white rounded-[0.5rem] p-1">
                                Phan Hoàng Kha
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mb-3">
                        <div className="flex items-center group relative">
                            <div className="bg-blue-500 p-2 rounded-lg text-white">Chào Kha!</div>
                            <Image src={User4} className='w-10 h-10 rounded-full ml-5' />
                            <div className="hidden group-hover:block absolute -top-10 -right-0 text-black bg-white rounded-[0.5rem] p-1">
                                Hồ Thành Vinh
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start mb-3">
                        <div className="flex items-center group relative">
                            <Image src={User1} className='w-10 h-10 rounded-full mr-5' />
                            <div className="bg-gray-200 p-2 rounded-lg">Kéo api xong chưa?</div>
                            <div className="hidden group-hover:block absolute -top-10 -left-17 text-black bg-white rounded-[0.5rem] p-1">
                                Phan Hoàng Kha
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mb-3">
                        <div className="flex items-center group relative">
                            <div className="bg-blue-500 p-2 rounded-lg text-white">Đang kéo api lòi l nè Kha!</div>
                            <Image src={User4} className='w-10 h-10 rounded-full ml-5' />
                            <div className="hidden group-hover:block absolute -top-10 -right-0 text-black bg-white rounded-[0.5rem] p-1">
                                Hồ Thành Vinh
                            </div>
                        </div>
                    </div>
                    {/* Thêm tin nhắn và avatar khác theo định dạng tương tự */}
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-300">
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-black"
                            placeholder="Aa"
                        />
                        <SendIcon className="ml-2 h-6 w-6" />
                    </div>
                </div>
            </div>
            {showModal && <ModalMain setShowModal={setShowModal} />}
        </div>

    );

}

export default ChatDetail
