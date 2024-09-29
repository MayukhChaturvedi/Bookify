import api from "../services/api";

export default async function GetItem(idOrQty, type, page, filter) {
	console.log("Getting Item");
	try {
		let url;
		if (idOrQty === "multiple") {
			url = `/catalog/${type}/?skip=${page}&${filter}`;
		} else {
			url = `/catalog/${type}/${idOrQty}`;
		}
		const response = await api.get(url);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error occurred:", error);
		throw error;
	}
}
