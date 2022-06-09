import { Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../components/controls/Button'

const BillPageDemo = () => {

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
        <div className='m-3'>
            <Row style={{ marginTop: 48 }}>
                <Col >
                    <h3>seller_name</h3>
                    <h5>seller_contact</h5>
                    <h5>seller_address</h5>
                </Col>
                <Col>
                    <div>Bill To: <strong>cust_name</strong></div>
                    <div>contact</div>
                    <div>address</div>
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
                                            <b>{headCell.label}</b>
                                        </TableCell>))
                                }
                            </TableRow>
                        </TableHead>
                    </Table>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col>
                    <h4>Due Date: date</h4>
                </Col>
                <Col>
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
                    <p style={{textAlign: 'right', marginRight: '50px', marginTop: '40px'}}>Shop Signature</p>
                </Col>
            </Row>
            <Button variant="outlined" onClick={() => window.print()} text="Print" />
        </div>
    )
}

export default BillPageDemo