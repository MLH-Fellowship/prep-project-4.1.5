import { useEffect, useState } from "react";
import "./App.css";
import WeatherMap from "./components/map/weather-map";
import logo from "./mlh-prep.png";
import axios from "axios";

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
      console.log(res);
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
          <WeatherMap Lat={lat} Long={long} City={city} />
        </div>
      </>
    );
  }
}

export default App;
