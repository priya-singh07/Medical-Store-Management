import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/homepage.css'

const HomePage = () => {
    const back_style = {
        position: "absolute",
        top: "40%",
        width: '100%',
        paddingTop: "40px",
    };
    const but_style = {
        position: "absolute",
        top: "70%",
        left: "45%",
    };
    const history = useHistory();

    const routeChange = (path) => {
        history.push(path);
    };

    return (
        <div style={{ backgroundColor: " #050A30", height: '100vh', width: '100%' }}>
            <div style={back_style}>
                <span className="resultMarquee">
                    <h1 style={{ color: "white", fontFamily: "Arial", textAlign: 'left' }}>
                        Welcome to Medical Store Management System project, one of the most important issue of maintaining medicines for shop owners because "Everyone's Life Matters!!"&nbsp;!
                    </h1>
                </span>
            </div>
            <div className="d-grid gap-2 d-md-block">
                <div style={but_style}>
                    <div>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                routeChange("/login");
                            }}
                        >
                            Login
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                                routeChange("/register");
                            }}
                        >
                            SignUp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage