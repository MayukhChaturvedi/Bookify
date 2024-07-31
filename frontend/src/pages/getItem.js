import axios from 'axios';

export default async function GetItem(idOrQty, type, page) {
	console.log('Getting Item');
	try {
		// const url = `http://localhost:3000/catalog/${type}/${
		// 	idOrQty !== 'multiple' ? idOrQty : ''
		// }`;
		let url;
		if (idOrQty === 'multiple') {
			url = `http://localhost:3000/catalog/${type}/?skip=${page}`;
		} else {
			url = `http://localhost:3000/catalog/${type}/${idOrQty}`;
		}
		console.log(url);
		const response = await axios.get(url);
		const data = response.data;

		if (idOrQty !== 'multiple') {
			console.log(data);
			return data;
		} else {
			console.log(data);
			return data;
		}
	} catch (error) {
		console.error('Error occurred:', error);
		throw error;
	}
}
