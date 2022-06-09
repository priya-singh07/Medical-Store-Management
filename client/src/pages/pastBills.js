import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableRow, TableHead, Card, CircularProgress, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navbar from '../components/navbar'
import { BACKEND_URL } from '../assets/constants/backendURL';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '../components/controls/Button';
import { Col, Container, Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const PastBills = () => {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);
    const [expanded, setExpanded] = useState(false)
    const [loading, setLoading] = useState(true);
    const [billsloading, setBillsloading] = useState(true);

    const headCells = [
        { id: 'sno', label: 'S.No.' },
        { id: 'name', label: 'Name' },
        { id: 'refno', label: 'Reference No.' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'price', label: 'Price' },
        { id: 'sgst', label: 'SGST' },
        { id: 'cgst', label: 'CGST' },
        { id: 'discount', label: 'Discount' },
        { id: 'rate', label: 'Rate' },
        { id: 'amount', label: 'Amount' },
        { id: 'expiry_date', label: 'Expiry Date' },
    ]

    useEffect(() => {
        let isSubscribed = true;
        const fetchInvoices = async () => {
            const url = `${BACKEND_URL}/invoices/all`;
            const result = await axios.get(url);
            if (result.data.status) {
                if (isSubscribed) {
                    setData(result.data.result)
                    setLoading(false);
                }
            }
        }
        fetchInvoices();
        return () => (isSubscribed = false)
    }, [data, setData]);

    const fetchRecords = async (id) => {
        const url = `${BACKEND_URL}/billing/${id}`
        const result = await axios.get(url);
        if (result.data.status) {
            setRecords(result.data.result)
            setBillsloading(false);
        }
    }

    const handleChange = (id) => (event, isExpanded) => {
        setBillsloading(true)
        setExpanded(isExpanded ? id : false);
        fetchRecords(id)
    };

    const deleteItem = async (id) => {
        const url = `${BACKEND_URL}/invoices/delete/${id}`;
        const result = await axios.delete(url);
        if (result.data.status) {
            alert.success("Item Deleted")
        }
        else {
            console.log(result.data.message);
        }
    }

    return (
        <>
            <Navbar />
            <Card className='container'>
                {!loading ? (data.length > 0 ? data.map((item, index) => {
                    return (
                        <Accordion key={index} expanded={expanded === item.id} onChange={handleChange(item.id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id={index + 1}
                            >
                                <Container>
                                <Row>
                                <Col xs={4} className={classes.heading}>{item.date.slice(0, 10)}</Col>
                                <Col xs={4}>{<b>Bill to: </b>}{`${item.cust_name}, ${item.cust_contact}`}{item.cust_address !== null && `, ${item.cust_address}`}</Col>
                                <Col xs={4} style={{textAlign: 'right'}}>
                                <Button variant="outlined" size="small" style={{ color: 'red', borderColor: 'red' }} onClick={() => deleteItem(item.id)} icon={<DeleteIcon size="small" />} text="Delete" />
                                </Col>
                                </Row>
                                </Container>
                            </AccordionSummary>
                            <AccordionDetails>
                                {!billsloading ? (records.length > 0 ? (
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                {
                                                    headCells.map(headCell => (
                                                        <TableCell key={headCell.id}>
                                                            {headCell.label}
                                                        </TableCell>))
                                                }
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {records.map((row, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.refno}</TableCell>
                                                        <TableCell>{row.quantity}</TableCell>
                                                        <TableCell>{row.price}</TableCell>
                                                        <TableCell>{row.cgst}</TableCell>
                                                        <TableCell>{row.sgst}</TableCell>
                                                        <TableCell>{row.discount}</TableCell>
                                                        <TableCell>{row.rate.toFixed(2)}</TableCell>
                                                        <TableCell>{row.amount}</TableCell>
                                                        <TableCell>{row.expiry_date}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p>No bills</p>
                                )) : (
                                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                                        <CircularProgress />
                                    </Box>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )
                }) : (
                    <p>No invoice made</p>
                )) : (
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Card>
        </>
    );
}

export default PastBills