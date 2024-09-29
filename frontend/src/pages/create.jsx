import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import getItem from "./getItem";
import api from "../services/api";
import FormGenerate from "./formGenerate";

export default function Create() {
	const [data, setData] = useState({
		required: {},
	});
	const [status, setStatus] = useState("working");
	const [extraData, setExtraData] = useState({
		authors: [],
		genres: [],
		books: [],
	});
	const { type } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const asyncGet = async (getType) => {
			try {
				const item = await getItem("multiple", getType);
				setExtraData((prevData) => ({ ...prevData, [getType]: item }));
			} catch (e) {
				console.error(`Error fetching get data error:`, e);
			}
		};
		switch (type) {
			case "authors":
				setData({
					required: {
						first_name: "",
						family_name: "",
					},
					date_of_birth: "",
					date_of_death: "",
				});
				break;
			case "genres":
				setData({
					required: {
						name: "",
					},
				});
				break;
			case "books":
				asyncGet("authors");
				asyncGet("genres");
				setData({
					required: {
						title: "",
						summary: "",
						isbn: "",
						author: "",
					},
					genre: [],
				});
				break;
			case "bookinstances":
				asyncGet("books");
				setData({
					required: {
						book: "",
						imprint: "",
						status: "",
					},
					due_back: "",
				});
				break;
			default:
				break;
		}
	}, [type]);

	if (
		type === "books" &&
		(!extraData["authors"].length || !extraData["genres"].length)
	) {
		return <div>Loading...</div>;
	}
	if (type === "bookinstances" && !extraData["books"].length) {
		return <div>Loading...</div>;
	}

	return (
		<form
			className="rounded-xl font-serif text-lg font-light bg-slate-50 my-5 mx-auto sm:px-5 sm:py-5 md:px-10 md:py-7 lg:px-20 lg:py-10 flex flex-col items-center w-full max-w-lg"
			onSubmit={(e) => handleSubmit(e)}
		>
			<FormGenerate
				type={type}
				handleChange={handleChange}
				handleGenreChange={handleGenreChange}
				data={data}
				extraData={extraData}
				status={status}
			/>
			<button
				type="submit"
				className="rounded-full border-2 py-2 px-4 bg-green-500 text-slate-50 m-4 w-full sm:w-auto"
			>
				Submit
			</button>
		</form>
	);

	function handleChange(name, value, isRequired) {
		setData((prevData) => {
			const newData = { ...prevData };
			if (isRequired) {
				newData.required = { ...newData.required, [name]: value };
			} else {
				newData[name] = value;
			}
			if (Object.values(newData.required).every((val) => val)) {
				setStatus("complete");
			}
			return newData;
		});
	}

	function handleGenreChange(id, checked) {
		setData((prevData) => {
			const newGenres = checked
				? [...prevData.genre, id]
				: prevData.genre.filter((genreId) => genreId !== id);
			return { ...prevData, genre: newGenres };
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(data);
		const postData = { ...data, ...data.required };
		delete postData.required;
		for (const key in postData) {
			if (typeof postData[key] === "string") {
				postData[key] = postData[key].trim();
			}
		}
		if (type === "authors") {
			if (data.date_of_birth) {
				postData.date_of_birth = new Date(data.date_of_birth);
			} else {
				delete postData.date_of_birth;
			}
			if (data.date_of_death) {
				postData.date_of_death = new Date(data.date_of_death);
			} else {
				delete postData.date_of_death;
			}
			console.log(postData);
		} else if (type === "bookinstances") {
			if (data.due_back) {
				postData.due_back = new Date(data.due_back);
			} else {
				delete postData.due_back;
			}
		}
		if (status === "complete") {
			if (check(type, postData)) {
				setStatus("submitting");

				api
					.post(`/catalog/${type}/create`, postData)
					.then(function (res) {
						enqueueSnackbar(res.data);
					})
					.catch(function (err) {
						enqueueSnackbar("Error encountered. Check console for details", {
							variant: "error",
						});
						console.error("Error encountered during POST request", err);
					});
			}
		} else {
			enqueueSnackbar("Please fill all required fields before submitting", {
				variant: "warning",
			});
		}
	}

	function check(type, postData) {
		if (type === "authors") {
			if (!/[A-Za-z]{1,100}/.test(postData.first_name)) {
				console.log(`${postData.first_name} invalid first name`);
				enqueueSnackbar(
					"First Name should only have uppercase or lowercase letters with a max length of 100",
					{
						variant: "warning",
					}
				);
				return false;
			}
			if (!/[A-Za-z]{1,100}/.test(postData.family_name)) {
				console.log(`${postData.family_name} invalid family name`);
				enqueueSnackbar(
					"Family Name should only have uppercase or lowercase letters with a max length of 100",
					{
						variant: "warning",
					}
				);
				return false;
			}
			if (
				postData.date_of_birth &&
				postData.date_of_death &&
				!(postData.date_of_birth >= postData.date_of_death)
			) {
				enqueueSnackbar("Date of Death should not be before Date of Birth", {
					variant: "warning",
				});
				return false;
			}
		} else if (type === "genres") {
			if (postData.name.length < 3 || postData.name.length > 100) {
				enqueueSnackbar("Genre name should be between 3 and 100 characters", {
					variant: "warning",
				});
				return false;
			}
		}
		enqueueSnackbar("Submitting...");
		return true;
	}
}
