import React from 'react'
import { Box, Menu, IconButton, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from 'react';

function Filter({ label, setSearch }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <IconButton className='text-white' onClick={handleClick} aria-label="delete">
                {open ? <FilterAltIcon fontSize="small" /> : <FilterAltOffIcon fontSize="small" />}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ p: 2 }}>
                    <TextField
                        autoFocus
                        label={label}
                        variant="standard"
                        onChange={event => setSearch(event.target.value)} />
                </Box>
            </Menu>
        </Box>
    )
}

export default Filter