import { useEffect, useState } from 'react';
import './App.css';

import WeatherMap from './components/map/weather-map';
import AccesorySuggestion from './components/AccesorySuggestion/AccesorySuggestion';
import logo from './mlh-prep.png';
import axios from 'axios';

import HourlyWeather from './components/HourlyWeather/index';
import './components/HourlyWeather/index.css';

// contains the varying background images for different types of weather conditions
const weatherBackgroundImgs = {
	Clear: "https://images.unsplash.com/photo-1503435538086-21e860401a47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	Sunny: 	"https://images.unsplash.com/photo-1465577512280-1c2d41a79862?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2047&q=80",
	Rain: "https://images.unsplash.com/photo-1496034663057-6245f11be793?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	Clouds: "https://www.publicdomainpictures.net/pictures/30000/velka/cloudy-day-5.jpg"
}

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [city, setCity] = useState("");
	const [results, setResults] = useState(null);
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [resultsBackgroundImg, setResultsBackgroundImg] = useState("");

	//reverse geolocation to initialize current city
	function initialize(lat, long) {
		const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${process.env.REACT_APP_APIKEY}`;

		axios.get(url).then((res) => {
			setCity(res.data[0].name);
		});
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			let x = pos.coords.latitude;
			let y = pos.coords.longitude;
			initialize(x, y);
		});
	}, []);

	useEffect(() => {
		const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;

		if (city) {
			const fetchData = async () => {
				fetch(BASE_URL)
					.then((res) => res.json())
					.then(
						(result) => {
							if (result["cod"] !== 200) {
								setIsLoaded(false);
							} else {
								setIsLoaded(true);
								setResults(result);

								setResultsBackgroundImg(weatherBackgroundImgs[result.weather[0].main]);
								const { coord } = result; //long lat
								const { lat, lon } = coord;
								setLat(lat);
								setLong(lon);
							}
						},
						(error) => {
							setIsLoaded(true);
							setError(error);
						}
					);
			};
			fetchData();
		} else {
			return;
		}
	}, [city]);


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <div className="ResultsContainer">
		  	<div className="Results" style={{backgroundImage: `url(${resultsBackgroundImg})`}}>
              {!isLoaded && <h2>Loading...</h2>}
              {console.log(results)}
              {isLoaded && results && (
                <>
				{console.log(resultsBackgroundImg)}
                  <h3>{results.weather[0].main}</h3>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <i>
                    <p>
                      {results.name}, {results.sys.country}
                    </p>
                  </i>
                </>
              )}
            </div>
          </div>
          <WeatherMap Lat={lat} Long={long} City={city} />
          <div className="hourly-weather">
          {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && <>
              <HourlyWeather placename={ results.name } />
            </>}
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
