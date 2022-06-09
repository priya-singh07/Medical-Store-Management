import React from "react";
import Navbar from "../components/navbar";
import { Container } from 'react-bootstrap';
import '../styles/dashboard.css';
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="whole">
      <Navbar />
      <div className="heading">Hi, Where would you like to go?</div>
      <Container className="card-container mt-5">
        <div className="flex">
          <div>
            <Link className="link" to="/stocks">
              <section className="cards mb-5">
                <h1>Stocks</h1>
                <p>Add or View the list</p>
              </section>
            </Link>
          </div>
          <div >
            <Link className="link" to="/outofstocks">
              <section className="cards mb-5">
                <h1>Out of Stocks</h1>
                <p>Add or View the list</p>
              </section>
            </Link>
          </div>
          </div>
          <div className="flex">
          <div>
            <Link className="link" to="/newbill">
              <section className="cards mb-5">
                <h1>Make a bill</h1>
                <p>Billing Page</p>
              </section>
            </Link>
          </div>
          <div >
            <Link className="link" to="/pastbills">
              <section className="cards mb-5">
                <h1>Billing History</h1>
                <p>Past records</p>
              </section>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default Dashboard