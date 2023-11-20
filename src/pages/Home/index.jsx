import React, { useEffect, useState } from 'react'
import { TiFilter } from "react-icons/ti";
import "../../index.css"
import Card from '../../components/Card';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';

const Home = ({handleEdit}) => {
    const [toggle, setToggle] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        domain: '',
        gender: '',
        availability: '',
      });
    
      const fetchData = async (page, limit , search) => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/get-users?page=${page}&limit=${limit}&search=${search}`, { params: filters });
          const data = response.data;
    
          setUserData(data.items);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
          ...prevFilters,
          [filterName]: value,
        }));
      };
    
      useEffect(() => {
        fetchData(currentPage, 20 ,searchQuery); // Assuming a default limit of 20 items per page
      }, [currentPage, searchQuery ,filters]);
    return (

        <>
            {/*  */}
            <div className=''>
                <main className='grid h-fit font-semibold gap-4  p-1 grid-cols-5'>
                    {<div className={`lg:col-span-1 lg:block ${toggle ? `block absolute w-[250px] top-[12rem]` : `hidden`} rounded-xl   h-fit  lg:sticky top-8  text`}>

                        <div className='mont font-semibold text-2xl p-4 bg-[#202020] rounded-xl'>Filters</div>
                        <div className='mt-4 p-4 flex items-start justify-center gap-8 flex-col bg-[#202020] rounded-xl'>
                            {/* mapping of filters */}
                            <div className='w-full'>
                                <h1>Domains</h1>
                                <select onChange={(e) => handleFilterChange('domain', e.target.value)} value={filters.domain} className='p-1 w-full py-2 mt-2 rounded-lg' name="domain" id="">
                                    <option value="select">select</option>
                                    <option value="Finance">Finance</option>
                                    <option value="IT">IT</option>
                                    <option value="Management">Management</option>
                                    <option value="Bussiness Development">Bussiness Development</option>
                                    <option value="UI Designing">UI Designing</option>
                                    <option value="Sales">Sales</option>
                                </select>
                            </div>


                            <div className='w-full'>
                                <h1>Gender</h1>
                                <select onChange={(e) => handleFilterChange('gender', e.target.value)} className='p-1 w-full py-2 mt-2 rounded-lg' name="gender" id="">
                                    <option value="select">select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Agender">Agender</option>
                                    <option value="Bigender">Bigender</option>
                                    <option value="Polygender">Polygender</option>
                                </select>
                            </div>
                            <div className='w-full '>
                                <h1>Availability</h1>
                                <select onChange={(e) => handleFilterChange('availability', e.target.value)} className='p-1 w-full py-2 mt-2 rounded-lg' name="availability" id="">
                                    <option value="select">select</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                    </div>}


                    <div className={`col-span-5 lg:col-span-4  flex flex-col `}>
                        <div className='flex items-center  h-fit gap-4 p-4 '>

                            <div className='block lg:hidden'><TiFilter onClick={() => setToggle(!toggle)} className=' text-3xl' /></div>
                            <div className=' w-full h-full'>
                                <input type="text" onChange={(e) => setSearchQuery(e.target.value)} className='bg-[#121212] border border-gray-500 rounded-full w-full h-full p-3 px-5 text-white outline-none' placeholder='Search' />
                            </div>
                        </div>

                        {/* main content */}
                        <div className='bg-[#121212] grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 h-fit'>
                            {/* card creation */}
                            {
                                userData.map((item, index) => {
                                    return (
                                        <>
                                            <Card onEdit={handleEdit} item={item} />
                                        </>
                                    )
                                })
                            }
                        </div>


                        <div className=' m-4
                        '><Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /></div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home
