import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const [form, setForm] = useState({
		username: "",
		password: "",
		email: "",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(form);
			await api.post("/users/signup", form);
			enqueueSnackbar("Registered successfully! Please login.", {
				variant: "success",
			});
			navigate("/login");
		} catch (error) {
			enqueueSnackbar("Registration failed.", { variant: "error" });
		}
	};

	return (
		<div className="max-w-md min-w-[50%] mx-auto my-20 p-10 bg-white shadow-lg rounded-md">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">Register</h2>
			<form className="flex flex-col items-center" onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={form.username}
					onChange={handleChange}
					placeholder="Username"
					className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:border-blue-500 focus:outline-none"
					required
				/>
				<input
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="Email"
					className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:border-blue-500 focus:outline-none"
					required
				/>
				<input
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="Password"
					className="border-2 border-gray-300 rounded-lg w-full p-2 mb-4 focus:border-blue-500 focus:outline-none"
					required
				/>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-4"
				>
					Register
				</button>
			</form>
			<div className="flex justify-between items-center mt-4">
				<p className="text-gray-600">Already have an account?</p>
				<button
					onClick={() => navigate("/login")}
					className="text-blue-500 font-semibold hover:underline"
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Register;
