import { Col, Form, Input, Modal, Row, message } from 'antd'
import axios from 'axios';
import React, { useRef } from 'react'
import { GiCancel } from "react-icons/gi";

const UserForm = ({ openForm,selectedUserData, setOpenForm }) => {
    const formRef = useRef(null);
    const onFinish = async (values) => {
        console.log(values);

        try {

            let response = {};

            if(selectedUserData){
                response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/edit-user/${selectedUserData._id}`, values);

            } else{

                // Make a request to your backend endpoint
                response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/add-user`, values);
            }

            if (response.success) {
                // Handle successful response
                message.success(response.data.message);
            } else {
                // Handle error response
                message.error(response.data.message);
            }
        } catch (error) {
            // Handle network error or other issues
            message.error(error.message);
        }
    };
    console.log()
    return (
        <>
            <Modal
                // title="Add User"
                open={openForm}
                onCancel={() => setOpenForm(false)}
                // footer={null}
                className="custom-modal"
                width={600}
                okText="Save Details"
                okButtonProps={{
                    style: {
                        background: '#13314f', // Set the desired background color for OK button
                        color: '#fff', // Set the desired text color for OK button
                        border: 'none', // Remove border if needed
                    },
                }}
                cancelButtonProps={{
                    style: {
                        display: "none"
                    }
                }}
                onOk={() => {
                    formRef.current.submit();
                }}
                closeIcon={<GiCancel className='text-white text-3xl' />}
            >
                <div>
                    <h1 className="text-2xl font-semibold">Add/Edit User</h1>
                </div>

                <div className="mt-4">
                    <Form
                        layout="vertical"
                        ref={formRef}
                        onFinish={onFinish}
                        initialValues={selectedUserData}
                    >





                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item name="first_name" >
                                    <Input className="h-[2.5rem] border-none text-white placeholder:text-gray-500 outline-none bg-[#202020]" type="text" placeholder="First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="last_name" >
                                    <Input className="h-[2.5rem] border-none text-white placeholder:text-gray-500 outline-none bg-[#202020]" type="text" placeholder="Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item name="email" >
                            <Input className="h-[2.5rem] border-none text-white placeholder:text-gray-500 outline-none bg-[#202020]" type="text" placeholder="Email" />
                        </Form.Item>

                        <Form.Item name="avatar" >
                            <Input className="h-[2.5rem] border-none text-white placeholder:text-gray-500 outline-none bg-[#202020]" type="text" placeholder="Avatar Link" />
                        </Form.Item>


                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Form.Item name="gender" >
                                    <select className='w-[100%] border text-white placeholder:text-gray-500 outline-none border-none bg-[#202020] p-2 px-2 rounded-md'>
                                        <option className="text-gray-500" value=" ">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Agender">Agender</option>
                                        <option value="Bigender">Bigender</option>
                                        <option value="Polygender">Polygender</option>
                                    </select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="domain" >
                                    <select className='w-[100%] border text-white  outline-none border-none bg-[#202020] p-2 px-2 rounded-md'>
                                        <option className="text-gray-500" value=" ">Select Domain</option>
                                        <option value="Finance">Finance</option>
                                        <option value="IT">IT</option>
                                        <option value="Management">Management</option>
                                        <option value="Bussiness Development">Bussiness Development</option>
                                        <option value="UI Designing">UI Designing</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="available" >
                                    <select className='w-[100%] border text-white placeholder:text-gray-500 outline-none border-none bg-[#202020] p-2 px-2 rounded-md'>
                                        <option className="text-gray-500" value=" ">Select Availability</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </Form.Item>
                            </Col>
                        </Row>


                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default UserForm
