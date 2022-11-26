import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import Stack from "@mui/material/Stack";
import { addproduct, addvendor, methodPost } from "../Api/Api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useTheme } from "@emotion/react";
import axios from "axios";
import SnackBar from "../Comps/SnackBar";
import { appendData } from "../Api/Variables";

export default function Addvendor() {
  const theme = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [color, setColor] = useState(false);
  const [message, setMessage] = useState("");
  const [VendorName, setVendorName] = useState("");
  const [VendorCompany, setVendorCompany] = useState("");
  const [VendorAddress, setVendorAddress] = useState("");
  const [VendorMobile, setVendorMobile] = useState("");
  const [VendorGST, setVendorGST] = useState("");
  const [VendorEmail, setVendorEmail] = useState("");
  const [VendorService, setVendorService] = useState("");

  const serverData = {
    VendorName:VendorName,
    VendorCompany:VendorCompany,
    VendorAddress:VendorAddress,
    VendorGST:VendorGST,
    VendorMobile:VendorMobile,
    VendorEmail:VendorEmail,
    VendorService:VendorService
    
  };
  const sendData = appendData(serverData);
  const onSubmit = () => {
    // const serverData = new FormData()
    // for (var key in data) {
    //   serverData.append(key, data[key]);
    // }
    if (!navigator.onLine) {
      setMessage("Your internet is in Offline");
      setOpen(true);
      setStatus(false);
      setColor(false);
    } else {
      axios({
        method: methodPost,
        url: addvendor,
        data: sendData,
      })
        .then((res) => {
          if (res.data.error) {
            setMessage(res.data.message);
            setOpen(true);
            setStatus(false);
            setColor(false);
          } else {
            setMessage(res.data.message);
            setOpen(true);
            setStatus(true);
            setColor(true);
          }
        })
        .catch((err) => {
          alert("Oops something went wrong " + err);
        });
    }
  };

  return (
    <Box autoComplete="off">
      <Box sx={{ px: 4, py: 4 }}>
        <h3>ADD VENDOR</h3>
      </Box>

      <SnackBar
        open={open}
        message={message}
        setOpen={setOpen}
        status={status}
        color={color}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            px: 5,
            py: 5,
            backgroundColor: "white",
            mx: 5,
            mb: 4,
            borderRadius: "5px",
            ":hover": { boxShadow: 2 },
          }}
          component={Card}
        >
          <Grid
            container
            justifyContent="center"
            sx={{ textAlign: "center", pt: 3 }}
            spacing={2}
          >
            <Grid item lg={12} xl={10} xs={12}>
              <Grid
                container
                justifyContent="center"
                sx={{ textAlign: "center" }}
                spacing={2}
              >
                <Grid item lg={8} xl={7}>
                  <Grid container justifyContent="space-evenly" spacing={3}>
                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="vendorName"
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorName ? true : false}
                        helperText={
                          errors.VendorName &&
                          errors.VendorName.type === "required"
                            ? "Vendor Name is required"
                            : ""
                        }
                        onChange={(e) => setVendorName(e.target.value)}
                        size="small"
                      />
                    </Grid>

                    {/* </Grid>
                        <Grid container justifyContent='center' > */}

                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="company"
                        label="Company Name"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorCompany ? true : false}
                        helperText={
                          errors.VendorCompany &&
                          errors.VendorCompany.type === "required"
                            ? "Vendor Company is required"
                            : ""
                        }
                        onChange={(e) => setVendorCompany(e.target.value)}
                        size="small"
                      />
                    </Grid>

                    {/* </Grid>
                        <Grid container justifyContent='center'> */}
                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="address"
                        label="Address"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorAddress ? true : false}
                        helperText={
                          errors.VendorAddress &&
                          errors.VendorAddress.type === "required"
                            ? "Vendor Address is required"
                            : ""
                        }
                        onChange={(e) => setVendorAddress(e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="gst"
                        label="GST"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorGST ? true : false}
                        helperText={
                          errors.VendorGST &&
                          errors.VendorGST.type === "required"
                            ? "Vendor GST is required"
                            : ""
                        }
                        onChange={(e) => setVendorGST(e.target.value)}
                        size="small"
                      />
                    </Grid>

                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorMobile ? true : false}
                        helperText={
                          errors.VendorMobile &&
                          errors.VendorMobile.type === "required"
                            ? " Vendor Mobile is required"
                            : ""
                        }
                        onChange={(e) => setVendorMobile(e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="vendoremail"
                        label="Email"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorEmail ? true : false}
                        helperText={
                          errors.VendorEmail &&
                          errors.VendorEmail.type === "required"
                            ? "Vendor Email is required"
                            : ""
                        }
                        onChange={(e) => setVendorEmail(e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      lg={5}
                      sm={4}
                      xl={6}
                      xs={11}
                      md={4}
                      sx={{ py: 2 }}
                    >
                      <TextField
                        fullWidth
                        id="vendorservice"
                        label="Service"
                        variant="outlined"
                        color="secondary"
                        error={errors.VendorService ? true : false}
                        helperText={
                          errors.VendorService &&
                          errors.VendorService.type === "required"
                            ? "Vendor Service is required"
                            : ""
                        }
                        onChange={(e) => setVendorService(e.target.value)}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
            <Grid item lg={6} xl={4} xs={12}>
              <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item lg={4} sm={4} xl={4} xs={4} md={4} sx={{ py: 2 }}>
                  <Stack spacing={2} direction="row">
                    <Button
                      fullWidth
                      variant="outlined"
                      type="submit"
                      sx={{
                        color: "white",
                        backgroundColor: "#7bc54c",
                        borderColor: "#7bc54c",
                        ":hover": { borderColor: "#7bc54c", color: "black" },
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Box>
  );
}
