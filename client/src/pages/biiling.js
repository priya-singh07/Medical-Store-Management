import { Card, Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Controls from '../components/controls/Controls';
import { Form, useForm } from '../components/useForm';
import { BACKEND_URL } from '../assets/constants/backendURL';
import axios from 'axios';
import { useAlert } from 'react-alert';
import '../styles/billing.css'
import ItemTable from '../components/itemTable';
import Button from '../components/controls/Button';
import BillPage from './billPage';
import Navbar from '../components/navbar';

const Billing = () => {

    const alert = useAlert()
    const [start, setStart] = useState(true);
    const [invoiceid, setInvoiceId] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);
    const [qty, setQty] = useState(1);
    const [data, setData] = useState([]);
    const [calculate, setCalculate] = useState(true);

    const [bills, setBills] = useState([]);

    useEffect(() => {
        let isSubscribed = true;
        const fetchItems = async () => {
            const url = `${BACKEND_URL}/stocks/all`
            const result = await axios.get(url);
            if (result.data.status) {
                if (isSubscribed)
                    setData(result.data.result)
            }
        }

        fetchItems();
        return () => (isSubscribed = false)

    }, [data, setData])

    const formData = {
        med_id: '',
        name: '',
        quantity: '',
        price: '',
        discount: '',
        cgst: '',
        sgst: '',
        refno: '',
        rate: '',
        amount: '',
        expiry_date: ''
    }

    const [contacts, setContacts] = useState({
        cust_name: '',
        contact: '',
        address: '',
        seller_name: '',
        seller_address: '',
        seller_contact: '',
    })

    const [contError, setContError] = useState({
        cust_nameError: '',
        cust_contactError: '',
        seller_nameError: '',
        seller_addressError: '',
        seller_contactError: ''
    })

    const { cust_nameError, cust_contactError, seller_addressError, seller_contactError, seller_nameError } = contError;

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('refno' in fieldValues)
            temp.refno = fieldValues.refno ? "" : "This field is required."
        if ('cgst' in fieldValues)
            temp.cgst = fieldValues.cgst ? "" : "This field is required."
        if ('sgst' in fieldValues)
            temp.sgst = fieldValues.sgst ? "" : "This field is required."
        if ('discount' in fieldValues)
            temp.discount = fieldValues.discount ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const validateContacts = (fieldValues = contacts) => {
        let temp = { ...contError }
        if ('cust_name' in fieldValues)
            temp.cust_nameError = fieldValues.cust_name ? "" : "This field is required."
        if ('contact' in fieldValues)
            temp.cust_contactError = fieldValues.contact ? "" : "This field is required."
        if ('seller_name' in fieldValues)
            temp.seller_nameError = fieldValues.seller_name ? "" : "This field is required."
        if ('seller_contact' in fieldValues)
            temp.seller_contactError = fieldValues.seller_contact ? "" : "This field is required."
        if ('seller_address' in fieldValues)
            temp.seller_addressError = fieldValues.seller_address ? "" : "This field is required."
        setContError({
            ...temp
        })

        if (fieldValues === contacts)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(formData, true, validate);

    const handleInputName = async (e) => {
        const url = `${BACKEND_URL}/billing/getdetailsbyname/${e.target.value}`
        const result = await axios.get(url);
        if (result.data.status) {
            const priceval = result.data.price;
            setValues({ ...values, price: priceval, med_id: result.data.id, name: e.target.value, expiry_date: '' })
            setQty(result.data.result[0].quantity)
            validate({ [e.target.name]: e.target.value })
            if (result.data.result[0].expiry_date) {
                setValues({ ...values, price: priceval, med_id: result.data.id, name: e.target.value, expiry_date: result.data.result[0].expiry_date })
                setQty(result.data.result[0].quantity)
                validate({ [e.target.name]: e.target.value })
            }
        }
    }

    const handleInputQuantity = (e) => {
        if (values.name !== '') {
            setValues({ ...values, [e.target.name]: e.target.value, rate: values.price * e.target.value });
            validate({ [e.target.name]: e.target.value })
        }
        else {
            alert.error("Enter medicine name first")
        }
    }

    const handleCalculate = (e) => {
        e.preventDefault();
        if (validate() && values.quantity<=qty) {
            const amt = values.rate + (values.rate) / 100 * (values.cgst + values.sgst - values.discount);
            setValues({ ...values, amount: amt.toFixed(2) })
            setCalculate(false);
        }
        else if(values.quantity > qty) {
            alert.error("Quantity is greater")
        }
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
        if (validate() && validateContacts()) {
            if (invoiceid) {
                const url = `${BACKEND_URL}/billing/add`;
                const body = {
                    med_id: values.med_id,
                    name: values.name,
                    invoice_id: invoiceid,
                    cgst: values.cgst * 1,
                    sgst: values.sgst * 1,
                    quantity: values.quantity * 1,
                    price: values.price,
                    discount: values.discount * 1,
                    refno: values.refno,
                    rate: values.rate,
                    amount: values.amount,
                    expiry_date: values.expiry_date
                }
                const result = await axios.post(url, body)
                if (result.data.status) {
                    alert.success("Item added into the cart")
                }
                else {
                    alert.error("Something went wrong")
                }
                resetForm()
                setCalculate(true)
            }
            else {
                alert.error("Please click on Start Button to begin")
            }
        }
    }

    const handleResetForm = () => {
        resetForm();
        setCalculate(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateContacts()) {
            const url = `${BACKEND_URL}/invoices/add`;
            const body = {
                cust_name: contacts.cust_name,
                cust_contact: contacts.contact,
                cust_address: contacts.address,
                seller_name: contacts.seller_name,
                seller_contact: contacts.seller_contact,
                seller_address: contacts.seller_address,
            }
            const result = await axios.post(url, body)
            if (result.data.status) {
                setInvoiceId(result.data.insertedId);
                setStart(false);
            }
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        if (validateContacts()) {
            const url = `${BACKEND_URL}/invoices/edit`;
            const body = {
                id: invoiceid,
                cust_name: contacts.cust_name,
                cust_contact: contacts.contact,
                cust_address: contacts.address,
                seller_name: contacts.seller_name,
                seller_contact: contacts.seller_contact,
                seller_address: contacts.seller_address,
            }
            const result = await axios.post(url, body)
            if (result.data.status) {
                console.log("Edited");
            }
            else {
                alert.error("Something went wrong")
            }
        }
    }

    const handleInputChangeContacts = (e) => {
        setContacts({ ...contacts, [e.target.name]: e.target.value })
        validateContacts({ [e.target.name]: e.target.value })
    }

    const fetchBills = async () => {
        const url = `${BACKEND_URL}/billing/${invoiceid}`
        const result = await axios.get(url)
        if (result.data.status) {
            setBills(result.data.result)
            setShowInvoice(true)
        }
    }

    return (
        <>
            {!showInvoice && <Navbar />}
            {!showInvoice && (
                <Card className='container'>
                    <Typography variant='h5'>
                        Enter few details to start
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <div style={{ marginTop: '20px' }}><b>Shop's details</b></div>
                        <Grid container>
                            <Grid item xs={4}>
                                <Controls.Input label="Your Name"
                                    name="seller_name"
                                    value={contacts.seller_name}
                                    onChange={handleInputChangeContacts}
                                    error={seller_nameError}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Input label="Your Contact"
                                    name="seller_contact"
                                    value={contacts.seller_contact}
                                    onChange={handleInputChangeContacts}
                                    error={seller_contactError}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Input label="Your Address"
                                    name="seller_address"
                                    value={contacts.seller_address}
                                    onChange={handleInputChangeContacts}
                                    error={seller_addressError}
                                />
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: '20px' }}><b>Client's details</b></div>
                        <Grid container>
                            <Grid item xs={4}>
                                <Controls.Input label="Client's Name"
                                    name="cust_name"
                                    value={contacts.cust_name}
                                    onChange={handleInputChangeContacts}
                                    error={cust_nameError}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Input label="Client's Contact"
                                    name="contact"
                                    value={contacts.contact}
                                    onChange={handleInputChangeContacts}
                                    error={cust_contactError}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Controls.Input label="Client's Address"
                                    name="address"
                                    value={contacts.address}
                                    onChange={handleInputChangeContacts}
                                />
                            </Grid>
                        </Grid>
                        <Grid className='grid'>
                            <Controls.Button
                                type="submit"
                                text={start ? "Start" : "Edit"}
                                onClick={start ? handleSubmit : handleEdit} />
                        </Grid>
                    </Form>
                </Card>
            )}
            { !showInvoice && (
                <Card className='container'>
                    <Typography variant='h5'>
                        Enter order details to make a new bill
                    </Typography>
                    <Form onSubmit={handleSubmitOrder}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Controls.Select label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleInputName}
                                    error={errors.name}
                                    options={data}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="Price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleInputChange}
                                    error={errors.price}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="Reference Number"
                                    name="refno"
                                    value={values.refno}
                                    onChange={handleInputChange}
                                    error={errors.refno}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="Expiry Date"
                                    name="expiry_date"
                                    value={values.expiry_date}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={3}>
                                <Controls.Input label="Quantity"
                                    name="quantity"
                                    value={values.quantity}
                                    type='number'
                                    onChange={handleInputQuantity}
                                    error={errors.quantity}
                                    InputProps={{
                                        inputProps: { 
                                            max: qty,
                                            min: 1 
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="CGST"
                                    name="cgst"
                                    value={values.cgst}
                                    onChange={handleInputChange}
                                    error={errors.cgst}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="SGST"
                                    name="sgst"
                                    value={values.sgst}
                                    onChange={handleInputChange}
                                    error={errors.sgst}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Controls.Input label="Discount"
                                    name="discount"
                                    value={values.discount}
                                    onChange={handleInputChange}
                                    error={errors.discount}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Controls.Input label="Rate"
                                    name="rate"
                                    value={values.rate}
                                    onChange={handleInputChange}
                                    error={errors.rate}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Controls.Input label="Amount"
                                    name="amount"
                                    value={values.amount}
                                    onChange={handleInputChange}
                                    error={errors.amount}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid className='grid'>
                            <Controls.Button
                                type="submit"
                                text={calculate ? "Calculate Amount" : "Add Item"}
                                onClick={calculate ? handleCalculate : handleSubmitOrder} />
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={handleResetForm} />
                        </Grid>
                    </Form>
                    <ItemTable invoice_id={invoiceid} cust_details={values} />
                    <Button variant="outlined" onClick={fetchBills} text="Make a bill" />
                </Card>
            )}
            {showInvoice && (
                <>
                    <BillPage cust_details={contacts} items={bills} />
                    <Button variant="outlined" onClick={() => setShowInvoice(false)} text="Back" color="default" />
                </>)}
        </>
    )
}

export default Billing