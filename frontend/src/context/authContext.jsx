import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: null,
		user: null,
	});

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				if (decoded.exp * 1000 > Date.now()) {
					setAuth({ token, user: decoded });
					api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				} else {
					Cookies.remove("token");
				}
			} catch (error) {
				console.error("Invalid token", error);
				Cookies.remove("token");
			}
		}
	}, []);

	const login = (token) => {
		const decoded = jwtDecode(token);
		Cookies.set("token", token, { secure: true, sameSite: "strict" });
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		setAuth({ token, user: decoded });
	};

	const logout = () => {
		Cookies.remove("token");
		delete api.defaults.headers.common["Authorization"];
		setAuth({ token: null, user: null });
	};

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
