import axios from 'axios';
export const WEB_SEVER_URL = 'http://localhost:3010';

let authTokens = localStorage.getItem('tokens') || null;
const http = axios.create({
  baseURL: 'http://localhost:3010/v1',
  headers: { Authorization: `Bearer ${authTokens}` },
  // withCredentials: true,
  // headers: { Authorization: `Bearer ${authTokens}` }
});
http.interceptors.request.use(async (req) => {
  let authTokens = localStorage.getItem('tokens') || null;
  // console.log(authTokens)
  if (authTokens) {
    authTokens = localStorage.getItem('tokens') || null;
    req.headers.Authorization = `Bearer ${authTokens}`;
    // console.log(authTokens)
  }
  // console.log(req);
  return req;
});
export default http;
