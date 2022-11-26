import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { addproduct, methodPost } from '../Api/Api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import SnackBar from '../Comps/SnackBar';
import { appendData } from '../Api/Variables';


export default function Addproduct() {

    const theme = useTheme();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sopen, setOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [color, setColor] = useState(false);
    const [message, setMessage] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPhotos, setProductPhotos] = useState("");
    const [productQty, setProductQty] = useState("");
    const [productqlty, setProductQlty] = useState("");
    const [productstock, setProductStock] = useState("");
    const [productprice, setProductPrice] = useState("");
    const [discountprice, setDiscountPrice] = useState("");


    const serverData = {
       
        ProdName: productName,
        ProdDescp: productDescription,
        ProdPhotos: productPhotos,
        ProdQty: productQty,
        ProdQlty:productqlty,
        ProdStock:productstock,
        ProdPrice:productprice,
        DiscPrice:discountprice

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
                url: addproduct,
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
       
        <Box autoComplete="off" >
              <Box sx={{ py: 2 ,pl:4}}><h3>ADD PRODUCT</h3></Box>
         
            <SnackBar sopen={sopen} message={message} setOpen={setOpen} status={status} color={color} />
           
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ px: 5, backgroundColor: 'white', mx: 4, my: 4, borderRadius: '5px',':hover': {  boxShadow:2} }}>

                    <Grid container justifyContent='center' sx={{ textAlign: 'center',pt:3 }} spacing={2}>
                        <Grid item lg={12} xl={10} xs={12} >
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                        <Grid item lg={8} xl={7} >

                            <Grid container justifyContent='space-evenly' spacing={3} >
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductName" label="Product Name" variant="outlined" color='secondary'
                                        error={errors.ProductName ? true : false}
                                        helperText={(errors.ProductName && errors.ProductName.type === "required") ? "Product Name is required" : ""}
                                        onChange={(e) => setProductName(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                           

                                {/* </Grid>
                        <Grid container justifyContent='center' > */}
                            
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductQty" label="Product Quantity" variant="outlined" color='secondary'
                                        error={errors.ProductQty ? true : false}
                                        helperText={(errors.ProductQty && errors.ProductQty.type === "required") ? "Product Quantity is required" : ""}
                                        onChange={(e) => setProductQty(e.target.value)}
                                        size="small"
                                    />
                                </Grid>

                                {/* </Grid>
                        <Grid container justifyContent='center'> */}
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductQlty" label="Product Quality" variant="outlined" color='secondary'
                                        error={errors.ProductQlty ? true : false}
                                        helperText={(errors.ProductQlty && errors.ProductQlty.type === "required") ? "Product Quality is required" : ""}
                                        onChange={(e) => setProductQlty(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductStock" label="Product Stock" variant="outlined" color='secondary'
                                        error={errors.ProductStock ? true : false}
                                        helperText={(errors.ProductStock && errors.ProductStock.type === "required") ? "Product Stock is required" : ""}
                                        onChange={(e) => setProductStock(e.target.value)}
                                        size="small"
                                    />
                                </Grid>

                       
                            
                            <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductPrice" label="Product Price" variant="outlined" color='secondary'
                                        error={errors.ProductPrice ? true : false}
                                        helperText={(errors.ProductPrice && errors.ProductPrice.type === "required") ? " Product Price is required" : ""}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item lg={5} sm={4} xl={6} xs={11} md={4} sx={{ py: 2 }} > 
                                    <TextField fullWidth id="DiscountPrice" label="Discount Price" variant="outlined" color='secondary'
                                        error={errors.DiscountPrice ? true : false}
                                        helperText={(errors.DiscountPrice && errors.DiscountPrice.type === "required") ? "Discount Price is required" : ""}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                        size="small"
                                    />
                                </Grid>
                               
                            </Grid>
                            
                         
                        </Grid>
                        <Grid item lg={4} xl={5}>
                        <Grid container justifyContent='center' sx={{ textAlign: 'center' }} spacing={2}>
                            <Grid item lg={12} sm={4} xl={11} xs={11} md={4} sx={{ py: 2 }} >
                                    <TextField fullWidth id="ProductPhotos" label="Product Photos" variant="outlined" color='secondary'
                                        error={errors.ProductPhotos ? true : false}
                                        helperText={(errors.ProductPhotos && errors.ProductPhotos.type === "required") ? "Product Photos is required" : ""}
                                        type="file"                                    onChange={(e) => setProductPhotos(e.target.files[0])}

                                        InputLabelProps={{
                                            shrink: true,                                    }}
                                       
                                    />
                                </Grid>
                                <Grid item lg={12} xl={11} xs={11}>
                              
                              <TextField
                              multiline
                              rows={4}                                
                              fullWidth id="ProductDescription" 
                                label="Product Description" 
                                variant="outlined" color='secondary'
                                  error={errors.ProductDescription ? true : false}
                                  helperText={(errors.ProductDescription && errors.ProductDescription.type === "required") ? "Product Description is required" : ""}
                                 
                                  onChange={(e) => setProductDescription(e.target.value)}
                                  
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

        </Box >
    );
}