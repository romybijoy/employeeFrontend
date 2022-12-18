import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

class EmployeeApp extends Component {
  render() {
    return (
      <div className="employeeApp">
        <Router>
          <Routes>
            <Route
              path="/employeeRegistration"
              element={<RegistrationForm />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default EmployeeApp;
