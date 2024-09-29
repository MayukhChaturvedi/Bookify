import axios from "axios";
console.log(import.meta.env.VITE_BASEURL);

const api = axios.create({
	baseURL: import.meta.env.VITE_BASEURL,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
