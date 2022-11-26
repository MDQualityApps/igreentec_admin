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
  tableCellClasses,

} from "@mui/material";
import { emporderdetails } from "../Api/Variables";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { filterEmpOrders } from "../Comps/FilterData";
import Filter from "../Comps/Filter";


function UserOrderTable({data,subpage}) {
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


  return (
    <Box >
   
      <Box sx={{ py: 3, px:5}}>
       <h1>Order Details</h1>
      </Box>

      <Box sx={{ p: 2, m:5 }} component={Card}>
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
                            id:order.id,
                           
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

  );
  }

export default UserOrderTable;

