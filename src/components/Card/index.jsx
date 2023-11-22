import React, { useEffect } from 'react'
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import axios from 'axios';
import { message } from 'antd';
import { useTeamContext } from '../../context/TeamContext';

const Card = ({ onEdit, item }) => {
    const { teams } = useTeamContext();

    useEffect(() => {
        console.log("Teams:", teams);
    }, [teams]);

    const { addTeam } = useTeamContext();

    const addToTeam = async () => {
        try {

            // Check if the user is already in the team
            const isUserInTeam = teams.some((teamMember) => teamMember.id === item._id);

            if (!isUserInTeam) {
                // Check if a user with the same domain and availability is already in the team
                const isUserWithSameDomainAndAvailabilityInTeam = teams.some(
                    (teamMember) =>
                        teamMember.domain === item.domain && teamMember.availability === item.available
                );

                console.log('Is User with Same Domain and Availability in Team:', isUserWithSameDomainAndAvailabilityInTeam);


                if (!isUserWithSameDomainAndAvailabilityInTeam) {
                    // User is not in the team and doesn't have the same domain and availability, proceed to add to the team
                    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/team`, {
                        userId: item._id,
                        teamName: 'teamAlpha', // Set the team name or structure as needed
                        domain: item.domain,
                        availability: item.available,
                    });




                    if (response.data.success) {
                        // Handle successful response
                        // Update the team context with the new team information
                        const teamId = response.data.data._id; // Assuming the API returns the created team's ID

                        // Check if the team already exists in the context
                        const existingTeam = teams.find((team) => team.id === teamId);

                        if (existingTeam) {
                            // Team already exists, add the member to the existing team
                            const teamMember = {
                                id: item._id,
                                firstName: item.first_name,
                                lastName: item.last_name,
                                email: item.email,
                            };

                            // Update the team context with the new member
                            addTeam(teamId, teamMember);
                        } else {
                            // Team doesn't exist, create a new team
                            const teamMember = {
                                id: item._id,
                                firstName: item.first_name,
                                lastName: item.last_name,
                                email: item.email,

                            };

                            const newTeam = {
                                id: teamId,
                                teamName: 'teamAlpha', // Set the team name or structure as needed
                                members: [teamMember],
                            };

                            // Update the team context with the new team
                            addTeam(newTeam);
                        }

                        message.success(response.data.message);
                    } else {
                        // Handle error response
                        message.error(response.data.message);
                    }
                } else {
                    // Display a message indicating that users with the same domain and availability cannot be added to the team
                    message.warning('User with the same domain and availability is already in the team.');
                }
            } else {
                // Display a message indicating that the user is already in the team
                message.warning('User is already in the team.');
            }
        } catch (error) {
            // Handle network error or other issues
            message.error(error.message);
        }
    };


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
                        <p><RiDeleteBin7Line onClick={() => deleteData(item._id)} className='text-xl cursor-pointer hover:text-red-500' /></p>
                    </div>
                </div>

                <div className='flex items-center justify-around h-fit rounded-b-xl bg-[#13314f]  py-8 px-4'>
                    <div className="capitalize text-xs text-center w-[4rem]">{item?.available === "true" ? "Avlb" : "Not Avlb"}</div>
                    {/* team add button */}
                    <div><MdGroupAdd onClick={addToTeam} className='text-lg border w-16 rounded-full cursor-pointer hover:bg-[#366595] h-8 p-1' /></div>
                    <div className="flex flex-wrap text-xs flex-col text-center overflow-hidden break-words w-[4rem]">{item.domain}</div>
                </div>
            </div>
        </>
    )
}

export default Card
