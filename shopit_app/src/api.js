import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
	baseURL : BASE_URL
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if(token){
			const decoded = jwtDecode(token);
			const currentTime = Date.now() / 1000;
			const expiry_date = decoded.exp;
			if(expiry_date > currentTime){
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api; 