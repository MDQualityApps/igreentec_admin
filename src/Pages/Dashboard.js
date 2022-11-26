import React from "react";
import { Box, Grid } from "@mui/material";
import Heading from "./../Comps/Heading";
import logo from "./../Assets/loader.gif";

function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ pb: 3 }}>
        <Heading title={"Dashboard"} />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ justifyContent: "center" }}>
          <img src={logo} />
        </Box>
      </Grid>
    </Box>
  );
}

export default Dashboard;
