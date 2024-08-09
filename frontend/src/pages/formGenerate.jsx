import PropTypes from 'prop-types';
import { FaAsterisk } from 'react-icons/fa6';

export default function FormGenerate({
	type,
	data,
	extraData,
	handleChange,
	handleGenreChange,
	status,
}) {
	if (type === 'authors') {
		return (
			<>
				<div className="m-3">
					<label className="flex" htmlFor="first_name">
						Enter first name
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<input
						autoFocus
						type="text"
						className="border-2 border-neutral-400 rounded-xl"
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
						name="first_name"
						value={data.required.first_name || ''}
						required
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="family_name">
						Enter family name
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<input
						type="text"
						className="border-2 border-neutral-400 rounded-xl"
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
						name="family_name"
						value={data.required.family_name || ''}
						required
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label className="block">Enter date of birth</label>
					<input
						type="date"
						className="border-2 border-neutral-400 rounded-xl"
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						name="date_of_birth"
						max={data.date_of_death || new Date().toISOString().split('T')[0]}
						value={data.date_of_birth || ''}
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label className="block">Enter date of death</label>
					<input
						type="date"
						className=" border-2 border-neutral-400 rounded-xl"
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						name="date_of_death"
						min={data.date_of_birth || ''}
						max={new Date().toISOString().split('T')[0]}
						value={data.date_of_death || ''}
						readOnly={status === 'submitting'}
					/>
				</div>
			</>
		);
	} else if (type === 'genres') {
		return (
			<div className="my-10">
				<label className="flex" htmlFor="name">
					Enter Name
					<span className="text-red-600 scale-75">
						<FaAsterisk />
					</span>
				</label>
				<input
					autoFocus
					type="text"
					className="border-2 border-neutral-400 rounded-xl"
					value={data.required?.name || ''}
					name="name"
					readOnly={status === 'submitting'}
					onChange={(e) => handleChange(e.target.name, e.target.value, true)}
				/>
			</div>
		);
	} else if (type === 'books') {
		const authorOptions = extraData['authors'].map((element) => (
			<option key={element._id} value={element._id}>
				{element.name}
			</option>
		));
		const genreOptions = extraData['genres'].map((element) => (
			<div key={element._id}>
				<input
					type="checkbox"
					className="border-2 border-neutral-400 rounded-xl"
					id={element._id}
					name="genre"
					value={element._id}
					checked={data.genre.includes(element._id)}
					onChange={(e) => handleGenreChange(e.target.value, e.target.checked)}
				/>
				<label htmlFor={element._id}>{element.name}</label>
			</div>
		));
		return (
			<>
				<div className="m-3">
					<label className="flex" htmlFor="title">
						Enter Title
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<input
						autoFocus
						className="border-2 border-neutral-400 rounded-xl"
						type="text"
						value={data.required.title || ''}
						name="title"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="summary">
						Enter Summary
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<textarea
						value={data.required.summary || ''}
						name="summary"
						className="border-2 border-neutral-400 rounded-xl"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="isbn">
						Enter ISBN
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<input
						className="border-2 border-neutral-400 rounded-xl font-sans font-normal"
						type="number"
						value={data.required.isbn || ''}
						name="isbn"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="author">
						Enter Author
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<select
						name="author"
						className="border-2 border-neutral-400 rounded-xl"
						required
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
						value={data.required.author || ''}
					>
						<option value="">--Select Author--</option>
						{authorOptions}
					</select>
				</div>
				<div className="m-3">
					<fieldset>
						<legend className="mb-2">Select all applicable Genres</legend>
						{genreOptions}
					</fieldset>
				</div>
			</>
		);
	} else if (type === 'bookinstances') {
		const bookOptions = extraData['books'].map((element) => (
			<option key={element._id} value={element._id}>
				{element.title}
			</option>
		));
		return (
			<>
				<div className="m-3 max-w-[50%]">
					<label className="flex" htmlFor="book">
						Select Book
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<select
						autoFocus
						className="border-2 border-neutral-400 rounded-xl max-w-full"
						name="book"
						value={data.required.book || ''}
						required
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					>
						<option value="">--Select Book--</option>
						{bookOptions}
					</select>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="imprint">
						Enter Imprint
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<input
						className="border-2 border-neutral-400 rounded-xl"
						type="text"
						value={data.required.imprint || ''}
						name="imprint"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label className="flex" htmlFor="status">
						Select Status
						<span className="text-red-600 scale-75">
							<FaAsterisk />
						</span>
					</label>
					<select
						name="status"
						className="border-2 border-neutral-400 rounded-xl"
						value={data.required.status || ''}
						required
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					>
						<option value="">--Select Status--</option>
						{['Available', 'Maintenance', 'Loaned', 'Reserved'].map(
							(element) => (
								<option key={element} value={element}>
									{element}
								</option>
							)
						)}
						;
					</select>
				</div>
				<div className="m-3">
					<label className="block">Enter Due Back Date</label>
					<input
						type="date"
						className="border-2 border-neutral-400 rounded-xl"
						value={data.due_back}
						name="due_back"
						onChange={(e) => handleChange(e.target.name, e.target.value)}
					/>
				</div>
			</>
		);
	}
}

FormGenerate.propTypes = {
	type: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	extraData: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleGenreChange: PropTypes.func.isRequired,
	status: PropTypes.string.isRequired,
};
