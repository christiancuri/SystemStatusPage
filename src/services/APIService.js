import Axios from "axios";
const axios = Axios.create({
  baseURL: `https://uptime.smashinnovations.com/`
});

class APIService {
  async getUptime(module, limit = 10) {
    return axios
      .get(`/api/system/uptime/${module}?limit=${limit}`)
      .then(data => data.data);
  }
}

export default new APIService();
