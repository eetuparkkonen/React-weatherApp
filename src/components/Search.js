import clouds from '../img/clouds.jpg';
import clear from '../img/clear.jpg';
import rain from '../img/rain.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config();

function Search() {
	const [query, setQuery] = useState('');

	const [weatherData, setWeatherData] = useState({
		city: '',
		temp: '',
		sky: '',
		country: '',
		description: '',
	});

	const searchWeatherCoords = async (lat, lon) => {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
		);
		console.log(data);
		setWeatherData({
			city: data.timezone,
			temp: data.current.temp,
			sky: data.current.clouds,
			country: '',
			description: data.current.weather[0].main,
		});
	};

	useEffect(() => {
		const showPosition = (pos) => {
			searchWeatherCoords(pos.coords.latitude, pos.coords.longitude);
		};
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			}
		}
		getLocation();
	}, []);

	const searchWeather = (e) => {
		e.preventDefault();
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
					query
				)}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((result) => {
				setWeatherData({
					city: result.data.name,
					temp: result.data.main.temp,
					sky: result.data.weather[0].main,
					country: result.data.sys.country,
					description: result.data.weather[0].description,
				});
				setQuery('');
				console.log(result.data);
			})
			.catch(() =>
				toast.error('The city you searched does not exist', {
					position: 'top-center',
					autoClose: 3500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			);
		setQuery('');
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen '>
			{weatherData.sky >= 50 && (
				<img className='img' src={clouds} alt='cloudy sky' />
			)}

			{weatherData.sky === 'Clouds' && (
				<img className='img' src={clouds} alt='cloudy sky' />
			)}

			{weatherData.sky === 'Clear' && (
				<img className='img ' src={clear} alt='clear sky'></img>
			)}

			{weatherData.sky === 'Rain' && (
				<img className='img ' src={rain} alt='rainy sky'></img>
			)}

			<div className='w-full flex flex-col items-center justify-center  z-10'>
				{typeof weatherData.city !== 'undefined' ? (
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-6xl font-lato text-gray-50'>
							{weatherData.city} {weatherData.country}
						</h1>
						<h2 className='text-4xl mt-6 font-lato text-gray-400 capitalize'>
							{weatherData.description}
						</h2>
						<p className='text-5xl mt-10 font-lato text-gray-50'>
							{Math.round(weatherData.temp)} &deg;C
						</p>
					</div>
				) : (
					<div>
						<h1>Search for city</h1>
					</div>
				)}
			</div>
			<form
				onSubmit={searchWeather}
				className='w-full flex flex-col items-center justify-center mt-10  z-10'
			>
				<input
					className=' h-12 px-4 mb-2  placeholder-gray-600 border rounded-lg block text-gray-700 text-lg font-bold mb-2 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
					type='text'
					placeholder='Search...'
					onChange={(e) => setQuery(e.target.value)}
					value={query}
				/>
				<button className='mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
					Search weather
				</button>
			</form>
			<ToastContainer
				position='top-center'
				autoClose={3500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default Search;
