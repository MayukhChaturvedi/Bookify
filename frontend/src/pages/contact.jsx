import { useSnackbar } from 'notistack';
import { FaEnvelope, FaUser, FaPhone } from 'react-icons/fa6';
import { useState } from 'react';

export default function Contact() {
	const { enqueueSnackbar } = useSnackbar();
	const [data, setData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
	});
	const [status, setStatus] = useState('working');
	return (
		<form
			onSubmit={(e) => handleSubmit(e)}
			className="rounded-xl text-lg font-light bg-slate-50 my-10 mx-auto px-12 py-10 flex flex-col items-center w-fit"
		>
			<h2 className="text-5xl font-semibold text-neutral-800 m-4">
				Contact Us
			</h2>
			<p className="text-neutral-800 text-lg font-semibold block">
				We will get back to you asap!
			</p>
			<div className="mt-16 w-full relative">
				<label className="absolute left-2 top-[32%] text-neutral-400">
					<FaUser />
				</label>
				<input
					id="first_name"
					name="first_name"
					required
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					placeholder="First Name"
					value={data.first_name}
					readOnly={status === 'submitting'}
					className="border-2 rounded-md pl-8 pr-2 py-2 mr-2"
				/>
				<input
					name="last_name"
					id="last_name"
					placeholder="Last Name"
					required
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					value={data.last_name}
					readOnly={status === 'submitting'}
					className="border-2 rounded-md pl-8 pr-2 py-2 mr-2"
				/>
			</div>
			<div className="w-full mt-7 relative">
				<label className="absolute left-2 top-[32%] text-neutral-400">
					<FaEnvelope />
				</label>
				<input
					id="email"
					name="email"
					placeholder="Email"
					required
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					type="email"
					value={data.email}
					readOnly={status === 'submitting'}
					className="border-2 rounded-md pl-8 pr-2 py-2 mr-2 w-full"
				/>
			</div>
			<div className="w-full mt-7 relative">
				<label className="absolute left-2 top-[32%] text-neutral-400">
					<FaPhone />
				</label>
				<input
					id="phone"
					name="phone"
					placeholder="Phone"
					required
					onChange={(e) => handleChange(e.target.name, e.target.value)}
					type="tel"
					value={data.phone}
					readOnly={status === 'submitting'}
					className="border-2 rounded-md pl-8 pr-2 py-2 mr-2 w-full"
				/>
			</div>
			<button
				type="submit"
				className="rounded-md w-full font-semibold border-2 py-2 px-4 bg-green-500 text-slate-50 m-4"
			>
				Send
			</button>
			<p className="text-neutral-800 text-sm font-light max-w-[80%] text-center mx-auto">
				You may also call us at +91-9876543210 or email us at dummy@dummy.com
			</p>
		</form>
	);
	function handleChange(name, value) {
		setData((prevData) => {
			const newData = { ...prevData };
			newData[name] = value;
			if (Object.values(newData).every((val) => val)) {
				setStatus('complete');
			}
			return newData;
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		const postData = { ...data };
		for (const key in postData) {
			if (typeof postData[key] === 'string') {
				postData[key] = postData[key].trim();
			}
		}
		if (Object.values(postData).every((val) => val)) {
			enqueueSnackbar('Submitted successfully', {
				variant: 'success',
			});
			setStatus('complete');
		} else {
			enqueueSnackbar('Please fill all required details before submitting', {
				variant: 'warning',
			});
		}
	}
}
