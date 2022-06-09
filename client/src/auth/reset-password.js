import React, { useState } from 'react';
import '../styles/resetpass.css';
import { useAlert } from 'react-alert';
import { useHistory, useLocation, Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAuth } from '../contexts/AuthContext';
import useMounted from '../hooks/useMounted';

const ResetPassword = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [user, setUser] = useState({
        password: "",
        confirm_password: "",
        showPassword1: false,
        showPassword2: false
    })

    const mounted = useMounted()

    const alert = useAlert()
    const { resetPassword } = useAuth()

    const { password, confirm_password } = user;

    const handleVisibility1 = () => {
        setUser({ ...user, showPassword1: !user.showPassword1 })
    }

    const handleVisibility2 = () => {
        setUser({ ...user, showPassword2: !user.showPassword2 })
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [passwordError, setpasswordError] = useState("");
    const [formIsValid, setFormIsValid] = useState(false);

    // A custom hook that builds on useLocation to parse the query string for you.
    function useQuery() {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidation();
        if (formIsValid) {
            setIsSubmitting(true)
            await resetPassword(query.get('oobCode'), password)
                .then((res) => {
                    alert.success("Password has been changed. You can login now")
                    history.push('/login')
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err)
                    alert.error(err.message)
                })
                .finally(() => {
                    mounted.current && setIsSubmitting(false)
                })
        }
    };

    const handleValidation = () => {

        if (!password.match(/(?=.*[0-9]*['@','#','!','$','%'])/)) {
            setFormIsValid(false);
            setpasswordError(
                "Password must contain a number and a special characters"
            );
            return false;
        } else {
            setpasswordError("");
            setFormIsValid(true);
        }

        if (password !== confirm_password) {
            setFormIsValid(false);
            setpasswordError("Passwords do not match");
            return false;
        } else {
            setpasswordError("");
            setFormIsValid(true);
        }
    };

    return (
        <Grid container className="main">
            <div className="root">
                <Container maxWidth="xs">
                    <h2 style={{ marginTop: "20px", textAlign: "center" }}>Medical Store</h2>
                    <hr />
                    <p className="forgot">Enter the password that you want for your account.</p>
                    <form id="loginform" onSubmit={handleSubmit}>
                        <Input
                            disableUnderline={true}
                            className="inputrespass"
                            type={user.showPassword1 ? "text" : "password"}
                            id="exampleInputPassword1"
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleVisibility1}
                                    >
                                        {user.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                        />
                        <small id="passworderror" className="text-danger form-text">
                            {passwordError}
                        </small>
                        <Input
                            disableUnderline={true}
                            className="inputrespass"
                            type={user.showPassword2 ? "text" : "password"}
                            id="exampleInputPassword2"
                            name="confirm_password"
                            value={confirm_password}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleVisibility2}
                                    >
                                        {user.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                        />
                        <small id="exampleInputPassword2" className="text-danger form-text">
                            {passwordError}
                        </small>
                        <Grid container justifyContent='center' style={{ marginBottom: "20px" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                <p className="signupreset">{isSubmitting ? 'Loading' : 'Reset'}</p>
                            </Button>
                        </Grid>
                    </form>
                    <p className="underline" style={{ marginTop: '10px' }}><span className="span">or</span></p>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <p className="loginback">Back to <b>login</b></p>
                    </Link>
                </Container>
            </div>
        </Grid>
    )
}

export default ResetPassword