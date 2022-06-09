import * as React from 'react';
import { AppBar, Button, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            color: 'white',
         },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        zIndex: 9999
    },
}))

export default function Navbar(props) {
    const classes = useStyles();
    const { logout } = useAuth();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to='/dashboard' className={classes.grow}> 
                    <Typography variant="h6" color="inherit" >
                        MEDICAL STORE
                    </Typography>
                    </Link>
                    <Button color="inherit" onClick={(e) => {
                        logout()
                    }}>LOGOUT</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
