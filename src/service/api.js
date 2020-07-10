import axios from 'axios';

const api = axios.create({
  baseURL: 'https://teclat-test-mob.herokuapp.com',
});

export default api;