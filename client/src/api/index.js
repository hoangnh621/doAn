import axios from 'axios';

const url = 'http://localhost:5000/meal';

export const fetchFoods = () => axios.get(url);
