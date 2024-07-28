import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Delete() {
	const { type, id } = useParams();
	return (
		<div>
			<p>Are you sure you want to delete this item?</p>
			<button className="border-r-2 m-2 p-2" onClick={() => handleClick('y')}>
				Yes
			</button>
			<button className="border-r-2 m-2 p-2" onClick={() => handleClick('n')}>
				No
			</button>
		</div>
	);
	function handleClick(option) {
		if (option === 'y') {
			axios
				.delete(`http://localhost:3000/catalog/${type}/${id}/delete`)
				.then(function (res) {
					alert(res.data);
					if (res.status === 200)
						location.assign(`http://localhost:5173/${type}`);
				})
				.catch(function (err) {
					alert('Error encountered. Please check console for more details');
					console.log(err);
				});
		} else {
			location.assign(`http://localhost:5173/${type}`);
		}
	}
}
