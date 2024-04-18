// Import necessary modules and components
import './App.css';
import Signup from './Components/Signup'; // Make sure the path and filename are correct
import Login from './Components/login';
import Todo from './Components/TODO/todo'
import Navbar from './Components/Navbar'

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes // You need to define a Route to render the Signup component
  
} from "react-router-dom";

function App() {
  return (
    <div>
     <Navbar/>
    <Router>
      <Routes>
      {/* Define a Route to render the Signup component */}
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/list" element={<Todo/>} />
      {/* Use Link to navigate to the Signup component */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;


