import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  tableCellClasses,
  Grid,
  TextField
} from "@mui/material";


import Statusloader from "../Comps/Statusloader";
import { methodPost, getsingleproject, procurement } from "../Api/Api";
import { appendData, orderdetails, procuredetails } from "../Api/Variables";
import styled from "@emotion/styled";
import { Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import axios from "axios";



function Procurement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  const [search, setSearch] = useState("");
  const { register, formState: { errors }, handleSubmit } = useForm();

  const location = useLocation();
  const projectid = location.state.id;
  const projectno = new FormData();
  projectno.append("ProjectId", projectid);

  console.log(projectid);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [emptydata, setemptydata] = useState(false);
  const controller = new AbortController();
  const signal = controller.signal;
  const [refreshpage, setrefreshpage] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#7bc54c',
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#F9F9FB',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


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
        if (res.data.data.data!== undefined) {
          setData(res.data.data);
          setIsloading(true);
          setrefreshpage(false);
        } else {
          setIsloading(true)
        }
      }).catch(err => {
        console.log(err)
      });
    }
    return () => controller.abort();
  }, [refreshpage] );


  const [VendorName1,setVendorName1] = useState("");
  const [VendorGST1,setVendorGST1] = useState("");
  const [VendorAddress1,setVendorAddress1] = useState("");
  const [Cost1,setCost1] = ("");
  const [LeadTime1,setLeadTime1] = useState("");
  const [QuoteAttachment1,setQuoteAttachment1] = useState("");
  const [VendorName2,setVendorName2] = useState("");
  const [VendorGST2,setVendorGST2] = ("");
  const [VendorAddress2,setVendorAddress2] = ("");
  const [Cost2,setCost2] = useState("");
  const [LeadTime2,setLeadTime2] = useState("");
  const [QuoteAttachment2,setQuoteAttachment2] = useState("");
  const [VendorName3,setVendorName3] = useState("");
  const [VendorGST3,setVendorGST3] = useState("");
  const [VendorAddress3,setVendorAddress3] = useState("");
  const [Cost3,setCost3] = useState("");
  const [LeadTime3,setLeadTime3] = useState("");
  const [QuoteAttachment3,setQuoteAttachment3] = useState("");
	


  const serverData = {
    ProjectId     : projectno,     
    VendorName1   : VendorName1,
    VendorGST1    : VendorGST1,    
    VendorAddress1: VendorAddress1,
    Cost1         : Cost1 ,        
    LeadTime1     : LeadTime1,
    QuoteAttachment1:QuoteAttachment1,     
    VendorName2   : VendorName2 ,  
    VendorGST2    : VendorGST2  ,  
    VendorAddress2: VendorAddress2,
    Cost2         : Cost2    ,     
    LeadTime2     : LeadTime2 ,  
    QuoteAttachment2:QuoteAttachment2,  
    VendorName3   : VendorName3  , 
    VendorGST3    : VendorGST3   , 
    VendorAddress3: VendorAddress3,
    Cost3         : Cost3    ,     
    LeadTime3     : LeadTime3,
    QuoteAttachment3: QuoteAttachment3     

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
              url: procurement,
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
      <Box sx={{ py: 2 }}>
       <h1>Order Status</h1>
      </Box>

      <Box sx={{ px: 5, backgroundColor: 'white', mx: 2, my: 2, borderRadius: '5px',':hover': {  boxShadow:2} }}>
    
    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
        <Grid item lg={12} xl={10} xs={12} >
        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
        <Grid item lg={12} xl={7} >
        {
            [data].map((order) =>
                
            <Grid container justifyContent='space-evenly' key={order.id} spacing={3} sx={{p:4}}>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField 
                    fullWidth id="OrderNum"
                     label="Order Number"
                      variant="outlined" 
                      value={"Sathiya"}
                        size="small"
                        disabled={true}
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField 
                    fullWidth id="Customer Name"
                     label="Customer Name"
                      variant="outlined" 
                      value={"Sathiya"}
                        size="small"
                        disabled={true}
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="Mobile Number" label="Mobile Number" variant="outlined" 
                     value={"1234567890"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
           
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="Services" label="Services" variant="outlined" color='secondary'
                         value={"Drilling"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
    
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="Company Name" label="Company Name" variant="outlined" 
                      value={"igreen Technologies"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="Project Name" label="Project Name" variant="outlined" 
                      value={"Test"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
    
       
            
            <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="ProductPrice" label="Project Description" variant="outlined"  value={"25000"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="ProductPrice" label="Expected Date" variant="outlined" 
                    value={"06/05/2022"}
                        size="small"
                        disabled
                        type="date"
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="ProductPrice" label="Project Budget" variant="outlined" 
                    value={"30000"}
                        size="small"
                        disabled
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="ProductPrice" label="Project Startdate" variant="outlined" 
                      value={"06/30/2022"}
                        size="small"
                        disabled
                        type="date"
                        InputLabelProps={{ shrink: true, }}
                    />
                </Grid>
                <Grid item lg={4} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                    <TextField fullWidth id="ProductPrice" label="Project Status" variant="outlined"   InputLabelProps={{ shrink: true, }}
                    value={"Work in Progress"}
                        size="small"
                        disabled
                    />
                </Grid>
               
               
            </Grid>
           
            )}
        </Grid>
            </Grid>
       </Grid>
    </Grid>
   
    </Box>

      {/* ============================================= Quote ================================================ */}
      <Box sx={{ p:2 }}><h1>Procurement</h1></Box>
      <Box sx={{ p: 2, mx: 2, my: 2 }} component={Card}>
     

<Box >
   
   
                <Box sx={{ px: 5 }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{pl:4,pt:2}}><h2>Quote 1</h2></Box>
                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}  >
                        <Grid item lg={12} xl={10} xs={14} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} sx={{p:2}} >
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="VendorName" label="Vendor Name" variant="outlined" color='secondary'
                                        error={errors.VendorName ? true : false}
                                        helperText={(errors.VendorName && errors.VendorName.type === "required") ? "Vendor Name is required" : ""}
                                        onChange={(e) => setVendorName1(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                           
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="GSTNumber" label="GST Number" variant="outlined" color='secondary'
                                        error={errors.GSTNumber ? true : false}
                                        helperText={(errors.GSTNumber && errors.GSTNumber.type === "required") ? "GST Number is required" : ""}
                                        onChange={(e) => setVendorGST1(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProjectCost" label="Project Cost" variant="outlined" color='secondary'
                                        error={errors.ProjectCost ? true : false}
                                        helperText={(errors.ProjectCost && errors.ProjectCost.type === "required") ? "ProjectCost is required" : ""}
                                        onChange={(e) => setCost1(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Address" label="Address" variant="outlined" color='secondary'
                                        error={errors.Address ? true : false}
                                        helperText={(errors.Address && errors.Address.type === "required") ? "Address is required" : ""}
                                        onChange={(e) => setVendorAddress1(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="LeadTime" label="Lead Time" variant="outlined" color='secondary'
                                        error={errors.LeadTime ? true : false}
                                        helperText={(errors.LeadTime && errors.LeadTime.type === "required") ? "Lead Time is required" : ""}
                                        onChange={(e) => setLeadTime1(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="projectdocument" label="Documents" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectDoc ? true : false}
                                helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
                                type="file"
                                onChange={(e) => setQuoteAttachment1(e.target.files[0])}
                                
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                                </Grid>

                               
                            </Grid>
                            
                         
                        </Grid>
                      
                            </Grid>
                            </Grid>
                    </Grid>
             
                   
                <Box sx={{pl:4}}><h2>Quote 2</h2></Box>
                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={12} xl={10} xs={14} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} sx={{p:2}}  >
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="VendorName" label="Vendor Name" variant="outlined" color='secondary'
                                        error={errors.VendorName ? true : false}
                                        helperText={(errors.VendorName && errors.VendorName.type === "required") ? "Vendor Name is required" : ""}
                                        onChange={(e) => setVendorName2(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                           
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="GSTNumber" label="GST Number" variant="outlined" color='secondary'
                                        error={errors.GSTNumber ? true : false}
                                        helperText={(errors.GSTNumber && errors.GSTNumber.type === "required") ? "GST Number is required" : ""}
                                        onChange={(e) => setVendorGST2(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProjectCost" label="Project Cost" variant="outlined" color='secondary'
                                        error={errors.ProjectCost ? true : false}
                                        helperText={(errors.ProjectCost && errors.ProjectCost.type === "required") ? "ProjectCost is required" : ""}
                                        onChange={(e) => setCost2(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Address" label="Address" variant="outlined" color='secondary'
                                        error={errors.Address ? true : false}
                                        helperText={(errors.Address && errors.Address.type === "required") ? "Address is required" : ""}
                                        onChange={(e) => setVendorAddress2(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="LeadTime" label="Lead Time" variant="outlined" color='secondary'
                                        error={errors.LeadTime ? true : false}
                                        helperText={(errors.LeadTime && errors.LeadTime.type === "required") ? "Lead Time is required" : ""}
                                        onChange={(e) => setLeadTime2(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="projectdocument" label="Documents" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectDoc ? true : false}
                                helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
                                type="file"
                                onChange={(e) => setQuoteAttachment2(e.target.files[0])}

                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                                </Grid>

                               
                            </Grid>
                            
                         
                        </Grid>
                      
                            </Grid>
                            </Grid>
                    </Grid>
             
                    
                  
                <Box sx={{pl:4}}><h2>Quote 3</h2></Box>
                    <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={12} xl={10} xs={14} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} sx={{p:2}}  >
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="VendorName" label="Vendor Name" variant="outlined" color='secondary'
                                        error={errors.VendorName ? true : false}
                                        helperText={(errors.VendorName && errors.VendorName.type === "required") ? "Vendor Name is required" : ""}
                                        onChange={(e) => setVendorName3(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                           
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="GSTNumber" label="GST Number" variant="outlined" color='secondary'
                                        error={errors.GSTNumber ? true : false}
                                        helperText={(errors.GSTNumber && errors.GSTNumber.type === "required") ? "GST Number is required" : ""}
                                        onChange={(e) => setVendorGST3(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProjectCost" label="Project Cost" variant="outlined" color='secondary'
                                        error={errors.ProjectCost ? true : false}
                                        helperText={(errors.ProjectCost && errors.ProjectCost.type === "required") ? "ProjectCost is required" : ""}
                                        onChange={(e) => setCost3(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="Address" label="Address" variant="outlined" color='secondary'
                                        error={errors.Address ? true : false}
                                        helperText={(errors.Address && errors.Address.type === "required") ? "Address is required" : ""}
                                        onChange={(e) => setVendorAddress3(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="LeadTime" label="Lead Time" variant="outlined" color='secondary'
                                        error={errors.LeadTime ? true : false}
                                        helperText={(errors.LeadTime && errors.LeadTime.type === "required") ? "Lead Time is required" : ""}
                                        onChange={(e) => setLeadTime3(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={14} md={4} sx={{ py: 2 }} >
                                <TextField fullWidth id="projectdocument" label="Documents" variant="outlined" size='small'color='secondary'
                                error={errors.ProjectDoc ? true : false}
                                helperText={(errors.ProjectDoc && errors.ProjectDoc.type === "required") ? " Project Document is required" : ""}
                                type="file"
                                onChange={(e) => setQuoteAttachment3(e.target.files[0])}

                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                                </Grid>

                               
                            </Grid>
                            
                         
                        </Grid>
                      
                            </Grid>
                            </Grid>
                    </Grid>
             
                   
                      </Form>
                        
                </Box>
                <Grid container justifyContent='center' sx={{ textAlign: 'center'}}>
                          
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
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Box>

     {/* ======================================== Procurement Table========================================== */}
      <Box sx={{  p:2  }}>
       <h1>Procurement Details</h1>
      </Box>

      <Box sx={{ p: 2, mx: 2, my: 2}} component={Card}>
        <TableContainer>
          <Table>
            <TableHead sx={{ whiteSpace: "nowrap",textAlign:'center' }}>
            <TableRow>
                {  procuredetails.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                     textAlign:'center',
                     
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent:'center',alignItems:'center' }}>
                      <Box sx={{ my: "auto" }}>{hd.name}</Box>
                      {/* <Box>
                        {hd.filter ? (
                          <Filter
                            search={search}
                            label={hd.name}
                            setSearch={setSearch}
                          />
                        ) : (
                          ""
                        )}
                      </Box> */}
                    </Box>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {data
                
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <StyledTableRow >
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.CustomerName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.MobileNum}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.Services}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.CompanyName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectName}
                    </StyledTableCell>
                   
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

       
      </Box>
      </Box>
    </>
  );
  }
}

export default Procurement;

