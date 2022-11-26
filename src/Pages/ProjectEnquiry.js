import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Input, Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import { addproject, methodPost } from '../Api/Api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { appendData } from '../Api/Variables';
import SnackBar from '../Comps/SnackBar';


export default function ProjectEnquiry() {

    const { formState: { errors }, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [projectdocument, setProjectDocument] = useState("");
    const [CustomerName, setCustomerName] = useState("");
    const [MobileNum, setMobileNum] = useState("");
    const [Email, setEmail] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [CompanyAddress, setCompanyAddress] = useState("");
    const [GstNum, setGstNum] = useState("");
    const [Services, setServices] = useState("");
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescp, setProjectDescp] = useState("");
    const [ExpectDate, setExpectDate] = useState("");
    const [ProjectBudget, setProjectBudget] = useState("");
    const [ProjectStart, setProjectStart] = useState("");


    const serverData = {
        CustomerName: CustomerName,
        MobileNum: MobileNum,
        Email: Email,
        CompanyName: CompanyName,
        CompanyAddress: CompanyAddress,
        GstNum: GstNum,
        Services: Services,
        ProjectName: ProjectName,
        ProjectDescp: ProjectDescp,
        ExpectDate: ExpectDate,
        ProjectBudget: ProjectBudget,
        ProjectStart: ProjectStart,
        ProjectDoc: projectdocument

    }
    const sendData = appendData(serverData);
    const onSubmit = () => {
        // const serverData = new FormData()
        // for (var key in data) {
        //   serverData.append(key, data[key]);
        // }
        if (!navigator.onLine) {
            setMessage('Your internet is in Offline')
            setOpen(true)
            setStatus(false)
            setColor(false)
        } else {
            axios({
                method: methodPost,
                url: addproject,
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



    return (
        
        <Box autoComplete="off" sx={{ fontFamily:'san-serif'}}>
    

           <Box sx={{ py: 3 ,ml:5}}>
       <h3>PROJECT ENQUIRIES</h3>
      </Box>
                                             
       <Box sx={{ height:'90%'}} display="flex" alignItems="center">     
       <SnackBar open={open} message={message} setOpen={setOpen} status={status} color={color} />                                   
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ px: 5, backgroundColor: 'white', borderRadius: '10px',mx:2, my: 4, boxShadow: 11 }}>
             <Grid container justifyContent='center' sx={{ textAlign: 'center' }}  spacing={4}  >
                 
                    <Grid item lg={6} xl={6}>
              

               
<Box  sx={{ border:"1px solid black" , p:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2} ,mt:5  }} >
<Box sx={{ pb: 3 ,textAlign:'left'}}><h5>CUSTOMER DETAILS</h5></Box>
                        <Grid container justifyContent='space-evenly' spacing={2}  >
                            
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}   >
                                <TextField   fullWidth id="CustomerName" label="Name" variant="outlined" required size='small'  color='secondary'
                                    error={errors.CustomerName ? true : false}
                                    helperText={(errors.CustomerName && errors.CustomerName.type === "required") ? "Customer Name is required" : ""}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    {...("CustomerName", { required: true })}
                                    
                                />
                            </Grid>
                            
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >

                                <TextField  fullWidth id="MobileNum" label="Mobile number" required variant="outlined"  size='small'color='secondary'
                                    error={errors.MobileNum ? true : false}
                                    helperText={(errors.MobileNum && errors.MobileNum.type === "required") ? "Mobile Number is required" : ""}
                                    inputProps={{
                                        maxLength: 10
                                    }}
                                    onChange={(e) => setMobileNum(e.target.value)}
                                  
                                />
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="Email" label="Email id" variant="outlined" size='small'color='secondary'
                                    error={errors.Email ? true : false}
                                    helperText={(errors.Email && errors.Email.type === "required") ? "Email is required" : ""}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="CompanyName" label="Company Name" variant="outlined" size='small'color='secondary'
                                    error={errors.CompanyName ? true : false}
                                    helperText={(errors.CompanyName && errors.CompanyName.type === "required") ? "Company Name is required" : ""}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </Grid>

                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="CompanyAddress" label="Company address" variant="outlined" size='small'color='secondary'
                                    error={errors.CompanyAddress ? true : false}
                                    helperText={(errors.CompanyAddress && errors.CompanyAddress.type === "required") ? "Company Address is required" : ""}
                                    onChange={(e) => setCompanyAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={6} sm={4} xl={4} xs={141} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="GstNum" label="Gst" variant="outlined" size='small'color='secondary'
                                    error={errors.GstNum ? true : false}
                                    helperText={(errors.GstNum && errors.GstNum.type === "required") ? " Gst Number is required" : ""}
                                    onChange={(e) => setGstNum(e.target.value)}
                                />
                            </Grid>
                         


                     
                   
                            <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="Services" label="Service Domain" variant="outlined" size='small'color='secondary'
                                    error={errors.Services ? true : false}
                                    helperText={(errors.Services && errors.Services.type === "required") ? " Services is required" : ""}
                                    onChange={(e) => setServices(e.target.value)}
                                />
                            </Grid>
                        
                            </Grid>
                            </Box>
                    </Grid> 
                   
                                                     {/* (project Enquiries) */}

               
                <Grid item lg={6} xl={6} >
                  
               <Box  sx={{ border:"1px solid black" , px:4 , pb:5 ,pt:4 ,borderColor:'#d2cbcb;' , borderRadius:'4px',':hover': {  boxShadow:2},mt:5  }}>
               <Box sx={{ pb: 3 ,textAlign:'left' }}>
                   <h5>PROJECT DETAILS</h5>
               </Box>
                    <Grid container justifyContent='space-evenly' spacing={2}  >
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2  }}  >
                            <TextField fullWidth id="ProjectName" label="Project name" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectName ? true : false}
                                helperText={(errors.ProjectName && errors.ProjectName.type === "required") ? " Project Name is required" : ""}
                                onChange={(e) => setProjectName(e.target.value)}
                            />
                        </Grid>


                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >

                            <TextField fullWidth id="projectdocument" label="Documents" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectDoc ? true : false}
                                helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
                                type="file"
                                onChange={(e) => setProjectDocument(e.target.files[0])}

                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        </Grid>


                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField fullWidth id="ProjectBudget" label="Approx Budget" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectBudget ? true : false}
                                helperText={(errors.ProjectBudget && errors.ProjectBudget.type === "required") ? " Approx Budget is required" : ""}
                                onChange={(e) => setProjectBudget(e.target.value)}
                            />
                        </Grid>
                       
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField sx={{ width: '100%' }} id="ExpectDate" label="Expected date" type="date" InputLabelProps={{ shrink: true, }} variant="outlined" size='small'color='secondary'
                                error={errors.ExpectDate ? true : false}
                                helperText={(errors.ExpectDate && errors.ExpectDate.type === "required") ? "Expected date is required" : ""}
                                onChange={(e) => setExpectDate(e.target.value)}
                            />

                        </Grid>

                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }} >
                            <TextField sx={{ width: '100%' }} id="ProjectStart" label="Project Start Date" variant="outlined" size='small'color='secondary' type="date" InputLabelProps={{ shrink: true, }}
                                error={errors.ProjectStart ? true : false}
                                helperText={(errors.ProjectStart && errors.ProjectStart.type === "required") ? "Date of project is required" : ""}
                                onChange={(e) => setProjectStart(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} sm={4} xl={4} xs={14} md={4} sx={{ py: 2 }}  >
                            <TextField fullWidth id="ProjectDescp" rows={4} label="Description" color='secondary' variant="outlined" size='small' multiline
                                error={errors.ProjectDescp ? true : false}
                                helperText={(errors.ProjectDescp && errors.ProjectDescp.type === "required") ? "Project Description is required" : ""}
                                onChange={(e) => setProjectDescp(e.target.value)}
                            />

                        </Grid>


                    </Grid>
                    </Box>
                   
                   
                </Grid >
                </Grid>      

                                                           {/* {buttons}  */} 

                <Grid container justifyContent='center' sx={{ textAlign: 'center' ,mt:3 }}>
                        <Grid item lg={6} xl={6} xs={12} >
                            <Grid container justifyContent='space-evenly' alignItems='center'>
                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }} >
                                    <Stack spacing={2} direction="row" >
                                        <Button fullWidth variant="outlined"
                                            type='submit' sx={{ color: 'white', backgroundColor: '#7bc54c', borderColor: '#7bc54c', ':hover': {  borderColor: '#7bc54c', color: '#000000' } }}>Submit</Button>
                                    </Stack>

                                </Grid>

                                <Grid item lg={3} sm={3} xl={3} xs={3} md={3} sx={{ py: 2 }}>
                                    <Stack spacing={2} direction="row">

                                        <Button fullWidth variant="outlined"
                                            type='cancel'sx={{ color: 'white', backgroundColor: '#c62828', borderColor: '#c62828' , ':hover': {  borderColor: '#c62828', color: '#000000' } }}>Cancel</Button>
                                            

                                    </Stack>

                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>

            </Box >
           
            </Form>
            </Box >




        </Box >





    );
}