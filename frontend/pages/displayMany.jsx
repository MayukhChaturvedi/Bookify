import { useState, useEffect } from 'react';
import GetItem from './getItem';
import { useNavigate, useParams } from 'react-router-dom';
import NoPage from './noPage';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';

export default function DisplayMany() {
	const [json, setJson] = useState(null);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);

	const navigate = useNavigate();
	const { type } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await GetItem('multiple', type, page);
				setJson(data);
			} catch (err) {
				setError(err);
			}
		};

		if (
			type === 'books' ||
			type === 'genres' ||
			type === 'authors' ||
			type === 'bookinstances'
		)
			fetchData();
	}, [type, page]);

	if (type === 'books') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}

		return (
			<>
				<button
					onClick={() => navigate('create')}
					className="block max-w-fit mx-auto my-3 py-4 px-5 bg-green-500 text-white text-lg font-semibold rounded-full"
				>
					Add a Book
				</button>
				<div className="max-w-full bg-slate-100 rounded-md p-2 m-2">
					{json.map((element) => (
						<>
							<div
								key={element._id}
								onClick={() => navigate(`${element._id}`)}
								className="rounded-md flex m-2 p-2 hover:bg-slate-400"
							>
								<img
									className="flex-none w-full max-w-24 border-r-0 m-2"
									alt={element.title}
								/>
								<div className="flex flex-col w-full items-center">
									<h2
										key={element._id + ' h2'}
										className="m-b-2 font-bold text-lg"
									>
										{element.title}
									</h2>
									<p key={element._id + ' p'} className="w-3/4">
										{element.summary}
									</p>
								</div>
								<div className="flex flex-col justify-center">
									<button
										onClick={(e) => {
											navigate(`${element._id}/update`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillPencilFill />
									</button>
									<button
										onClick={(e) => {
											navigate(`${element._id}/delete`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillTrash3Fill />
									</button>
								</div>
							</div>
							<hr className="w-11/12 text-zinc-800 mx-auto" />
						</>
					))}
				</div>
			</>
		);
	} else if (type === 'authors') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}
		return (
			<>
				<button
					onClick={() => navigate('create')}
					className="block max-w-fit mx-auto my-3 py-4 px-5 bg-green-500 text-white text-lg font-semibold rounded-full"
				>
					Add an Author
				</button>
				<div className="max-w-full bg-slate-100 rounded-md p-2 m-2">
					{json.map((element) => (
						<>
							<div
								key={element._id}
								onClick={() => navigate(`${element._id}`)}
								className="w-[0.9] rounded-md flex m-2 p-2 hover:bg-slate-400"
							>
								<img
									alt={element.name}
									className="flex-auto w-full max-w-24 border-r-0 m-2"
								/>
								<div className="flex flex-col w-full items-center">
									<h2
										key={element._id + ' h2'}
										className="m-b-2 text-bold text-lg"
									>
										{element.name}
									</h2>
									<p key={element._id + ' p'} className="max-h-30 w-3/4">
										Date of Birth: {element.date_of_birth || 'NA'}
										<br />
										Date of Death: {element.date_of_death || 'NA'}
									</p>
								</div>
								<div className="flex flex-col justify-center">
									<button
										onClick={(e) => {
											navigate(`${element._id}/update`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillPencilFill />
									</button>
									<button
										onClick={(e) => {
											navigate(`${element._id}/delete`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillTrash3Fill />
									</button>
								</div>
							</div>
							<hr
								key={element._id + ' hr'}
								className="w-11/12 text-zinc-800 mx-auto"
							/>
						</>
					))}
				</div>
			</>
		);
	} else if (type === 'genres') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}
		return (
			<>
				<button
					onClick={() => navigate('create')}
					className="block mx-auto my-3 py-4 px-5 bg-green-500 text-white text-lg font-semibold rounded-full"
				>
					Add a Genre
				</button>
				<div className="max-w-md mx-auto flex flex-col rounded-md items-center bg-slate-50">
					{json.map((element) => (
						<div
							key={element._id}
							className="flex justify-around hover:bg-slate-400 rounded-full m-5 p-2 w-11/12"
						>
							<div
								key={element._id + ' inDiv'}
								onClick={() => navigate(`${element._id}`)}
								className="rounded-full m-5 p-2 w-3/4 "
							>
								<h2
									key={element._id + ' h2'}
									className="font-bold text-lg m-2 text-center"
								>
									{element.name}
								</h2>
							</div>
							<div className="flex flex-col justify-center">
								<button
									onClick={(e) => {
										navigate(`${element._id}/update`);
										e.stopPropagation();
									}}
									className="m-3 hover:text-orange-500"
								>
									<BsFillPencilFill />
								</button>
								<button
									onClick={(e) => {
										navigate(`${element._id}/delete`);
										e.stopPropagation();
									}}
									className="m-3 hover:text-orange-500"
								>
									<BsFillTrash3Fill />
								</button>
							</div>
						</div>
					))}
				</div>
			</>
		);
	} else if (type === 'bookinstances') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}
		return (
			<>
				<button
					onClick={() => navigate('create')}
					className="block max-w-fit mx-auto my-3 py-4 px-5 bg-green-500 text-white text-lg font-semibold rounded-full"
				>
					Add Another Book Instance
				</button>
				<div className="max-w-full bg-slate-100 rounded-md p-2 m-2">
					{json.map((element) => (
						<>
							<div
								key={element._id}
								onClick={() => navigate(`${element._id}`)}
								className="rounded-md flex m-2 p-2 hover:bg-slate-400"
							>
								<img
									className="flex-none w-full max-w-24 border-r-0 m-2"
									key={element._id + ' img'}
									alt={element.book.title}
								/>
								<div
									key={element._id + ' inDiv'}
									className="flex flex-col w-full items-center"
								>
									<h2
										className="m-b-2 text-bold text-lg"
										key={element._id + ' h2'}
									>
										{element.book.title}
									</h2>
									<p key={element._id + ' p'} className="w-3/4">
										Status: {element.status}
										<br />
										Imprint: {element.imprint}
										<br />
										Due back: {element.due_back}
									</p>
								</div>
								<div className="flex flex-col justify-center">
									<button
										onClick={(e) => {
											navigate(`${element._id}/update`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillPencilFill />
									</button>
									<button
										onClick={(e) => {
											navigate(`${element._id}/delete`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillTrash3Fill />
									</button>
								</div>
							</div>
							<hr
								className="w-11/12 text-zinc-800 mx-auto"
								key={element._id + ' hr'}
							/>
						</>
					))}
				</div>
			</>
		);
	} else {
		return <NoPage />;
	}
}
