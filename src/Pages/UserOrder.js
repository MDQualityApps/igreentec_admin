import React from 'react'
import { Box } from '@mui/material';
import useFetch from './../Api/useFetch';
import { getassignedorders, methodPost } from '../Api/Api';
import Statusloader from '../Comps/Statusloader';
import UserOrderTable from '../Factoryemp/UserOrderTable';
import Nodata from '../Nodata/Nodata';


const access = JSON.parse(localStorage.getItem('access'));
const { username } = access;


function UserOrder() {

const user_name = new FormData();
    user_name.append("EmployeeName", username);
    console.log(user_name);
    const {data, isloading, emptydata} = useFetch(getassignedorders, methodPost, user_name);
 
    if (!isloading) {
        return ( 
            <Statusloader/>
        )
    } else {
        return (
            <Box variant="div" sx={{ p: 3 }}>
         
                {data.length === 0 ? <Nodata /> : 
                <Box>
                 
                    <Box sx={{ py: 3 }}>
                        <UserOrderTable data={data} subpage={`userlogin`} />
                    </Box>
                </Box>
                }
           
            </Box>)
    }

}

export default UserOrder