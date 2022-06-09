import React, { useEffect, useState } from 'react'
import AddOutOfStock from "./addOutOfStocks";
import PageHeader from "../components/PageHeader";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Grid, InputAdornment, Box, CircularProgress } from '@material-ui/core';
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";
import ShopIcon from '@material-ui/icons/Shop';
import { BACKEND_URL } from '../assets/constants/backendURL';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useAlert } from 'react-alert';
import Button from '../components/controls/Button';
import Navbar from '../components/navbar';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '60%',
    },
    grid: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto 15px'
    }
}))



const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'price', label: 'Price' },
    { id: 'action', label: 'Action' }
]

const ViewOutOfStock = () => {
    const classes = useStyles();
    const alert = useAlert();
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isAdd, setIsAdd] = useState(false);
    const [isClose, setIsClose] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [data, setData] = useState({
        name: '',
        price: '',
        id: ''
    })

    useEffect(() => {
        let isSubscribed = true;
        const fetchItems = async () => {
            const url = `${BACKEND_URL}/outofstocks/all`
            const result = await axios.get(url);
            if (result.data.status) {
                if (isSubscribed) {
                    setRecords(result.data.result)
                    setLoading(false);
                }
            }
        }

        fetchItems();
        if(records.length > 0) {
            setIsSearch(true)
        }
        return () => (isSubscribed = false)

    }, [records, setRecords])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

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

    const editItem = (item) => {
        setData({ name: item.name, price: item.price, id: item.id })
        setIsAdd(true)
        setIsClose(false)
        setIsEdit(true)
    }

    const deleteItem = async (id) => {
        const url = `${BACKEND_URL}/outofstocks/${id}`;
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
            <Navbar/>
            <PageHeader
                title="Out of Stock items"
                subTitle="Add or View the list"
                icon={<ShopIcon fontSize="medium" />}
            />
            <Paper className={classes.pageContent}>
                {isAdd && <AddOutOfStock name={data.name} price={data.price} isEdit={isEdit} id={data.id} />}
                {!isClose && <Controls.Button
                    text="Close"
                    color="default"
                    onClick={() => {
                        setIsClose(true)
                        setIsAdd(false)
                        setData({name: '', price: '', id: ''})
                    }} />}
                <Grid className={classes.grid}>
                    <Grid item xs={6}>
                        {!isAdd && <Controls.Button
                            type="button"
                            text="Add Items"
                            onClick={() => {
                                setIsAdd(true)
                                setIsEdit(false)
                                setIsClose(false);
                            }} />}
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                        {isSearch && <Controls.Input
                            label="Search Medicine"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />}
                    </Grid>
                </Grid>
                {
                    !loading ? (recordsAfterPagingAndSorting().length > 0 ? (
                        <>
                            <TblContainer>
                                <TblHead />
                                <TableBody>
                                    {
                                        recordsAfterPagingAndSorting().map((item, key) =>
                                        (<TableRow key={key}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" size="small" onClick={() => editItem(item)} icon={<EditIcon size="small"/>} text="Edit" />
                                                <Button variant="outlined" size="small" style={{color: 'red', borderColor: 'red'}} onClick={() => deleteItem(item.id)} icon={<DeleteIcon size="small"/>} text="Delete" />
                                            </TableCell>
                                        </TableRow>)
                                        )
                                    }
                                </TableBody>
                            </TblContainer>
                            <TblPagination />
                        </>
                    ) : (
                        <h1 style={{textAlign: 'center', marginTop: '50px'}}>Nothing out of stock</h1>
                    )) : (
                        <Box style={{display: 'flex', justifyContent: 'center', marginTop: '60px'}}>
                            <CircularProgress />
                        </Box>
                    )}
            </Paper>
        </>
    )
}

export default ViewOutOfStock