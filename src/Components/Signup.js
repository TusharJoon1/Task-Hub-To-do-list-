import React, { useState } from "react";
import Axios from 'axios'

import "./signup.css"; // Corrected import statement

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3001/signup', { name, email, password, cpassword })
      .then(Response => {
        console.log(Response)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
   

      <div id="container">
        <img
          src={"https://img.freepik.com/premium-vector/business-people-planning-illustration-cartoon-employee-character-team-working-together-business-plan-scheduling-week-month-task-office-planner-calendar-concept-white_213110-606.jpg"}
          alt="My Image"
        />
        {/* Use the imported image */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="exampleInputName1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="xyz@gmail.com"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
            <h4>  We'll never share your email with anyone else.</h4>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="At least 8-digit"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Same-password"
              id="exampleInputPassword1"
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
