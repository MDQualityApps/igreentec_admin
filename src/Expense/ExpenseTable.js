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
  tableCellClasses
} from "@mui/material";
import { expensehead } from "../Api/Variables";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


function ExpenseTable({data}) {
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
       <h3>EXPENSE DETAILS</h3>
      </Box>

      <Box component={Card}>
        <TableContainer>
          <Table>
            <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow>
                {expensehead.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                  <StyledTableRow>
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

export default ExpenseTable;

