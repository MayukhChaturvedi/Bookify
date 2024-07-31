import { useState, useEffect } from 'react';
import GetItem from './getItem';
import { useParams } from 'react-router-dom';
import NoPage from './noPage';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function DisplayOne() {
	const [json, setJson] = useState(null);
	const [error, setError] = useState(null);
	const { type, id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await GetItem(id, type);
				setJson(data[0]);
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
	}, [id, type]);

	const navigate = useNavigate();

	if (type === 'books') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}

		return (
			<div
				key={json._id}
				className="max-w-full bg-slate-100 rounded-md m-5 p-5 flex"
			>
				<img
					key={json._id + ' img'}
					className="flex-auto w-full max-w-24 border-r-0 m-2"
					alt={json.title}
				/>
				<div className="flex flex-col w-full items-center h-full">
					<h2
						className="m-b-4 text-3xl underline font-bold"
						key={json._id + ' h2'}
					>
						{json.title}
					</h2>
					<p
						key={json._id + ' auth'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						Author:&nbsp;{json.author.name}
					</p>
					<p
						key={json._id + ' genre'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						Genre:&nbsp;{json.genre.map((elt) => `${elt.name}  `)}
					</p>
					<p
						key={json._id + ' isbn'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						ISBN:&nbsp;<span className="font-sans">{json.isbn}</span>
					</p>
					<p
						key={json._id + ' sum'}
						className="w-3/4 m-2 text-justify font-serif text-lg"
					>
						Summary:&nbsp;{json.summary}
					</p>
				</div>
				<div className="flex flex-col justify-evenly">
					<button
						onClick={() => navigate('update')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillPencilFill />
					</button>
					<button
						onClick={() => navigate('delete')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillTrash3Fill />
					</button>
				</div>
			</div>
		);
	} else if (type === 'authors') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}

		return (
			<div className="max-w-full bg-slate-100 rounded-md m-5 p-5 flex">
				<img
					alt={json.name}
					className="flex-auto w-full max-w-24 border-r-0 m-2"
				/>
				<div key={json._id} className="flex flex-col w-full items-center">
					<h2 key={json._id + ' h2'} className="m-b-2 text-bold text-3xl">
						{json.name}
					</h2>
					<p key={json._id + ' p'} className="max-h-30 w-3/4">
						Date of Birth: {json.date_of_birth || 'NA'}
						<br />
						Date of Death: {json.date_of_death || 'NA'}
					</p>
				</div>
				<div className="flex flex-col justify-evenly">
					<button
						onClick={() => navigate('update')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillPencilFill />
					</button>
					<button
						onClick={() => navigate('delete')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillTrash3Fill />
					</button>
				</div>
			</div>
		);
	} else if (type === 'genres') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}

		return (
			<div key={json._id} className="genre">
				<h2 key={json._id + ' h2'}>{json.name}</h2>
				<div className="flex flex-col justify-evenly">
					<button
						onClick={() => navigate('update')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillPencilFill />
					</button>
					<button
						onClick={() => navigate('delete')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillTrash3Fill />
					</button>
				</div>
			</div>
		);
	} else if (type === 'bookinstances') {
		if (error) {
			return <div>Error occurred: {error.message}</div>;
		}

		if (!json) {
			return <div>Loading...</div>;
		}

		return (
			<div className="max-w-full bg-slate-100 rounded-md m-5 p-5 flex">
				<img
					className="flex-auto w-full max-w-24 border-r-0 m-2"
					key={json._id + ' img'}
					alt={json.book.title}
				/>
				<div key={json._id} className="flex flex-col w-full items-center">
					<h2
						key={json._id + ' h2'}
						className="m-b-2 text-3xl underline font-bold"
					>
						{json.book.title}
					</h2>
					<p
						key={json._id + ' p'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						Status: {json.status}
					</p>
					<p
						key={json._id + ' p'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						Imprint: {json.imprint}
					</p>
					<p
						key={json._id + ' p'}
						className="w-3/4 m-2 text-left font-serif text-lg"
					>
						Due back: <span className="font-sans">{json.due_back}</span>
					</p>
				</div>
				<div className="flex flex-col justify-evenly">
					<button
						onClick={() => navigate('update')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillPencilFill />
					</button>
					<button
						onClick={() => navigate('delete')}
						className="m-3 hover:text-orange-500"
					>
						<BsFillTrash3Fill />
					</button>
				</div>
			</div>
		);
	} else {
		return <NoPage />;
	}
}
