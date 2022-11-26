import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SnackBar from "./../Comps/SnackBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, Image } from "react-bootstrap";
import { login, methodPost } from "../Api/Api";
import axios from "axios";
import { startUrl } from "./../Routes";
import "../Api/Variables";
import logo from '../Assets/images/logo.png';

function Login({
  setsuccessOpen,
  setsuccessMessage,
  setsuccessStatus,
  setsuccessColor,
}) {
  const navigate = useNavigate();

  const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    borderRadius: '10px'
  };
  
 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const onSubmit = (data) => {
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
        url: login,
        data: serverData,
      }).then(res => {
        if (res.data.error) {
          setMessage(res.data.message)
          setOpen(true)
          setStatus(false)
          setColor(false)
        } else {
          localStorage.setItem('auth', true);
          localStorage.setItem('access', JSON.stringify({
            role: res.data.data.roles,
            username:res.data.data.UserName
          }))
          navigate(`${startUrl}app`)
          setsuccessOpen(true)
          setsuccessMessage(res.data.message)
          setsuccessStatus(true)
          setsuccessColor(true)

        }
      }).catch(err => {
        alert('Oops something went wrong ' + err)
      });
    }

  }

  return (
    <Box sx={{  height: "100vh" }}>
      <SnackBar
        open={open}
        message={message}
        setOpen={setOpen}
        status={status}
        color={color}
      />
      <>
        <Box component="div">
          <Grid container sx={{ height: "100vh" }} alignItems={"center"} justifyContent="center">
            <Grid item xs={10} sm={10} md={10} lg={4} xl={4} sx={{ textAlign:'center', ...commonStyles, borderColor: 'primary.main'}}>
                      <Box sx={{ px:4, py:4 }}>
                        <Box>
                        <Image src={logo} className='w-75 h-75' alt="igreen logo"/>
                        </Box>
                        <Box sx={{ py: 2, color: '#7bc54c' }}>
                          <Typography
                            fontSize={{
                              lg: 30,
                              md: 26,
                              sm: 23,
                              xs: 20,
                            }}
                            variant="h5"
                          >
                            Welcome
                          </Typography>
                        </Box>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <Box sx={{ py: 2 }}>
                            <TextField
                              error={errors.username ? true : false}
                              helperText={
                                errors.username &&
                                errors.username.type === "required"
                                  ? "User name is required"
                                  : ""
                              }
                              fullWidth
                              label="User Name"
                              variant="outlined"
InputLabelProps={{ shrink: true }}
                              {...register("MobileNum", { required: true })}
                            />
                          </Box>
                          <Box sx={{ py: 2 }}>
                            <TextField
                              fullWidth
                              variant="outlined"
InputLabelProps={{ shrink: true }}
                              type={showPassword ? "password" : "text"}
                              {...register("Password", { required: true })}
                              label="Password"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              helperText={
                                errors.pass && errors.pass.type === "required"
                                  ? "Password is required"
                                  : ""
                              }
                              error={errors.pass ? true : false}
                            />
                          </Box>
                          <Box sx={{ py: 2 }}>
                            <Button
                              type="submit"
                              sx={{ p: 2, color: 'white' }}
                              fullWidth
                              variant="contained"
                              className="primary"
                            >
                              Login
                            </Button>
                          </Box>
                        </Form>
                      </Box>
                    </Grid>
                  </Grid>
               
          <Outlet />
        </Box>
      </>
    </Box>
  );
}

export default Login;
