import axios from "axios";

// const API_URL = "http://localhost:8080/api/employees";
const API_URL = "https://synergy-hrm-backend.herokuapp.com/api/employees";

class EmployeeService {
  getEmployees() {
    return axios.get(API_URL);
  }

  getEmployee(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  removeEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  addEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  updateEmployee(employee, id) {
    console.log(employee, id);
    return axios.put(`${API_URL}/${id}`, employee);
  }

  getJobById(id) {
    return axios.get(`${API_URL}/${id}/job`);
  }

  getEmployeeByEmail(user) {
    return axios.post("http://localhost:8080/api/email/employee", user);
  }
}

export default new EmployeeService();
