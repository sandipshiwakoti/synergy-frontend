import axios from "axios";

// const API_URL = "http://localhost:8080/api/leaves";
const API_URL = "https://synergy-hrm-backend.herokuapp.com/api/leaves";

class LeaveService {
  getLeave(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateLeave(id, leave) {
    return axios.put(`${API_URL}/${id}`, leave);
  }

  removeLeave(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  addLeave(employeeId, leave) {
    return axios.post(`${API_URL}/employees/${employeeId}`, leave);
  }
}

export default new LeaveService();
