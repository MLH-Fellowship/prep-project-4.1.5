
import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import SearchLocationInput from "./components/Autocompletion";
import { useDispatch, useSelector } from "react-redux";
import { updateResults } from "./redux/ApiResults";
import Details from "./components/Details";
import WeatherMap from './components/map/weather-map';
import AccesorySuggestion from './components/AccesorySuggestion/AccesorySuggestion';
import axios from 'axios';
import HourlyWeather from './components/HourlyWeather/index';
import './components/HourlyWeather/index.css';


// contains the varying background images for different types of weather conditions
const weatherBackgroundImgs = {
	Clear: "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png",
	Sunny: 	"https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png",
	Rain: "https://www.pngall.com/wp-content/uploads/2017/03/Raindrops.png",
	Clouds: "https://i.ibb.co/zSYkKBq/cloud2.png",
  Snow: "https://i.ibb.co/g3CK150/kisspng-pattern-the-winter-snow-5a697dca8fb685-7309573915168629225887-1.png"
}


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const { city } = useSelector((state) => state.city);
  const { results: ReduxRes } = useSelector((state) => state.results);
  const dispatch = useDispatch();
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [resultsBackgroundImg, setResultsBackgroundImg] = useState("");

  	//reverse geolocation to initialize current city
	function initialize(lat, long) {
		const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${process.env.REACT_APP_APIKEY}`;

		// axios.get(url).then((res) => {
		// 	setCity(res.data[0].name);
		// });
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			let x = pos.coords.latitude;
			let y = pos.coords.longitude;
			initialize(x, y);
		});
	}, []);


  useEffect(() => {
    // TODO USE THE IMPLEMENTED API CALL IN WEBSERVICES FILE
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
            dispatch(updateResults(result));
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
    // FIXME: remove dispatch from dependencies
  }, [city, dispatch]);

  const getTheme = () => {
    const temp = results ? results.main.temp : ReduxRes.main.temp;
    //! FIXME: get theme from redux if not from api call
    console.log("----------------TEMP", temp);
    if (temp > 30) {
      return "hot";
    } else if (temp > 20) {
      return "warm";
    } else if (temp > 10) {
      return "cold";
    } else {
      return "freezing";
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (

      <div className={`flex flex-col h-full items-center z-0 body ${getTheme()}`}>
        <img className="w-full z-10 absolute " src={`${resultsBackgroundImg}`} alt="aa"></img>
        <img
          className="w-44 mt-8 self-start mx-10 z-30"
          src={logo}
          alt="MLH Prep Logo"
          ></img>
        <div class="flex flex-wrap justify-center z-20">
          <SearchLocationInput />
          <div class="w-full min-h-screen">
            {!isLoaded && (
              <h2 class="text-4xl text-center text-gray-400 capitalize font-bold mt-10 mb-8">
                Waiting for a city...
              </h2>
            )}
            {console.log(results)}
            {isLoaded && results && <Details />}
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
      // </div>
    );
  }
}

export default App;
