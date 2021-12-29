import axios from "axios";

const API_URL = "http://localhost:8080/api/jobs";

class JobService {
  getJob(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  updateJob(id, job) {
    return axios.put(`${API_URL}/${id}`, job);
  }

  removeJob(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new JobService();
