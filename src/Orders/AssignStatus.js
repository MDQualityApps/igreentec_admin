import React, { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { getsingleproject, methodPost } from "../Api/Api";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { procureorder } from "../Api/Variables";



function AssignStatus({projectid}) {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [refreshpage, setrefreshpage] = useState("");
  const [isloading, setIsloading] = useState(false);
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


  const controller = new AbortController();
  const signal = controller.signal;
  const [data, setData] = useState([]);
  const projectno = new FormData();
  projectno.append("ProjectId", projectid);

  useEffect(() => {
    if (!navigator.onLine) {
      alert("Your internet is in Offline")
    } else {
      axios({
        method: methodPost,
        url: getsingleproject,
        data: projectno,
        signal: signal
      }).then(res => {
        if (res.data.data !== undefined) {
          setData(res.data.data);
          setIsloading(true);
          setrefreshpage(false);
        } else {
          setIsloading(true)
      
        }
      }).catch(err => {
        console.log(err)
      });
    }
    return () => controller.abort();
  }, [refreshpage] );
 
 
  return (
    <>
    <Box>
      <Box sx={{ mx:5 }}>
       <h3>ASSIGN STATUS</h3>
      </Box>

    <Box sx={{ mx:5, my:5 }} component={Card}>
        <TableContainer>
          <Table>
            <TableHead sx={{ whiteSpace: "nowrap" }}>
            <TableRow sx={{ textAlign: "center"}}>
                {procureorder.map((hd) => (
                  <StyledTableCell
                    key={hd.id}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent:'center',alignItems:'center'  }}>
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
            {
        [data].map((order) =>
            
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
                    <StyledTableCell sx={{ textAlign: "center" }}>
                      {order.ProjectName}
                    </StyledTableCell>
                   
                   
                  </StyledTableRow>
                 )}
                
            </TableBody>
          </Table>
        </TableContainer>
    
    </Box> 
      </Box>
    </>
  );
  }


export default AssignStatus;


    
    
    
    
    
    