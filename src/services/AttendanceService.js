import axios from "axios";

const API_URL = "http://localhost:8080/api/attendances";

class AttendanceService {
  addAttendance(employeeId, attendance) {
    return axios.post(`${API_URL}/${employeeId}`, attendance);
  }

  getAttendance(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateAttendance(id, attendance) {
    return axios.put(`${API_URL}/${id}`, attendance);
  }

  removeAttendance(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new AttendanceService();
