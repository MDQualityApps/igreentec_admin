import React, { useState } from "react";
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

import { orderdetails } from "../Api/Variables";
import useFetch from "../Api/useFetch";
import styled from "@emotion/styled";
import { Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


function AllOrderTable({data,subpage}) {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
  

  // if (!isloading) {
  //   return <Statusloader />;
  // } else {

  return (
    <Box>
   
      <Box sx={{ pb: 3 }}>
       <h3>ORDER DETAILS</h3>
      </Box>

      <Box component={Card}>
        <TableContainer>
          <Table>
            <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow>
                {orderdetails.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <StyledTableRow  key={order.ProjectId} sx={{ cursor: 'pointer' }} 
                  onClick={() => {
                    navigate(subpage, {
                        state: {
                            id:order.ProjectId,
                           
                        }  
                    });
                }}   
                >
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
                      {order.ProjectDescp}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ExpectDate}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectBudget}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectStart}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectStatus}
                    </StyledTableCell>
                   
                  </StyledTableRow>
                ))}
                
            </TableBody>
          </Table>
        </TableContainer>
       

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          
        />
         
        
      </Box>
     
     
    

    
     
      </Box>

    
  );
  }

export default AllOrderTable;

