import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);

export default api;
