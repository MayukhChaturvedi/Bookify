import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NoPage from "./pages/noPage.jsx";
import DisplayOne from "./pages/displayOne.jsx";
import DisplayMany from "./pages/displayMany.jsx";
import Create from "./pages/create.jsx";
import Update from "./pages/update.jsx";
import Delete from "./pages/delete.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { SnackbarProvider } from "notistack";
import Wrap from "./wrap.jsx";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/privateRoute";

const router = createBrowserRouter([
	{
		element: <Wrap />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/:type",
				element: (
					<PrivateRoute>
						<DisplayMany />
					</PrivateRoute>
				),
			},
			{
				path: "/:type/create",
				element: (
					<PrivateRoute>
						<Create />
					</PrivateRoute>
				),
			},
			{
				path: "/:type/:id",
				element: (
					<PrivateRoute>
						<DisplayOne />
					</PrivateRoute>
				),
			},
			{
				path: "/:type/:id/update",
				element: (
					<PrivateRoute>
						<Update />
					</PrivateRoute>
				),
			},
			{
				path: "/:type/:id/delete",
				element: (
					<PrivateRoute>
						<Delete />
					</PrivateRoute>
				),
			},
			{
				path: "*",
				element: <NoPage />,
			},
		],
	},
]);

function App() {
	return (
		<SnackbarProvider maxSnack={3}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</SnackbarProvider>
	);
}

export default App;
