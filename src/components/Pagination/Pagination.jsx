import React, { useEffect } from 'react';

const Pagination = ({ totalPages, setCurrentPage , currentPage }) => {
  let pages = [];
  // let totalPosts = 100;
  let postPerPage = 20;

  console.log("total pages : ", totalPages);
  console.log("post per pages : ", postPerPage);



  for (let i = 1; i <= Math.ceil(totalPages / postPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    console.log(pages);
    // console.log(totalPosts);
  }, []);

  return (
    <>
      <div className='text-center flex flex-wrap gap-4'>
        {pages.map((page, index) => {
          return (
            <button
              className={`border ${currentPage === index + 1 ? "bg-[#fff] text-black" :""} w-[4rem] h-[3rem] rounded-lg`}
              onClick={() => setCurrentPage(page)}
              key={index}
            >
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
