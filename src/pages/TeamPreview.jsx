import { Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi';


const TeamPreview = ({id, openteam, setOpenTeam }) => {
    const [teamData , setTeamData] = useState([])
    const getTeamById = async (teamId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/team/${teamId}`);

            if (response.data.success) {
                const myteamData = response.data.data;
                setTeamData(myteamData)
                console.log('Team Data:', myteamData);
                // Handle displaying team data in your UI
            } else {
                console.error('Error getting team:', response.data.message);
            }
        } catch (error) {
            console.error('Error getting team:', error.message);
        }
    };

    useEffect(()=>{
        getTeamById('655dca79ee46f88e6667ff4b');
    },[])
    return (
        <>

            <Modal
                // title="Add User"
                open={true}
                onCancel={() => setOpenTeam(false)}
                footer={null}
                className="custom-modal"
                width={1000}

                closeIcon={<GiCancel className='text-white text-3xl' />}
            >
                <div>
                    <h1 className='text-2xl'>Team : {teamData?.teamName}</h1>
                </div>

                <div className='my-4 text-lg'>Members</div>

                <div>
                    {teamData?.members?.map((item,index)=>{
                        return(
                            <>
                                <div className='flex items-center gap-3'>
                                    <div>{index+1}</div>
                                    <div>{item.first_name}</div>
                                    {/* <div>{ite   m?.domain}</div> */}
                                    <div>{item.available === 'true' ? "Available" :"Not Avalable"}</div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </Modal>

        </>
    )
}

export default TeamPreview
