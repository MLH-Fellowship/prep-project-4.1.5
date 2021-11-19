import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import AccesorySuggestion from "./components/AccesorySuggestion/AccesorySuggestion";

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [city, setCity] = useState("New York City");
	const [results, setResults] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
					city +
					"&units=metric" +
					"&appid=" +
					process.env.REACT_APP_APIKEY
			)
				.then((res) => res.json())
				.then(
					(result) => {
						if (result["cod"] !== 200) {
							setIsLoaded(false);
						} else {
							setIsLoaded(true);
							setResults(result);
						}
					},
					(error) => {
						setIsLoaded(true);
						setError(error);
					}
				);
		};

		fetchData();
	}, [city]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<>
				<img className='logo' src={logo} alt='MLH Prep Logo'></img>
				<div>
					<h2>Enter a city below 👇 </h2>
					<input
						type='text'
						value={city}
						onChange={(event) => setCity(event.target.value)}
					/>
					<div className='Results'>
						{!isLoaded && <h2>Loading...</h2>}
						{console.log(results)}
						{isLoaded && results && (
							<>
								<h3>{results.weather[0].main}</h3>
								<p>Feels like {results.main.feels_like}°C</p>
								<i>
									<p>
										{results.name}, {results.sys.country}
									</p>
								</i>

								{/* <AccesorySuggestion results={results} /> */}
							</>
						)}
					</div>
					<div className='AccesorySuggestion'>
						{results ? <AccesorySuggestion results={results} /> : <h2></h2>}
					</div>
				</div>
			</>
		);
	}
}

export default App;
