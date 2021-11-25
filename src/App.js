import { useEffect, useState, useMemo, useCallback } from "react";
import debounce from 'lodash.debounce';
import "./App.css";

import WeatherMap from "./components/map/weather-map";
import AccesorySuggestion from "./components/AccesorySuggestion/AccesorySuggestion";
import logo from "./mlh-prep.png";
import axios from "axios";

import HourlyWeather from "./Components/HourlyWeather/index";
import "./Components/HourlyWeather/index.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

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

  const fetchData = useCallback(async () => {
    // console.log(`Fetching for ${city}  .....`);
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
    fetch(BASE_URL)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);

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
  }, [city, setIsLoaded, setResults, setLat, setError, setLong])

  const debouncedEventHandler = useMemo(() => debounce(fetchData, 1000), [fetchData]);

  useEffect(() => {
    if (city) {
      debouncedEventHandler();
    } else {
      return;
    }
  }, [city, debouncedEventHandler]);

  useEffect(() => {
    // cleanup
    return () => {
      debouncedEventHandler.cancel();
    }
  }, [debouncedEventHandler]);


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
            onChange={event => { setCity(event.target.value) }}
          />
          <div className="ResultsContainer">
            <div className="Results">
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
                </>
              )}
            </div>
          </div>
          <WeatherMap Lat={lat} Long={long} City={city} />
          <div className="hourly-weather">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && <>
              <HourlyWeather placename={results.name} />
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
