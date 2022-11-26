import React, { useEffect, useState } from "react";
import {
  Box,
  TableCell,
  TableRow,
  Button,
  tableCellClasses,
  Grid,
  TextField
} from "@mui/material";
import {  methodPost, getsingleproject, addproject, assignproject } from "../Api/Api";
import { appendData } from "../Api/Variables";
import styled from "@emotion/styled";
import { Card, Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import axios from "axios";
import Statusloader from "../Comps/Statusloader";
import AssignStatus from "../Orders/AssignStatus";
import OrderStatus from "../Orders/OrderStatus";
import SnackBar from "../Comps/SnackBar";




function  OrderList() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [EmployeeName,setEmployeeName]=useState(""); 
  const [ProjectStatus, setProjectStatus] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [Remarks, setRemarks] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.light,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [emptydata, setemptydata] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;
  const [refreshpage, setrefreshpage] = useState(false);
 
  const location = useLocation();
  const projectid = location.state.id;
  const projectno = new FormData();
  projectno.append("ProjectId", projectid);


  useEffect(() => {
    if (!navigator.onLine) {
      alert("Your internet is in Offline")
    } else {
      axios({
        method: methodPost,
        url: getsingleproject,
        data: projectno,
        signal: signal
      }).then(res => {
        if (res.data.data !== undefined) {
          setData(res.data.data);
          setIsloading(true);
          setrefreshpage(false);
        } else {
          setIsloading(true)
          setemptydata(true)
        }
      }).catch(err => {
        console.log(err)
      });
    }
    return () => controller.abort();
  }, [refreshpage] );
 

  const access = JSON.parse(localStorage.getItem('access'));
  const { username } = access;

  const serverData = {
    ProjectId:projectid,
    EmployeeName:EmployeeName,
    ProjectStatus: ProjectStatus,
    DueDate:DueDate,
    Remarks:  Remarks,
   
}
const sendData = appendData(serverData);
const onSubmit = () => {
    const serverData = new FormData()
    for (var key in data) {
      serverData.append(key, data[key]);
    }
    if (!navigator.onLine) {
        setMessage('Your internet is in Offline')
        setOpen(true)
        setStatus(false)
        setColor(false)
    } else {
        axios({
            method: methodPost,
            url: assignproject,
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
    <Box>
    <SnackBar
        open={open}
        message={message}
        setOpen={setOpen}
        status={status}
        color={color}
      />
   <Box sx={{ mt:5, mx:5 }}><h3>ORDER STATUS</h3></Box>
      
    
    
      <Box sx={{ mx: 5, my: 4, }} component={Card}>
    
<Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
    <Grid item lg={12} xl={10} >
    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
    <Grid item lg={12} xl={7}  >
    {
        [data].map((order) =>
            
        <Grid container justifyContent='space-evenly' key={order.projectid} spacing={3} sx={{p:4}}>
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
             
                <TextField 
                fullWidth id="Customer Name"
                 label="Customer Name"
                  variant="outlined" 
                  value={order.CustomerName}
                    size="small"
                    disabled={true}
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }}>
                <TextField fullWidth id="Mobile Number" label="Mobile Number" variant="outlined" 
                 value={order.MobileNum }
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
       
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Services" label="Services" variant="outlined" color='secondary'
                     value={order.Services}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>

            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Company Name" label="Company Name" variant="outlined" 
                  value={order.CompanyName}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="Project Name" label="Project Name" variant="outlined" 
                  value={order.ProjectName}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="ProjectBudget" label="ProjectBudget" variant="outlined" 
                value={"30000"}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
            
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="ProjectStartdate" label="Project Startdate" variant="outlined" 
                  value={"06/30/2022"}
                    size="small"
                    disabled
                    type="date"
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="ExpectedDate" label="Project Expected Date" variant="outlined" 
                value={"06/05/2022"}
                    size="small"
                    disabled
                    type="date"
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
           
            
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth id="ProjectStatus" label="Project Status" variant="outlined"   InputLabelProps={{ shrink: true, }}
                value={"Work in Progress"}
                    size="small"
                    disabled
                />
            </Grid>
            
        <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                <TextField fullWidth  multiline rows={4} id="ProjectDescription" label="Project Description" variant="outlined"  value={order.ProjectDescp}
                    size="small"
                    disabled
                    InputLabelProps={{ shrink: true, }}
                />
            </Grid>
           
        </Grid>
        
        )}
    </Grid>
  
        </Grid>
   </Grid>
</Grid>
       


</Box>
     

    
      <Box>
      <Box sx={{mt:4,mx:5}}><h3>ASSIGN</h3></Box>
      <Form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ m: 5,py:5 }} component={Card}>

                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={12} xl={10} xs={10} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} >
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Assign engineer" label="Engineer Name" variant="outlined" color='secondary'
                                        error={errors.EngineerName ? true : false}
                                        helperText={(errors.EngineerName && errors.EngineerName.type === "required") ? "Engineer Name is required" : ""}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        size="small"
                                        
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Assign engineer" label="Project Status" variant="outlined" color='secondary'
                                        error={errors.ProjectStatus ? true : false}
                                        helperText={(errors.ProjectStatus && errors.ProjectStatus.type === "required") ? "Project Status is required" : ""}
                                        onChange={(e) => setProjectStatus(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} > 
                                <TextField sx={{ width: '100%' }} id="Due Date" label="Due Date" variant="outlined" size='small'color='secondary' type="date" InputLabelProps={{ shrink: true, }}
                                error={errors.DueDate ? true : false}
                                helperText={(errors.DueDate && errors.DueDate.type === "required") ? "Due Date is required" : ""}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                                </Grid>
                           
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="remarks" label="Remarks" variant="outlined" color='secondary'
                                        error={errors.Remarks ? true : false}
                                        helperText={(errors.Remarks && errors.Remarks.type === "required") ? "Remarks is required" : ""}
                                        onChange={(e) => setRemarks(e.target.value)}
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
                </Form>
                </Box>
              <AssignStatus projectid={projectid} /> 
             <OrderStatus projectid={projectid} />
        

            </Box>
    
  );
  }
}

export default OrderList;
