import React, { Component } from "react";
import moment from "moment";
import * as Yup from "yup";
import EmployeeService from "../../api/employee/EmployeeService";
import DepartmentService from "../../api/employee/DepartmentService";
import { DropDown } from "../../common/DropDown";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../common/cmnStyle.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validate = Yup.object({
  employeeNo: Yup.string()
    .required("Employee Number is required")
    .max(10, "Employee Number can not be more than 10 digits long"),
  employeeName: Yup.string()
    .required("Employee name is required")
    .max(100, "Employee name can not be more than 100 characters long"),
  department: Yup.string().required("Select your department"),
  dateOfJoining: Yup.date()
    .required("Date Of Joining is required"),
  salary: Yup.string()
    .max(10, "Salary can not be more than 10 digits long")
    .required("Salary is required"),
});

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeNo: "",
      employeeName: "",
      dateOfJoining: moment().format("DD/MM/yyyy"),
      department: "",
      departments: [],
      salary: "",
    };
  }

  componentDidMount() {
    DepartmentService.retriveAllDepartments().then((response) =>
      this.setState({
        departments: response.data,
      })
    );
  }

  onSubmit = (values) => {
    EmployeeService.addEmployee({
      employeeNo: values.employeeNo,
      employeeName: values.employeeName,
      dateOfJoining: values.dateOfJoining,
      salary: values.salary,
      department: parseInt(values.department),
    })
      .then(() => {
        toast.success("Employee added successfully", {
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("Employee addition not ", {
          autoClose: 3000,
        });
      });
  };

  reset = () => {
    this.setState({
      employeeNo: "",
      employeeName: "",
      dateOfJoining: moment().format("dd/MM/yyyy"),
      department: "",
      salary: "",
    });
  };

  render() {
    let { employeeNo, employeeName, dateOfJoining, department, salary } =
      this.state;

    return (
      <div>
        <header className="header">
        <h1 style={{ paddingTop: "5px" }}>Employee Registration Form</h1>
        </header>
        <div className="container">
          <Formik
            initialValues={{
              employeeNo,
              employeeName,
              dateOfJoining,
              department,
              salary,
            }}
            onSubmit={this.onSubmit}
            validateOnChange={true}
            validateOnBlur={false}
            validationSchema={validate}
          >
            {(props) => (
              <Form className="formik">
                <fieldset className="form-group alignLabel">
                  <label>
                    Employee Number
                    <span className="astrk">*</span>
                  </label>
                  <Field
                    className="form-control textbox"
                    type="number"
                    name="employeeNo"
                    placeholder="Employee Number"
                  ></Field>
                  <ErrorMessage
                    component="div"
                    name="employeeNo"
                    className="errStyle"
                  />
                </fieldset>

                <fieldset className="form-group alignLabel">
                  <label>
                    Employee Name
                    <span className="astrk">*</span>
                  </label>
                  <Field
                    className="form-control textbox"
                    type="text"
                    name="employeeName"
                    placeholder="Employee Name"
                  ></Field>
                  <ErrorMessage
                    component="div"
                    name="employeeName"
                    className="errStyle"
                  />
                </fieldset>

                <fieldset className="form-group alignLabel">
                  <label>
                    Date Of Joining
                    <span className="astrk">*</span>
                  </label>
                  <Field
                    className="form-control textbox"
                    type="date"
                    name="dateOfJoining"
                  ></Field>
                  <ErrorMessage
                    component="div"
                    name="dateOfJoining"
                    className="errStyle"
                  />
                </fieldset>

                <fieldset className="form-group alignLabel">
                  <DropDown
                    label="Department"
                    name="department"
                    data={this.state.departments}
                    defValue=" Select Department"
                    isRequired={true}
                  />
                </fieldset>

                <fieldset className="form-group alignLabel">
                  <label>
                    Salary
                    <span className="astrk">*</span>
                  </label>
                  <Field
                    className="form-control textbox"
                    type="number"
                    name="salary"
                    placeholder="Salary"
                  ></Field>
                  <ErrorMessage
                    component="div"
                    name="salary"
                    className="errStyle"
                  />
                </fieldset>
                <div className="btnSec">
                  <button
                    className="btn btn-danger"
                    type="reset"
                    onClick={() => this.reset}
                  >
                    Refresh
                  </button>
                  <span style={{ padding: "20px" }}></span>
                  <button className="btn btn-success" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
