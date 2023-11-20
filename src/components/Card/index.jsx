import React from 'react'
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import axios from 'axios';
import { message } from 'antd';

const Card = ({ onEdit, item }) => {
    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/users/delete-user/${id}`);
            if (response.data.success) {
                // Handle successful response
                message.success(response.data.message);
                // window.reload()
            } else {
                // Handle error response
                message.error(response.data.message);
            }
        } catch (error) {
            // Handle network error or other issues
            message.error(error.message);
        }
    }
    return (
        <>
            <div className='bg-[#2e2e2e] max-w-full  h-fit  rounded-2xl'>
                <div className='flex flex-col items-center gap-4 mx-16  py-16 '>
                    <div className='flex flex-col  w-full items-center justify-between gap-4'>

                        <div className='bg-white rounded-full w-[100px] h-[100px]'>
                            <img className=' rounded-full w-full h-full  object-cover' src={item.avatar} alt="" />

                        </div>

                        <div className='kdam font-semibold text-center text-3xl'>
                            <p>{item.first_name}</p>
                            <p>{item.last_name}</p>
                        </div>

                        {/* <div className='kdam ml-6 flex flex-col text-sm'>
                                            <p>Edit</p>
                                            <p>Delete</p>
                                        </div> */}

                    </div>


                    <div className='text-sm'>{item.gender}</div>
                    <div className='py-1 px-3 text-sm text-center border rounded-full '>{item.email}</div>
                    <div className='kdam flex gap-4  w-full items-center justify-center text-md'>
                        <p><TiEdit onClick={() => onEdit(item)} className='text-xl cursor-pointer' /></p>
                        <p><RiDeleteBin7Line onClick={()=>deleteData(item._id)} className='text-xl cursor-pointer hover:text-red-500' /></p>
                    </div>
                </div>

                <div className='flex items-center justify-around h-fit rounded-b-xl bg-[#13314f]  py-8 px-4'>
                    <div className="capitalize text-xs text-center w-[4rem]">{item?.available === "true" ? "Avlb" : "Not Avlb"}</div>
                    <div><MdGroupAdd className='text-lg border w-16 rounded-full cursor-pointer hover:bg-[#366595] h-8 p-1' /></div>
                    <div className="flex flex-wrap text-xs flex-col text-center overflow-hidden break-words w-[4rem]">{item.domain}</div>
                </div>
            </div>
        </>
    )
}

export default Card
