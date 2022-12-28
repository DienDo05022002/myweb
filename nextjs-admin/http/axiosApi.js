import axios from 'axios'
import Cookies  from 'js-cookie'

// if(typeof window !== 'undefined') {
//   var authTokens = localStorage.getItem('tokens')
// }
var authTokens = Cookies.get('tokens')
// const storeTokens = Cookies.get('tokens');
console.log(authTokens)
const http = axios.create({
  baseURL: 'https://myweb-sever-05022002.onrender.com/v1',
  headers: { Authorization: `Bearer ${authTokens}` },
});
http.interceptors.request.use(async (req) => {
    if (authTokens) {
    console.log(authTokens)
    req.headers.Authorization = `Bearer ${authTokens}`;
  }
  return req;
})
// http.interceptors.request.use(async (req) => {
//   if(typeof window !== 'undefined') {
//     var authTokens = localStorage.getItem('tokens')
//   }
//   if (authTokens) {
//     authTokens = localStorage.getItem('tokens') || null;
//     req.headers.Authorization = `Bearer ${authTokens}`;
//   }
//   return req;
// });
export default http;





const API_CLOUDINARY = 'https://res.cloudinary.com/dvz7vll4o/image/upload';
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'jr0m4p9w');

  console.log(formData);

  try {
    const res = await axios.post(API_CLOUDINARY, formData);
    console.log(res.data.url);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
