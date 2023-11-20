    import React, { useState } from 'react'
    import { IoPersonAddSharp } from "react-icons/io5";
    import { MdGroupAdd } from "react-icons/md";
    import { MdOutlineSegment } from "react-icons/md";
    import UserForm from '../../pages/UserForm/UserForm';
    import { Modal } from 'antd';

    const Header = ({openForm ,setOpenForm , selectedUserData}) => {
        const [toggle, setToggle] = useState(false);
        // const [openForm, setOpenForm] = useState(false);

        return (
            <>
                <header className='mb-6 '>
                    <nav className='border-4 rounded-full border-[#282828] flex items-center justify-between p-2'>
                        <div className='font-bold text-xl'>Team Forge</div>
                        {
                            toggle && <div className='flex flex-col absolute sm:right-10 right-20 bg-[#293548] p-4 rounded-xl top-[6rem] items-center gap-4'>

                                <div onClick={()=>{setOpenForm(true); setToggle(false)}} className='font-semibold cursor-pointer flex items-center gap-3 px-4 py-2 rounded-full bg-[#1e293b] justify-center'>
                                    <div><IoPersonAddSharp className='text-lg' /></div>
                                    <p>Add User</p>
                                </div>
                                <div className='font-semibold cursor-pointer flex items-center gap-3 px-4 py-2 rounded-full bg-[#1e293b] justify-center'>
                                    <div><MdGroupAdd className='text-lg' /></div>
                                    <p>Add Team</p>
                                </div>
                            </div>
                        }

                        <div><MdOutlineSegment onClick={() => setToggle(!toggle)} className='cursor-pointer text-2xl mr-4 ' /></div>
                    </nav>

                    {openForm && (
                        <UserForm openForm={openForm} selectedUserData={selectedUserData} setOpenForm={setOpenForm}/>
                    )}

                </header>
            </>
        )
    }

    export default Header
