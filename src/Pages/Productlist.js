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
  tableCellClasses
} from "@mui/material";
import { productdetails } from "../Api/Variables";
import styled from "@emotion/styled";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router";
import { productpath } from "../Api/Api";


function Productlist({data,subpage}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

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
  // Generate Qrcode
  const [imageUrl, setImageUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();



  return (
    <>
     <Box sx={{ px: 5 }} >
       <h3>INVENTORY</h3>
      </Box>
      <Box sx={{ m:5 }} component={Card}>
     
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "secondary.main", whiteSpace: "nowrap" }}>
            <TableRow>
                {productdetails.map((hd) => (
                  <TableCell
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
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {data
                
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => (
                  <StyledTableRow  key={product.ProductId} sx={{ cursor: 'pointer' }} 
                  onClick={() => {
                    navigate(subpage, {
                        state: {
                            id:product.ProductId,
                           
                        }
                    });
                }}   
                >
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdDescp}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      <img src={`${productpath}`+product.ProdPhotos} width='100' height='100' alt='product images'/>
                      {console.log(`${productpath}`+product.ProdPhotos)}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdQty}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdQlty}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdStock}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.ProdPrice}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {product.DiscPrice}
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                    <EditIcon >
                    </EditIcon>
                    </StyledTableCell>
                    <StyledTableCell sx={{ textAlign: "center" }}>
                     <DeleteIcon></DeleteIcon>
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
    </>
  );
  }

export default Productlist;