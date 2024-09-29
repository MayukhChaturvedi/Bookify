import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/users/login", credentials);
			login(response.data.token);
			enqueueSnackbar("Logged in successfully!", { variant: "success" });
			navigate("/");
		} catch (error) {
			enqueueSnackbar("Login failed. Check your credentials.", {
				variant: "error",
			});
		}
	};

	const handleSignupRedirect = () => {
		navigate("/register");
	};

	return (
		<div className="max-w-md min-w-[50%] mx-auto my-20 p-10 bg-white shadow-lg rounded-md">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
				Login
			</h2>
			<form className="flex flex-col items-center" onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={credentials.username}
					onChange={handleChange}
					placeholder="Username"
					className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:border-blue-500 focus:outline-none"
					required
				/>
				<input
					type="password"
					name="password"
					value={credentials.password}
					onChange={handleChange}
					placeholder="Password"
					className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:border-blue-500 focus:outline-none"
					required
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-4"
				>
					Login
				</button>
			</form>
			<div className="flex justify-between items-center mt-4">
				<p className="text-gray-600">Don&apos;t have an account?</p>
				<button
					onClick={handleSignupRedirect}
					className="text-blue-500 font-semibold hover:underline"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default Login;
