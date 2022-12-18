import axios from "axios";
import moment from "moment";
import { appConfig } from "../../config";

class EmployeeService {
 
  retriveAllEmployees() {

    return axios.get(`${appConfig.ip}/employees`);
  }

  addEmployee(employee) {
    console.log(employee);

    const date = moment(employee.dateOfJoining).format("DD/MM/yyyy");

    const data = {
      employeeName: employee.employeeName,
      employeeNo: employee.employeeNo,
      dateOfJoining: date,
      department: {
        "id": employee.department
    },
      salary: employee.salary,
    };

   return axios.post(`${appConfig.ip}/employees`, data);
  }
}

export default new EmployeeService();
