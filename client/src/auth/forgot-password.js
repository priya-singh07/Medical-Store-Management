import React, { useState } from 'react';
import '../styles/forgotpass.css';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/AuthContext';
import useMounted from '../hooks/useMounted';

const ForgotPassword = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState("")
    const [emailError, setemailError] = useState("")
    const { forgotPassword } = useAuth()
    const [formIsValid, setFormIsValid] = useState(false);
    const alert = useAlert()
    const mounted = useMounted()

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidation();
        if (formIsValid) {
            setIsSubmitting(true)
            await forgotPassword(email)
                .then((res) => {
                    console.log(res)
                    alert.success("Email sent. Please check your mail")
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

        if (!email.trim().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            setFormIsValid(false);
            setemailError("Email Not Valid");
            return false;
        } else {
            setemailError("");
            setFormIsValid(true);
        }
    };

    return (
        <Grid container className="main">
            <div className="root">
                <Container maxWidth="xs">
                    <h2 style={{ marginTop: "20px", textAlign: "center" }}>Medical Store</h2>
                    <hr />
                    <p className="forgot"><b>Forgot Password?</b><br /> Enter your email id and a password reset link will be sent.</p>
                    <form id="loginform" onSubmit={handleSubmit}>
                        <Input
                            disableUnderline={true}
                            className="inputforpass"
                            type="email"
                            id="EmailInput"
                            name="email"
                            value={email}
                            aria-describedby="emailHelp"
                            placeholder="Enter your registered email id here"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <small id="emailHelp" className="text-danger form-text">
                            {emailError}
                        </small>
                        <Grid container justifyContent='center'>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="submit mt-2"
                                onClick={handleSubmit}
                            >
                                <p className="passlink">{isSubmitting ? "Loading" : "Submit"}</p>
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

export default ForgotPassword