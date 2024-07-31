import logo from './assets/logo.png';
import {
	FaFacebook,
	FaInstagram,
	FaXTwitter,
	FaGithub,
	FaYoutube,
	FaLinkedin,
} from 'react-icons/fa6';

export function Header() {
	return (
		<header className="flex justify-start max-h-20 items-center text-slate-50 border-b-2 border-slate-700 p-4">
			<img className="h-14 w-12 ml-4" src={logo} alt="logo" />
			<h1 className="font-extrabold text-4xl text-orange-500 m-2">Bookify</h1>
			<ul className="list-none w-full flex justify-around items-center font-serif text-xl">
				<li className="hover:text-yellow-400">
					<a href="/">Home</a>
				</li>
				<li className="hover:text-yellow-400">
					<a href="/authors">Authors</a>
				</li>
				<li className="hover:text-yellow-400">
					<a href="/genres">Genres</a>
				</li>
				<li className="hover:text-yellow-400">
					<a href="/books">Books</a>
				</li>
				<li className="hover:text-yellow-400">
					<a href="/bookinstances">Book Instances</a>
				</li>
				<li className="hover:text-yellow-400">
					<a href="/contact">Contact Us</a>
				</li>
			</ul>
		</header>
	);
}

export function Footer() {
	return (
		<footer className="max-h-20 flex flex-row-reverse justify-between items-center text-slate-200 border-t-2 border-slate-700 mt-auto">
			<div className="my-8 text-xl flex *:mx-5">
				<a target="_blank" href="https://www.facebook.com">
					<FaFacebook />
				</a>
				<a target="_blank" href="https://www.instagram.com">
					<FaInstagram />
				</a>
				<a target="_blank" href="https://www.x.com">
					<FaXTwitter />
				</a>
				<a target="_blank" href="https://github.com/MayukhChaturvedi/Bookify">
					<FaGithub />
				</a>
				<a target="_blank" href="https://www.youtube.com">
					<FaYoutube />
				</a>
				<a
					target="_blank"
					href="https://www.linkedin.com/in/mayukh-chaturvedi/"
				>
					<FaLinkedin />
				</a>
			</div>
			<div className="my-8 ml-4">
				&copy; 2024 Bookify, Inc. All rights reserved.
			</div>
		</footer>
	);
}
