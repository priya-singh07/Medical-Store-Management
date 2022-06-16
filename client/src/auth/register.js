import React, { useState } from 'react'
import '../styles/register.css'
import google from '../assets/images/google.svg'
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAlert } from 'react-alert'
import { useAuth } from '../contexts/AuthContext'
import { useHistory, Link } from 'react-router-dom'
import useMounted from '../hooks/useMounted'

export default function Login() {

    const alert = useAlert();
    const history = useHistory()
    const mounted = useMounted()

    const { register, signInWithGoogle } = useAuth()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        showPassword1: false,
        showPassword2: false,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { name, email, password, confirm_password } = user;

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [formIsValid, setFormIsValid] = useState(false);

    const handleVisibility1 = () => {
        setUser({ ...user, showPassword1: !user.showPassword1 });
    };

    const handleVisibility2 = () => {
        setUser({ ...user, showPassword2: !user.showPassword2 });
    };

    const handleValidation = () => {
        if (!name.trim().match(/^[a-zA-Z ]+$/)) {
            setFormIsValid(false);
            setNameError("Name must contain only letters");
            return false;
        } else {
            setNameError("");
            setFormIsValid(true);
        }

        if (!email.trim().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            setFormIsValid(false);
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            setFormIsValid(true);
        }

        if (!password.match(/(?=.*[0-9]*['@','#','!','$','%'])/)) {
            setFormIsValid(false);
            setpasswordError(
                "Password must contain a special characters"
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidation();
        if (formIsValid) {
            setIsSubmitting(true);
            await register(email, password)
                .then((response) => {
                    console.log(response);
                    alert.success("Registered successfully")
                    setUser({ ...user, name: "", password: "", email: "", confirm_password: "" })
                })
                .catch((error) => {
                    console.log(error.message);
                    alert.error(error.message)
                })
                .finally(() => {
                    mounted.current && setIsSubmitting(false)
                })
        }
    };

    function handleRedirectToOrBack() {
        history.push('/dashboard')
    }

    return (
        <Grid container className="main">
            <div className="root">
                <Container maxWidth="xs">
                    <h2 style={{ marginTop: "20px", textAlign: "center", color: "black" }}>Medical Store</h2>
                    <hr />
                    <form id="registerform" onSubmit={handleSubmit}>
                        <Input
                            disableUnderline={true}
                            className="input"
                            type="text"
                            id="NameInput"
                            name="name"
                            value={name}
                            aria-describedby="nameHelp"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                        <small id="nameHelp" className="text-danger form-text">
                            {nameError}
                        </small>
                        <Input
                            disableUnderline={true}
                            className="input"
                            type="email"
                            name="email"
                            id="EmailInput"
                            value={email}
                            aria-describedby="emailHelp"
                            placeholder="E-mail"
                            onChange={handleChange}
                        />
                        <small id="emailHelp" className="text-danger form-text">
                            {emailError}
                        </small>
                        <Input
                            disableUnderline={true}
                            className="input"
                            type={user.showPassword1 ? "text" : "password"}
                            name="password"
                            id="exampleInputPassword1"
                            value={password}
                            placeholder="Password"
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
                        />
                        <small id="passworderror" className="text-danger form-text">
                            {passwordError}
                        </small>
                        <Input
                            disableUnderline={true}
                            className="input"
                            type={user.showPassword2 ? "text" : "password"}
                            name="confirm_password"
                            id="exampleInputPassword2"
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
                        />
                        <small id="exampleInputPassword2" className="text-danger form-text">
                            {passwordError}
                        </small>
                        <Grid container justifyContent="center" className="grid mt-2">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="submit"
                            >
                                <p className="signup">{isSubmitting ? "Loading" : "Register"}</p>
                            </Button>
                        </Grid>
                    </form>
                    <p className="login">Already have an account?
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <b className="bold">{" "}Login{" "}</b>
                        </Link>
                        here.</p>
                    <p className="underline"><span className="span">or Register using</span></p>
                    <div className="socialbuttons">
                        <img src={google} className="social" alt="google" onClick={() =>
                            signInWithGoogle()
                                .then(user => {
                                    handleRedirectToOrBack()
                                    console.log(user)
                                })
                                .catch(e => console.log(e.message))} />
                    </div>
                </Container>
            </div>
        </Grid >
    )
}