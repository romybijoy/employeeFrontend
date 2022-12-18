import React, { Component } from "react";
import "./App.css";
import EmployeeApp from "./components/employee/EmployeeApp";
import './bootstrap.css';
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <div className="App">
      <ToastContainer hideProgressBar={true}/>
      <EmployeeApp />
    </div>
  );
}



export default App;
