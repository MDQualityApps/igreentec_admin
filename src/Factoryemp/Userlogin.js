import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  TableCell,
  TableRow,
  Button,
  tableCellClasses,
  Grid,
  TextField
} from "@mui/material";
import { methodPost, updateassignedproject, getassignedorders } from "../Api/Api";
import { appendData } from "../Api/Variables";
import { Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router";
import Statusloader from "../Comps/Statusloader";
import useFetch from "../Api/useFetch";


const access = JSON.parse(localStorage.getItem('access'));
const { username } = access;


function Userlogin() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const { register, formState: { errors }, handleSubmit } = useForm();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [message, setMessage] = useState(false);
  const [sopen, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [ remarks, setremarks] = useState("");
  const [ projectstatus, setprojectstatus] = useState("");
  const controller = new AbortController();
  const signal = controller.signal;
  const [refreshpage, setrefreshpage] = useState(false);
  const location = useLocation();


  

  const user_name = new FormData();
  user_name.append("EmployeeName", username);
 
  const {data, isloading, emptydata} = useFetch(getassignedorders, methodPost, user_name);

  console.log(data);


  const projectid = location.state.id;
  const projectno = new FormData();
  projectno.append("ProjectId", projectid);
  const serverData = {
       
    Remarks: remarks,
    ProjectStatus: projectstatus,
    ProjectAssignedId: projectid,
  }
 
  const sendData = appendData(serverData);
const onSubmit = () => {
   
    if (!navigator.onLine) {
        setMessage('Your internet is in Offline')
        setOpen(true)
        setStatus(false)
        setColor(false)
    } else {
        axios({
            method: methodPost,
            url: updateassignedproject,
            data: sendData,
        }).then(res => {
            if (res.data.error) {
                setMessage(res.data.message)
                setOpen(true)
                setStatus(false)
                setColor(false)
            } else {
                setMessage(res.data.message)
                setOpen(true)
                setStatus(true)
                setColor(true)

            }
        }).catch(err => {
            alert('Oops something went wrong ' + err)
        });
    }

}


  if (!isloading) {
    return <Statusloader />;
  } else {

  return (
    <>
    <Box>
      
      <Box sx={{ mt:5,mx:5 }}><h3>ORDER DETAIL</h3></Box>
      
    
    
      <Box sx={{ px: 5,mx:5, backgroundColor: 'white', my: 4, borderRadius: '5px' }} component={Card}>
    
<Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
    <Grid item lg={12} xl={10} >
    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
    <Grid item lg={12} xl={7}  xs={16} >
    {data.map((order) =>
        <Grid container justifyContent='space-evenly' spacing={3} sx={{p:4}}>
            <Grid item lg={3} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
         
         <TextField 
         fullWidth id="OrderNum" 
         label="Order Number"
          disabled 
          variant="outlined" 
          color='secondary'  
          value={order.OrderNum}
          size="small" 
          InputLabelProps={{ shrink: true, }}
                                 />
         </Grid>
       
            <Grid item lg={3} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
         
            <TextField 
            fullWidth id="ProjectName" 
            label="Project Name"
             disabled 
             variant="outlined" 
             color='secondary'  
             value={order.AssignedOn}
             size="small" 
             InputLabelProps={{ shrink: true, }}
                                    />
            </Grid>
          
            <Grid item lg={3} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Duedate" label="Due Date" variant="outlined" 
                 value={order.DueDate}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
       
            <Grid item lg={3} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="ProjectStatus" label="Project Status" variant="outlined" color='secondary'
                     value={order.ProjectStatus}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>

          
           
           
        </Grid>
      )
    } 
    </Grid>
  
        </Grid>
   </Grid>
</Grid>
 
</Box>
                                {/* =================Status update================== */}
                                <Box sx={{pt:3, px:5}}><h3>STATUS UPDATE</h3></Box>
                                <Box sx={{ p: 2, m:5 }} component={Card}>
    
    
                <Box sx={{ px: 5 }}>
       <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={12} xl={10} xs={9.5} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center',mt:2 }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} >
                                <Grid item lg={5} sm={4} xl={6} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Remarks" label="Remarks" variant="outlined" color='secondary'
                                        error={errors.ProductName ? true : false}
                                        helperText={(errors.ProductName && errors.ProductName.type === "required") ? "Product Name is required" : ""}
                                      // {...register("Remarks", {required:true}) }
                                      onChange={(e) => setremarks(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                           
                                <Grid item lg={5} sm={4} xl={6}  md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="status" label="Status" variant="outlined" color='secondary'
                                        error={errors.ProductQty ? true : false}
                                        helperText={(errors.ProductQty && errors.ProductQty.type === "required") ? "Product Quantity is required" : ""}
                                        // {...register("ProjectStatus", {required:true})}
                                        onChange={(e) => setprojectstatus(e.target.value)}
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
                    

            </Form>
                </Box>







</Box>
       
    
      {/* <Box sx={{ mt:5 }}><h1  sx={{ mx:2}}>Order Status</h1></Box>
      <Box sx={{ p: 2, my:4 }} component={Card}> 
       <TableContainer sx={{p:2}} >
          <Table>
            <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow>
                {orderstatus.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                      <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center'

}}>
                      <Box sx={{ my: "auto" }}>{hd.name}</Box>
                      
                    </Box>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {data
                
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Order) => (
                  <StyledTableRow >
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {Order.CustomerName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {Order.MobileNum}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {Order.Services}
                    </StyledTableCell>
                   
                   
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box> */}
      </Box>
    </>
  );
  }
}

export default Userlogin;

