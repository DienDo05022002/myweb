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





const API_CLOUDINARY = 'https://res.cloudinary.com/dvz7vll4o/image/upload';
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "jr0m4p9w");

  console.log(formData)

  try {
    const res = await axios.post(API_CLOUDINARY, formData);
    console.log(res.data.url)
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
