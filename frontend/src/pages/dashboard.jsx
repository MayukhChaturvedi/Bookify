import { useContext } from "react";
import { Link } from "react-router-dom";
import libraryImg from "../assets/libraryImg.jpg";
import { AuthContext } from "../context/authContext";

const Dashboard = () => {
	const { auth } = useContext(AuthContext);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="absolute inset-0">
				<img
					src={libraryImg}
					className="w-full h-full object-cover"
					alt="Library Background"
				/>
			</div>
			<div className="absolute inset-0 bg-black opacity-60 z-10"></div>
			<div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
				<h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8">
					Welcome to <span className="text-orange-500">Bookify!</span>
				</h1>
				{!auth.token && (
					<div className="flex space-x-4">
						<Link
							to="/login"
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
						>
							Signup
						</Link>
					</div>
				)}
				{auth.token && (
					<p className="text-2xl">Welcome back! Enjoy your books.</p>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
