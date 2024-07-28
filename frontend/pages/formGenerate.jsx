import PropTypes from 'prop-types';

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
					<label htmlFor="first_name">Enter first name:</label>
					<input
						autoFocus
						type="text"
						className="border-2"
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
						name="first_name"
						value={data.required.first_name || ''}
						required
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label htmlFor="family_name">Enter family name:</label>
					<input
						type="text"
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
						name="family_name"
						value={data.required.family_name || ''}
						required
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label>Enter date of birth (Optional):</label>
					<input
						type="date"
						onChange={(e) => handleChange(e.target.name, e.target.value)}
						name="date_of_birth"
						max={data.date_of_death || new Date().toISOString().split('T')[0]}
						value={data.date_of_birth || ''}
						readOnly={status === 'submitting'}
					/>
				</div>
				<div className="m-3">
					<label>Enter date of death (Optional):</label>
					<input
						type="date"
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
			<div>
				<label htmlFor="name">Enter Name: </label>
				<input
					autoFocus
					type="text"
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
					<label htmlFor="title">Enter Title: </label>
					<input
						autoFocus
						className="border-2 m-2"
						type="text"
						value={data.required.title || ''}
						name="title"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label htmlFor="summary">Enter Summary: </label>
					<textarea
						value={data.required.summary || ''}
						name="summary"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label htmlFor="isbn">Enter ISBN:</label>
					<input
						className="border-2 m-2"
						type="number"
						value={data.required.isbn || ''}
						name="isbn"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label htmlFor="author">Enter Author: </label>
					<select
						name="author"
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
						<legend>Select all applicable Genres:</legend>
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
				<div className="m-3">
					<label htmlFor="book">Select Book:</label>
					<select
						autoFocus
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
					<label htmlFor="imprint">Enter Imprint:</label>
					<input
						className="border-2 m-2"
						type="text"
						value={data.required.imprint || ''}
						name="imprint"
						required
						readOnly={status === 'submitting'}
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					/>
				</div>
				<div className="m-3">
					<label htmlFor="status">Select BookInstance Status:</label>
					<select
						name="status"
						value={data.required.status || ''}
						required
						onChange={(e) => handleChange(e.target.name, e.target.value, true)}
					>
						<option value="">--Select BookInstance--</option>
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
					<label>Enter Due Back Date(Optional):</label>
					<input
						type="date"
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
