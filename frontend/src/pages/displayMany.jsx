import { useState, useEffect, useRef, Fragment } from "react";
import GetItem from "./getItem";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NoPage from "./noPage";
import bookLogo from "../assets/book.jpg";
import authorLogo from "../assets/author.jpg";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";
import api from "../services/api";
import {
	FaChevronLeft,
	FaChevronRight,
	FaMagnifyingGlass,
} from "react-icons/fa6";

export default function DisplayMany() {
	const [json, setJson] = useState(null);
	const [error, setError] = useState(null);
	const [page, setPage] = useState(1);
	const [searchParams] = useSearchParams();
	const totalPages = useRef(null);

	const navigate = useNavigate();
	const { type } = useParams();
	const authorId = searchParams.get("author") || "";
	const genreId = searchParams.get("genre") || "";
	const bookId = searchParams.get("book") || "";
	let filter = "";
	if (authorId) {
		filter += "author=" + authorId;
	}
	if (genreId) {
		filter += "genre=" + genreId;
	}
	if (bookId) {
		filter += "book=" + bookId;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(`/catalog/${type}/count/?${filter}`);
				totalPages.current = Math.ceil(res.data / 10);
				const data = await GetItem("multiple", type, page, filter);
				setJson(data);
			} catch (err) {
				setError(err);
			}
		};

		if (
			type === "books" ||
			type === "genres" ||
			type === "authors" ||
			type === "bookinstances"
		)
			fetchData();
	}, [type, page, filter]);
	if (type === "books") {
		if (error) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Error occurred: {error.message}
				</div>
			);
		}

		if (!json) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Loading...
				</div>
			);
		}

		if (!json.length) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					No Books Found
				</div>
			);
		}

		return (
			<>
				<button
					onClick={() => navigate("create")}
					className="block max-w-fit mx-auto my-3 py-3 px-5 bg-green-500 text-white text-sm sm:text-lg font-semibold rounded-full"
				>
					Add a Book
				</button>
				<div className="max-w-[90%] sm:max-w-[80%] bg-slate-100 rounded-md p-2 my-2 mx-auto">
					{json.map((element) => (
						<Fragment key={element._id + "frag"}>
							<div
								key={element._id}
								onClick={() => navigate(`${element._id}`)}
								className="rounded-md flex flex-wrap sm:flex-nowrap m-2 p-2 hover:bg-slate-400 transform transition duration-300 hover:scale-105"
							>
								<img
									key={element._id + "img"}
									src={bookLogo}
									className="flex-none w-full sm:w-24 object-contain border-r-0 m-2"
									alt={element.title}
								/>
								<div
									key={element._id + "inDiv"}
									className="flex flex-col w-full items-center sm:items-start"
								>
									<h2
										key={element._id + " h2"}
										className="font-bold text-base sm:text-lg"
									>
										{element.title}
									</h2>
									<p
										key={element._id + " p"}
										className="w-3/4 text-sm sm:text-base"
									>
										{element.summary}
									</p>
								</div>
								<div
									key={element._id + "btns"}
									className="flex flex-col justify-center"
								>
									<button
										key={element._id + "update"}
										onClick={(e) => {
											navigate(`${element._id}/update`);
											e.stopPropagation();
										}}
										className="m-2 hover:text-orange-500"
									>
										<BsFillPencilFill />
									</button>
									<button
										key={element._id + "delete"}
										onClick={(e) => {
											navigate(`${element._id}/delete`);
											e.stopPropagation();
										}}
										className="m-2 hover:text-orange-500"
									>
										<BsFillTrash3Fill />
									</button>
									<button
										key={element._id + "search"}
										onClick={(e) => {
											navigate(`/bookinstances/?book=${element._id}`);
											e.stopPropagation();
										}}
										className="m-2 hover:text-orange-500"
									>
										<FaMagnifyingGlass />
									</button>
								</div>
							</div>
							<hr
								key={element._id + "hr"}
								className="w-11/12 text-zinc-800 mx-auto"
							/>
						</Fragment>
					))}
				</div>
				<Paginator />
			</>
		);
	} else if (type === "authors") {
		if (error) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Error occurred: {error.message}
				</div>
			);
		}

		if (!json) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Loading...
				</div>
			);
		}
		return (
			<>
				<button
					onClick={() => navigate("create")}
					className="block max-w-fit mx-auto my-3 py-3 px-5 bg-green-500 text-white text-sm sm:text-lg font-semibold rounded-full"
				>
					Add an Author
				</button>
				<div className="max-w-[90%] min-w-[80%] bg-slate-100 rounded-md p-2 my-2 mx-auto">
					{json.map((element) => (
						<Fragment key={element._id + "frag"}>
							<div
								key={element._id}
								onClick={() => navigate(`/books/?author=${element._id}`)}
								className="rounded-md flex flex-wrap sm:flex-nowrap m-2 p-2 hover:bg-slate-400 transform transition duration-300 hover:scale-105"
							>
								<img
									key={element._id + "img"}
									src={authorLogo}
									alt={element.name}
									className="flex-none w-full sm:w-24 object-contain border-r-0 m-2"
								/>
								<div
									key={element._id + "inDiv"}
									className="flex flex-col w-full items-center sm:items-start"
								>
									<h2
										key={element._id + " h2"}
										className="m-b-2 text-bold text-lg"
									>
										{element.name}
									</h2>
									<p key={element._id + " p"} className="max-h-30 w-3/4">
										Date of Birth: {element.date_of_birth || "NA"}
										<br />
										Date of Death: {element.date_of_death || "NA"}
									</p>
								</div>
								<div
									key={element._id + "btns"}
									className="flex flex-col justify-center"
								>
									<button
										key={element._id + "update"}
										onClick={(e) => {
											navigate(`${element._id}/update`);
											e.stopPropagation();
										}}
										className="m-3 hover:text-orange-500"
									>
										<BsFillPencilFill />
									</button>
									<button
										key={element._id + "delete"}
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
								key={element._id + " hr"}
								className="w-11/12 text-zinc-800 mx-auto"
							/>
						</Fragment>
					))}
				</div>
				<Paginator />
			</>
		);
	} else if (type === "genres") {
		if (error) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Error occurred: {error.message}
				</div>
			);
		}

		if (!json) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Loading...
				</div>
			);
		}
		return (
			<>
				<button
					onClick={() => navigate("create")}
					className="block max-w-fit mx-auto my-3 py-3 px-5 bg-green-500 text-white text-sm sm:text-lg font-semibold rounded-full"
				>
					Add a Genre
				</button>
				<div className="max-w-md mx-auto flex flex-col rounded-md items-center bg-slate-50 my-5">
					{json.map((element) => (
						<div
							key={element._id}
							onClick={() => navigate(`/books/?genre=${element._id}`)}
							className="flex justify-around hover:bg-slate-400 rounded-full m-5 p-2 w-11/12 transform transition duration-300 hover:scale-105"
						>
							<div
								key={element._id + " inDiv"}
								className="rounded-full m-5 p-2 w-3/4 "
							>
								<h2
									key={element._id + " h2"}
									className="font-bold text-lg m-2 text-center"
								>
									{element.name}
								</h2>
							</div>
							<div
								key={element._id + "btns"}
								className="flex flex-col justify-center"
							>
								<button
									key={element._id + "update"}
									onClick={(e) => {
										navigate(`${element._id}/update`);
										e.stopPropagation();
									}}
									className="m-3 hover:text-orange-500"
								>
									<BsFillPencilFill />
								</button>
								<button
									key={element._id + "delete"}
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
				<Paginator />
			</>
		);
	} else if (type === "bookinstances") {
		if (error) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Error occurred: {error.message}
				</div>
			);
		}

		if (!json || !json.every((item) => item.book)) {
			return (
				<div className="max-w-full sm:max-w-[60%] bg-slate-100 rounded-md p-4 sm:p-10 my-4 sm:my-auto mx-auto text-center text-xl font-mono">
					Loading...
				</div>
			);
		}
		if (!json.length) {
			return (
				<div className="max-w-[60%] min-w-[50%] bg-slate-100 rounded-md p-10 my-auto mx-auto text-center text-xl font-mono">
					No Book Instances Found
				</div>
			);
		}
		return (
			<>
				<button
					onClick={() => navigate("create")}
					className="block max-w-fit mx-auto my-3 py-3 px-5 bg-green-500 text-white text-sm sm:text-lg font-semibold rounded-full"
				>
					Add Another Book Instance
				</button>
				<div className="max-w-[90%] min-w-[80%] bg-slate-100 rounded-md p-2 my-2 mx-auto">
					{json.map((element) => (
						<Fragment key={element._id + "frag"}>
							<div
								key={element._id}
								onClick={() => navigate(`${element._id}`)}
								className="rounded-md flex flex-wrap sm:flex-nowrap m-2 p-2 hover:bg-slate-400 transform transition duration-300 hover:scale-105"
							>
								<img
									src={bookLogo}
									className="flex-none w-full sm:w-24 object-contain border-r-0 m-2"
									key={element._id + " img"}
									alt={element.book.title}
								/>
								<div
									key={element._id + " inDiv"}
									className="flex flex-col w-full items-center sm:items-start"
								>
									<h2
										className="m-b-2 text-bold text-lg"
										key={element._id + " h2"}
									>
										{element.book.title}
									</h2>
									<p key={element._id + " p"} className="w-3/4">
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
								key={element._id + " hr"}
							/>
						</Fragment>
					))}
				</div>
				<Paginator />
			</>
		);
	} else {
		return <NoPage />;
	}

	function Paginator() {
		const pages = [];
		for (let i = 1; i <= totalPages.current; i++) {
			pages.push(
				<li key={"pg" + i}>
					<button
						key={"pg" + i + "btn"}
						onClick={() => {
							if (i !== page) setPage(i);
						}}
						className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						{i}
					</button>
				</li>
			);
		}

		return (
			<nav className="mx-auto my-5">
				<ul className="flex items-center -space-x-px h-10 text-base">
					<li>
						<button
							onClick={() =>
								setPage((prevPage) => {
									if (prevPage > 1) prevPage--;
									return prevPage;
								})
							}
							className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<FaChevronLeft />
						</button>
					</li>
					{pages}
					<li>
						<button
							onClick={() =>
								setPage((prevPage) => {
									if (prevPage < totalPages.current) prevPage++;
									return prevPage;
								})
							}
							className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<FaChevronRight />
						</button>
					</li>
				</ul>
			</nav>
		);
	}
}
