import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../components/controls/Button'

const BillPage = (props) => {

    const headCells = [
        { id: 'sno', label: 'S.No.' },
        { id: 'name', label: 'Name' },
        { id: 'refno', label: 'Ref. No.' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'price', label: 'Price' },
        { id: 'cgst', label: 'CGST' },
        { id: 'sgst', label: 'SGST' },
        { id: 'discount', label: 'Discount' },
        { id: 'rate', label: 'Rate' },
        { id: 'amount', label: 'Amount' },
        { id: 'expiry_date', label: 'Expiry Date' },
    ]

    return (
        <>
            <Row style={{ marginTop: 48 }}>
                <Col >
                    <h3>{props.cust_details.seller_name}</h3>
                    <h5>{props.cust_details.seller_contact}</h5>
                    <h5>{props.cust_details.seller_address}</h5>
                </Col>
                <Col>
                    <div>Bill To: <strong>{props.cust_details.cust_name}</strong></div>
                    <div>{props.cust_details.contact}</div>
                    <div>{props.cust_details.address}</div>
                </Col>
            </Row>
            <Row style={{ marginTop: 48 }}>
                <Col>
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
                            {props.items.map((row, index) => {
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
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col xs={8}>
                    <h4>Due Date: date</h4>
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col>Total: </Col>
                        <Col>total_amt</Col>
                    </Row>
                    <Row>
                        <Col>Amount of Discount: </Col>
                        <Col>total_discount</Col>
                    </Row>
                    <Row>
                        <Col>Amount of CGST charged: </Col>
                        <Col>cgst_charged</Col>
                    </Row>
                    <Row>
                        <Col>Amount of SGST charged: </Col>
                        <Col>sgst_charged</Col>
                    </Row>
                    <Row>
                        <Col>Total Invoice: </Col>
                        <Col>total_invoice</Col>
                    </Row>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <p style={{ textAlign: 'right', marginRight: '50px', marginTop: '40px' }}>Shop Signature</p>
                </Col>
            </Row>
            <Button variant="outlined" onClick={() => window.print()} text="Print" />
        </>
    )
}

export default BillPage