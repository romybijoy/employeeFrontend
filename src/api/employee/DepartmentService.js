import axios from 'axios'

import { appConfig } from "../../config";

class DepartmentService{

    retriveAllDepartments(){
    // console.log("service")

    return axios.get(`${appConfig.ip}/departments`);
    }

    getDepartmentByid(id){
        console.log("service" + id)
    
        return axios.get(`${appConfig.ip}/departments/${id}`);
        }

    
}

export default new DepartmentService();