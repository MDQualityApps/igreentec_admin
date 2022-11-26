import React from 'react'
import { Box } from '@mui/material';
import useFetch from './../Api/useFetch';
import { getproductdetails, methodGet } from './../Api/Api';
import Nodata from '../Nodata/Nodata';
import Productlist from './Productlist';
import Statusloader from '../Comps/Statusloader';

function ProductTab() {
    const {data, isloading, emptydata} = useFetch(getproductdetails, methodGet);
 
    if (!isloading) {
        return ( 
            <Statusloader/>
        )
    } else {
        return (
            <Box variant="div" sx={{ p: 3 }}>
         
                {emptydata && data.length === 0 ? <Nodata /> : 
                <Box>
                 
                    <Box sx={{ py: 3 }}>
                        <Productlist data={data} subpage={`editproduct`} />
                    </Box>
                </Box>
                }
           
            </Box>)
    }

}

export default ProductTab