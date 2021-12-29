import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth";
const API_URL = "https://synergy-hrm-backend.herokuapp.com/api/auth";

class AuthService {
  getLeave(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  checkAuth(user) {
    return axios.post(API_URL, user);
  }
}

export default new AuthService();
