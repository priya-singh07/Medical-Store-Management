import React, { useState } from 'react'
import '../styles/login.css'
import google from '../assets/images/google.svg'
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useAuth } from '../contexts/AuthContext'
import { useAlert } from 'react-alert'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useMounted from '../hooks/useMounted'

export default function Login() {

  const { login, signInWithGoogle } = useAuth()

  const mounted = useMounted()
  const history = useHistory()
  const location = useLocation()

  function handleRedirectToOrBack() {
    history.push(location.state?.from ?? '/dashboard')
  }

  const alert = useAlert()

  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { email, password } = user;

  const handleVisibility = () => {
    setUser({ ...user, showPassword: !user.showPassword });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const [emailError, setemailError] = useState("");

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    setIsSubmitting(true);
    await login(email, password)
      .then((response) => {
        console.log(response);
        alert.success("Login successfully")
        handleRedirectToOrBack()
      })
      .catch((error) => {
        console.log(error.message);
        alert.error(error.message)
      })
      .finally(() => {
        mounted.current && setIsSubmitting(false)
      })
  };

  return (
    <Grid container className="main">
      <div className="root" style={{boxShadow: "0px 1px 1px 1px solid #FFFFFF"}}>
        <Container maxWidth="xs">
          <h2 style={{ marginTop: "20px", textAlign: "center", color: "#050A30" }}>Medical Store</h2>
          <hr />
          <form id="loginform" onSubmit={handleSubmit}>
            <p
              className="text">
              E-mail
            </p>
            <Input
              disableUnderline={true}
              className="inputUser"
              type="email"
              name="email"
              id="EmailInput"
              value={email}
              placeholder="Enter e-mail"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <small id="emailHelp" className="text-danger form-text">
              {emailError}
            </small>
            <p
              className="text">
              Password
            </p>
            <Input
              disableUnderline={true}
              className="inputPass"
              type={user.showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter Password"
              id="exampleInputPassword1"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleVisibility}
                  >
                    {user.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                  <p className="forgotText">
                    Forgot password?
                  </p>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit m-0 p-0"
                  onClick={handleSubmit}
                >
                  <p className="loggedin">{isSubmitting ? "Loading" : "Login"}</p>
                </Button>
              </Grid>
            </Grid>
          </form>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <p className="sign">Don't have an account? <b className="bold">Register</b> here.</p>
          </Link>
          <p className="underline"><span className="span">or Sign In using</span></p>
          <div className="socialbuttons">
            <img src={google} className="social" alt="google" onClick={() =>
              signInWithGoogle()
                .then(user => {
                  handleRedirectToOrBack()
                  console.log(user)
                })
                .catch(e => console.log(e.message))} />
          </div>
        </Container >
      </div >
    </Grid >
  )
}