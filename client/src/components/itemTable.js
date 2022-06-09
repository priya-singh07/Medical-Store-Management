import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../assets/constants/backendURL';
import Button from '../components/controls/Button';
import { TableBody, TableRow, TableCell, Grid, InputAdornment, Box, CircularProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useTable from '../components/useTable';
import { Search } from '@material-ui/icons';
import Controls from '../components/controls/Controls';

const ItemTable = (props) => {
    const [data, setData] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(true);

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
        { id: 'action', label: 'Action' }
    ]

    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            const url = `${BACKEND_URL}/billing/${props.invoice_id}`
            const result = await axios.get(url)
            if (result.data.status) {
                if (isSubscribed) {
                setData(result.data.result)
                setLoading(false);
                }
            }
        }

        fetchData()
        if (data.length > 0) {
            setIsSearch(true)
        }
        return () => (isSubscribed = false)

    }, [data, setData, props.invoice_id])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(data, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
            }
        })
    }

    const deleteItem = async (id) => {
        const url = `${BACKEND_URL}/billing/delete/${id}`;
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
            <Grid style={{ textAlign: 'right' }}>
                {isSearch && <Controls.Input
                    label="Search Medicine"
                    InputProps={{
                        startAdornment: (<InputAdornment position="start">
                            <Search />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />}
            </Grid>
            {!loading ? (
                recordsAfterPagingAndSorting().length > 0 ? (
                    <>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, key) =>
                                    (<TableRow key={key}>
                                        <TableCell>{key + 1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.refno}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.sgst}</TableCell>
                                        <TableCell>{item.cgst}</TableCell>
                                        <TableCell>{item.discount}</TableCell>
                                        <TableCell>{item.rate.toFixed(2)}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>{item.expiry_date}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" size="small" style={{ color: 'red', borderColor: 'red' }} onClick={() => deleteItem(item.id)} icon={<DeleteIcon size="small" />} text="Delete" />
                                        </TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </>
                ) : (
                    <h1 style={{ textAlign: 'center', marginTop: '50px' }}>No item added</h1>
                )) : (
                    <Box style={{display: 'flex', justifyContent: 'center', marginTop: '60px'}}>
                        <CircularProgress />
                    </Box>
                )}
        </>
    )
}

export default ItemTable