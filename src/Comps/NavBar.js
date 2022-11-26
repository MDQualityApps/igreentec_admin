import { AppBar, Box, IconButton, InputAdornment, TextField, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import ResponsiveBd from './ResponsiveBd';
import FindInPageIcon from '@mui/icons-material/FindInPage'; 


function NavBar({ mobileOpen, setMobileOpen }) {
 const responsive = ResponsiveBd()
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    //#e6ffe6
    <Box sx={{ width: '100%' }}>
      <AppBar position="sticky" sx={{ py: 1, width: '100%', bgcolor: '#F9F9FB',color:'black' }}>
        <Toolbar>
          <IconButton aria-label="menu"
            sx={{
              display: responsive ? 'block': 'none'
            }} 
            onClick={handleDrawerToggle} >
            <MenuIcon />
          </IconButton>
          <TextField
          size='small'
        id="outlined-search"
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FindInPageIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
          {/* <Typography sx={{ px: 2,textTransform: 'uppercase', color:'#4B4B4B' }} variant="h6">
            igreen Technologies
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar