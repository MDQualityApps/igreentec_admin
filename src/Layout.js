import React, { useState } from 'react'
import { Outlet } from "react-router-dom"
import { Box } from '@mui/material';

//component
import Navbar from './Comps/NavBar'
import SideBar from './Comps/SideBar'
import SnackBar from './Comps/SnackBar';


function Layout({ access, successOpen, successMessage, successStatus, successColor, setsuccessOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    //#F9F9FB
    <Box variant="div">
      <Box sx={{ display: 'flex',minHeight:'100vh', overFlow: 'hidden',backgroundColor:'#e6ffe6', color: '#353935',fontFamily:'poppins' }}>
        <SnackBar open={successOpen} message={successMessage} setOpen={setsuccessOpen} status={successStatus} color={successColor} />
        <Box sx={{  color: '#353935' }}>
          <SideBar access={access} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: '' }}>
          <Box className='sticky-top'>
            <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          </Box>
          <Box >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Layout