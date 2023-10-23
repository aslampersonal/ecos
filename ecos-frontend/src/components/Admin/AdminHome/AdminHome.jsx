import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Widget from "../Widget/Widget";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./AdminHome.css";

export default function AdminHome() {
    
    const rows = [
        {
          id: 1143155,
          product: "Acer Nitro 5",
          img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "John Smith",
          date: "1 March",
          amount: 785,
          method: "Cash on Delivery",
          status: "Approved",
        },
        {
          id: 2235235,
          product: "Playstation 5",
          img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Michael Doe",
          date: "1 March",
          amount: 900,
          method: "Online Payment",
          status: "Pending",
        },
        {
          id: 2342353,
          product: "Redragon S101",
          img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "John Smith",
          date: "1 March",
          amount: 35,
          method: "Cash on Delivery",
          status: "Pending",
        },
        {
          id: 2357741,
          product: "Razer Blade 15",
          img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Jane Smith",
          date: "1 March",
          amount: 920,
          method: "Online",
          status: "Approved",
        },
        {
          id: 2342355,
          product: "ASUS ROG Strix",
          img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
          customer: "Harold Carol",
          date: "1 March",
          amount: 2000,
          method: "Online",
          status: "Pending",
        },
      ];

    return (
        <>
            <div className="home">
                <div className="homeContainer">
                    <div className="widgets">
                        <Widget type="user" />
                        <Widget type="order" />
                        <Widget type="earning" />
                        <Widget type="balance" />
                    </div>
                    <div className="charts">
                        <div className="featured">
                            <div className="top">
                                <h1 className="title">Total Revenue</h1>
                            </div>
                            <div className="bottom">
                                <div className="featuredChart">
                                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                                </div>
                                <div className="featuredtext">
                                    <p className="title">Total sales made today</p>
                                    <p className="amount">$420</p>
                                    <p className="desc">
                                    Previous transactions processing. Last payments may not be included.
                                    </p>
                                </div>
                                <div className="summary">
                                    <div className="item">
                                        <div className="itemTitle">Target</div>
                                        <div className="itemResult negative">
                                            <IoIosArrowDown />
                                            <div className="resultAmount">$12.4k</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">Last Week</div>
                                        <div className="itemResult positive">
                                            <IoIosArrowUp />
                                            <div className="resultAmount">$12.4k</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="itemTitle">Last Month</div>
                                        <div className="itemResult positive">
                                            <IoIosArrowUp />
                                            <div className="resultAmount">$12.4k</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listContainer">
                        <div className="listTitle">Latest Transactions</div>
                        <TableContainer component={Paper} className="table">
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="tableCell">Tracking ID</TableCell>
                                        <TableCell className="tableCell">Product</TableCell>
                                        <TableCell className="tableCell">Customer</TableCell>
                                        <TableCell className="tableCell">Date</TableCell>
                                        <TableCell className="tableCell">Amount</TableCell>
                                        <TableCell className="tableCell">Payment Method</TableCell>
                                        <TableCell className="tableCell">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                    <TableCell className="tableCell">{row.id}</TableCell>
                                    <TableCell className="tableCell">
                                        <div className="cellWrapper">
                                        <img src={row.img} alt="" className="image" />
                                        {row.product}
                                        </div>
                                    </TableCell>
                                    <TableCell className="tableCell">{row.customer}</TableCell>
                                    <TableCell className="tableCell">{row.date}</TableCell>
                                    <TableCell className="tableCell">{row.amount}</TableCell>
                                    <TableCell className="tableCell">{row.method}</TableCell>
                                    <TableCell className="tableCell">
                                        <span className={`status ${row.status}`}>{row.status}</span>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}