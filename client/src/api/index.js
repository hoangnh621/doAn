import axios from 'axios';


export const fetchFoods = () => axios.get('http://localhost:5000/meal');
export const login = () => axios.post('http://localhost:5000/login');
