import React from "react";
import { Box, Grid } from "@mui/material";
import Heading from "./Comps/Heading";
import logo from "./Assets/loader.gif";

function MainDashboard() {
  return (
    <Box sx={{ p: 3}} >
     
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <img src={logo} />
        </Box>
      </Grid>
    </Box>
  );
}

export default MainDashboard;
