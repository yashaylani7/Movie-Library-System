import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5173'; // Replace with your backend URL if needed
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
