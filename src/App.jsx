import React, { useState } from "react"
import Home from "./pages/Home"
import Header from "./components/Header"

function App() {

  const [selectedUserData, setSelectedUserData] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleEdit = (userData) => {
    setSelectedUserData(userData);
    setOpenForm(true);
  };

  return (
    <>
      <div className='max-w-[1290px] mx-auto h-fit my-[2rem] px-4'>
        <Header
          openForm={openForm}
          setOpenForm={setOpenForm}
          selectedUserData={selectedUserData}
        />
        <Home handleEdit={handleEdit} />
      </div>
    </>
  )
}

export default App
