import React from 'react'
import { Box, Grid, TextField, Button } from '@mui/material';
import useFetch from './../Api/useFetch';
import { getorderdetails, methodGet } from './../Api/Api';
import Nodata from '../Nodata/Nodata';
import Statusloader from '../Comps/Statusloader';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import ExpenseTable from '../Expense/ExpenseTable';
import { Card } from 'react-bootstrap';




function Expenditure() {
    const {data, isloading, emptydata} = useFetch(getorderdetails, methodGet);
    const { register, formState: { errors }, handleSubmit } = useForm();

 
    if (!isloading) {
        return (
            <Statusloader />
        )
    } else {
        return (
            <Box variant="div" sx={{ p: 5 }}>
                <Box sx={{ pb: 2}}><h3>ADD EXPENSE</h3></Box>
             <Box sx={{ px: 5, py:4,  my: 2, borderRadius: '5px',':hover': {  boxShadow:2} }} component={Card}>


<Grid container justifyContent='center' sx={{ textAlign: 'center',py: 2 }} spacing={2}>
    <Grid item lg={12} xl={10} xs={12} >
    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
    <Grid item lg={8} xl={7} >

        <Grid container justifyContent='space-evenly' spacing={3} >
            
    <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="EmployeeName" label="Employee Name" variant="outlined" color='secondary'
                    error={errors.EmployeeName ? true : false}
                    helperText={(errors.EmployeeName && errors.EmployeeName.type === "required") ? "EmployeeName is required" : ""}
                    
                    size="small"
                />
                </Grid>
            <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Expensetype" label="Expense Type" variant="outlined" color='secondary'
                    error={errors.Expensetype ? true : false}
                    helperText={(errors.Expensetype && errors.Expensetype.type === "required") ? "Expensetype is required" : ""}
                    size="small"
                />
            </Grid>
     
            <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Date" label="Date" variant="outlined" color='secondary'
                    error={errors.Date ? true : false}
                    helperText={(errors.Date && errors.Date.type === "required") ? "Date is required" : ""}
                   
                    size="small"
                />
            </Grid>
            <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Amount" label="Amount" variant="outlined" color='secondary'
                    error={errors.Amount ? true : false}
                    helperText={(errors.Amount && errors.Amount.type === "required") ? "Amount is required" : ""}
                    
                    size="small"
                />
            </Grid>

   
        
      
           
        </Grid>
        
     
    
    </Grid>
        </Grid>
        </Grid>
</Grid>

<Grid container justifyContent='center' sx={{ textAlign: 'center' }}>
      
      <Grid item lg={6} xl={4} xs={12} >
          <Grid container justifyContent='space-evenly' alignItems='center'>
              <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2 }}>
                  <Stack spacing={2} direction="row">
                      <Button fullWidth variant="outlined"
                          type='submit' sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c',':hover': {  borderColor: '#7bc54c', color:'black' } }}>Submit</Button>
                  </Stack>
              </Grid>
          </Grid>
      </Grid>
  
  </Grid>


</Box>


                {emptydata && data.length === 0 ? <Nodata /> : 
                <Box>
                 
                    <Box sx={{ py: 2 }}>
                        <ExpenseTable data={data}/>
                    </Box>
                </Box>
                }
           
            </Box>)
    }

}

export default Expenditure