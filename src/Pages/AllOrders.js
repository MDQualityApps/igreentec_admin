import React from 'react'
import { Box } from '@mui/material';
import useFetch from './../Api/useFetch';
import { getorderdetails, methodGet } from '../Api/Api';
import AllOrderTable from '../Orders/AllOrderTable';
import Statusloader from '../Comps/Statusloader';
import Nodata from '../Nodata/Nodata';


function AllOrders() {
    const {data, isloading, emptydata} = useFetch(getorderdetails, methodGet);
 
    if (!isloading) {
        return (
            <Statusloader />
        )
    } else {
        return (
            <Box variant="div" sx={{ p: 3 }}>
         
                {emptydata && data.length === 0 ? <Nodata /> : 
                <Box>
                 
                    <Box sx={{ py: 3 }}>
                        <AllOrderTable data={data} subpage={`orderlist`} />
                    </Box>
                </Box>
                }
           
            </Box>)
    }

}

export default AllOrders