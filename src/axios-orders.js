import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://the-burger-project-5-react.firebaseio.com/'
});

export default instance;