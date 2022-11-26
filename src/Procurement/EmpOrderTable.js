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


import Statusloader from "../Comps/Statusloader";
import { methodGet, getorderdetails } from "../Api/Api";
import { emporderdetails, orderdetails } from "../Api/Variables";
import useFetch from "../Api/useFetch";
import styled from "@emotion/styled";
import { Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Filter from "../Comps/Filter";
import { filterEmpOrders } from "../Comps/FilterData";



function EmpOrderTable({data,subpage}) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
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
  

//   if (!isloading) {
//     return <Statusloader />;
//   } else {
 
  return (
    <>
    <Box>
      <Box sx={{ py: 3 }}>
       <h1>Order Status</h1>
      </Box>

      <Box sx={{ p: 2 }} component={Card}>
        <TableContainer>
        <Table>
            <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow>
                {emporderdetails.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                     <Box justifyContent="center" sx={{ display: 'flex' }}>
                      <Box sx={{ my: "auto" }}>{hd.name}</Box>
                      <Box>
                        {hd.filter ? (
                          <Filter
                            search={search}
                            label={hd.name}
                            setSearch={setSearch}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                      </Box>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {data.filter((data) => filterEmpOrders(data, search, {
                                    searchFeildOne: data.AssignedOn,
                                    searchFeildTwo: data.DueDate,
                                    searchFeildThree: data.ProjectStatus
                                })).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <StyledTableRow  key={order.id} sx={{ cursor: 'pointer' }} 
                  onClick={() => {
                    navigate(subpage, {
                        state: {
                            id:order.ProjectId,
                           
                        }  
                    });
                }}   
                >
                   <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.OrderNum}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.AssignedOn}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.DueDate}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectStatus}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.Remarks}
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
    </>
  );
  }
// }

export default EmpOrderTable;

