import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import NoPage from './pages/noPage.jsx';
import Index from './pages/index.jsx';
import DisplayOne from './pages/displayOne.jsx';
import DisplayMany from './pages/displayMany.jsx';
import Create from './pages/create.jsx';
import Update from './pages/update.jsx';
import Delete from './pages/delete.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Index />,
	},
	{
		path: '/:type',
		element: <DisplayMany />,
	},
	{
		path: '/:type/create',
		element: <Create />,
	},
	{
		path: '/:type/:id',
		element: <DisplayOne />,
	},
	{
		path: '/:type/:id/update',
		element: <Update />,
	},
	{
		path: '/:type/:id/delete',
		element: <Delete />,
	},
	{
		path: '*',
		element: <NoPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
