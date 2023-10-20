import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useCont } from '../../context/MyContext';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function Profile() {
    
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [orders, setOrders] = useState([]);
    const { getOrders } = useCont();

    useEffect (() => {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
            navigate("/");
        }
        setUser(jwt_decode(jwtToken));
        getOrders();
        if (JSON.parse(localStorage.getItem("orders")).length !== 0) {
            setOrders(JSON.parse(localStorage.getItem("orders")));
        } else {
        }

    }, []);

    function orderSection () {
        if (JSON.parse(localStorage.getItem("orders")).length !== 0) {
            return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                        <StyledTableCell align="right">Calories</StyledTableCell>
                        <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                        <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {user.orders.map((row) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )
        } else {
            return (
                <div className="d-flex flex-column">
                    <span>You didn't ordered anything yet!</span>
                    <h6 className="mb-3 mt-2" onClick={() => { navigate("/store") }} style={{cursor: "pointer"}}>
                        <a className="text-body link-underline link-underline-opacity-0">
                          <HiArrowNarrowLeft style={{marginRight: "5px"}} />
                          Continue Shopping
                        </a>
                    </h6>
                </div>
            )
        }
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    
    return (
        <>
            <section>
                <div style={{ backgroundColor: '#eee' }}>
                    <MDBContainer className="container py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol md="12" xl="4">
                                <MDBCard style={{ borderRadius: '15px' }}>
                                    <MDBCardBody className="text-center">
                                        <div className="mt-3 mb-4">
                                                <MDBCardImage src="./src/assets/images/profile-icon-men.png"
                                                className="rounded-circle" fluid style={{ width: '100px' }} />
                                        </div>
                                        <MDBTypography tag="h4" id="fullname">{user.username}</MDBTypography>
                                        <MDBCardText className="text-muted mb-4">
                                            <span id="email">{user.email}</span>
                                        </MDBCardText>
                                        <hr />
                                        <div className="d-flex flex-column justify-content-center text-center mt-1 mb-2">
                                            <h5 className="link-success">Your Orders</h5>
                                            <div className="d-flex justify-content-center text-center mt-1 mb-2">
                                                {orderSection()}
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </section>
        </>
    )
}