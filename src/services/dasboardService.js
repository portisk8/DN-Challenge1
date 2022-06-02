import axios from "axios";
const API_URL = "http://localhost:3001";

export async function employeesAll() {
  return axios({
    url: `${API_URL}/employees/all`,
    method: "GET",
  });
}
