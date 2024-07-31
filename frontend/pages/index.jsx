import libraryImg from '../src/assets/libraryImg.jpg';

const Index = () => {
	return (
		<div className="flex items-center">
			<img
				src={libraryImg}
				className="w-3/5 bg-cover rounded"
				alt="libraryImg"
			/>
			<h1 className="text-6xl font-extrabold text-neutral-50 m-5 inline-block">
				Welcome to <span className="text-orange-500">Bookify!</span>
			</h1>
		</div>
	);
};

export default Index;
