import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getItem from './getItem';
import axios from 'axios';
import FormGenerate from './formGenerate';
import { useSnackbar } from 'notistack';

export default function Update() {
	const { enqueueSnackbar } = useSnackbar();
	const [data, setData] = useState({
		required: {},
	});
	const [status, setStatus] = useState('working');
	const [extraData, setExtraData] = useState({
		authors: [],
		genres: [],
		books: [],
	});
	const { type, id } = useParams();

	useEffect(() => {
		const asyncGet = async (getType, setFunc) => {
			try {
				const item = await getItem('multiple', getType);
				setFunc((prevData) => ({ ...prevData, [getType]: item }));
			} catch (e) {
				console.error(`Error fetching get data error:`, e);
			}
		};

		getItem(id, type)
			.then(function (res) {
				switch (type) {
					case 'authors':
						setData({
							required: {
								first_name: res[0].first_name,
								family_name: res[0].family_name,
							},
							date_of_birth: res[0].date_of_birth || '',
							date_of_death: res[0].date_of_death || '',
						});
						break;
					case 'genres':
						setData({
							required: {
								name: res[0].name,
							},
						});
						break;
					case 'books':
						asyncGet('authors', setExtraData);
						asyncGet('genres', setExtraData);
						setData({
							required: {
								title: res[0].title,
								summary: res[0].summary,
								isbn: res[0].isbn,
								author: res[0].author,
							},
							genre: res[0].genre || [],
						});
						break;
					case 'bookinstances':
						asyncGet('books', setExtraData);
						setData({
							required: {
								book: res[0].book,
								imprint: res[0].imprint,
								status: res[0].status,
							},
							due_back: res[0].due_back || '',
						});
						break;
					default:
						break;
				}
			})
			.catch(function (err) {
				console.error('Error while fetching initial data', err);
			});
	}, [id, type]);

	if (
		type === 'books' &&
		(!extraData['authors'].length || !extraData['genres'].length)
	) {
		return <div>Loading...</div>;
	}
	if (type === 'bookinstances' && !extraData['books'].length) {
		return <div>Loading...</div>;
	}

	return (
		<form
			className="rounded-xl font-serif text-lg font-light bg-slate-50 my-5 mx-auto p-5 min-w-fit max-w-prose flex flex-col items-center"
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
				className="rounded-full border-2 py-2 px-4 bg-green-500 text-slate-50"
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
				setStatus('complete');
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
		const putData = { ...data, ...data.required };
		delete putData.required;
		for (const key in putData) {
			if (typeof putData[key] === 'string') {
				putData[key] = putData[key].trim();
			}
		}
		if (type === 'authors') {
			if (data.date_of_birth) {
				putData.date_of_birth = new Date(data.date_of_birth);
			} else {
				delete putData.date_of_birth;
			}
			if (data.date_of_death) {
				putData.date_of_death = new Date(data.date_of_death);
			} else {
				delete putData.date_of_death;
			}
			console.log(putData);
		} else if (type === 'bookinstances') {
			if (data.due_back) {
				putData.due_back = new Date(data.due_back);
			} else {
				delete putData.due_back;
			}
		}
		if (status === 'complete') {
			if (check(type, putData)) {
				setStatus('submitting');

				axios
					.put(`http://localhost:3000/catalog/${type}/${id}/update`, putData)
					.then(function (res) {
						enqueueSnackbar(res.data, { variant: 'success' });
					})
					.catch(function (err) {
						enqueueSnackbar('Error encountered. Check console for details', {
							variant: 'error',
						});
						console.error('Error encountered during POST request', err);
					});
			}
		} else {
			enqueueSnackbar('Please fill all required fields before submitting', {
				variant: 'warning',
			});
		}
	}

	function check(type, putData) {
		if (type === 'authors') {
			if (!/[A-Za-z]{1,100}/.test(putData.first_name)) {
				console.log(`${putData.first_name} invalid first name`);
				enqueueSnackbar(
					'First Name should only have uppercase or lowercase letters with a max length of 100',
					{
						variant: 'warning',
					}
				);
				return false;
			}
			if (!/[A-Za-z]{1,100}/.test(putData.family_name)) {
				console.log(`${putData.family_name} invalid family name`);
				enqueueSnackbar(
					'Family Name should only have uppercase or lowercase letters with a max length of 100',
					{
						variant: 'warning',
					}
				);
				return false;
			}
			if (
				putData.date_of_birth &&
				putData.date_of_death &&
				!(putData.date_of_birth >= putData.date_of_death)
			) {
				enqueueSnackbar('Date of Death should not be before Date of Birth', {
					variant: 'warning',
				});
				return false;
			}
		} else if (type === 'genres') {
			if (putData.name.length < 3 || putData.name.length > 100) {
				enqueueSnackbar('Genre name should be between 3 and 100 characters', {
					variant: 'warning',
				});
				return false;
			}
		}
		enqueueSnackbar('Submitting...');
		return true;
	}
}
