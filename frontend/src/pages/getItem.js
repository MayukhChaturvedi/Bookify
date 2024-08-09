import axios from 'axios';

export default async function GetItem(idOrQty, type, page, filter) {
	console.log('Getting Item');
	try {
		let url;
		if (idOrQty === 'multiple') {
			url = `http://localhost:3000/catalog/${type}/?skip=${page}&${filter}`;
		} else {
			url = `http://localhost:3000/catalog/${type}/${idOrQty}`;
		}
		const response = await axios.get(url);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error('Error occurred:', error);
		throw error;
	}
}
