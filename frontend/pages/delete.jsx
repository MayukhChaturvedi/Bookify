import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Delete() {
	const navigate = useNavigate();
	const { type, id } = useParams();
	return (
		<div className="rounded-xl font-serif text-lg font-light bg-slate-50 my-5 mx-auto p-5 min-w-fit max-w-prose flex flex-col items-center">
			<p className="block">Are you sure you want to delete this item?</p>
			<div className="flex justify-around">
				<button
					className="rounded-full border-2 py-2 px-4 bg-green-500 text-slate-50 m-4"
					onClick={() => handleClick('y')}
				>
					Yes
				</button>
				<button
					className="rounded-full border-2 py-2 px-4 bg-red-600 text-slate-50 m-4"
					onClick={() => handleClick('n')}
				>
					No
				</button>
			</div>
		</div>
	);
	function handleClick(option) {
		if (option === 'y') {
			axios
				.delete(`http://localhost:3000/catalog/${type}/${id}/delete`)
				.then(function (res) {
					alert(res.data);
					if (res.status === 200) navigate(`/${type}`);
				})
				.catch(function (err) {
					alert('Error encountered. Please check console for more details');
					console.log(err);
				});
		} else {
			navigate(`/${type}`);
		}
	}
}
