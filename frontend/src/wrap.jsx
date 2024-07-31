import logo from './assets/logo.png';

export function Header() {
	return (
		<header className="flex justify-start h-20 items-center text-slate-50 border-b-2 border-slate-700 p-4">
			<img className="h-14 w-10 m-4" src={logo} alt="logo" />
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
