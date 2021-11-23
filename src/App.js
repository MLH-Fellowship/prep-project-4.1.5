import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import SearchLocationInput from "./components/Autocompletion";
import { useSelector } from "react-redux";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const { city } = useSelector((state) => state.city);

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
            setResults(result);
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
      //TODO: change the color according to the temp
      <div className={`flex flex-col h-screen items-center  holder`}>
        <img
          className="w-44 mt-8 self-start mx-10"
          src={logo}
          alt="MLH Prep Logo"
        ></img>
        <div>
          <SearchLocationInput />
          <div className="Results">
            {!isLoaded && <h2 class="text-4xl text-center text-gray-400 capitalize font-bold mt-10 mb-8">Waiting for a city...</h2>}
            {console.log(results)}
            {isLoaded && results && (
              <>
                <h1 class="text-6xl text-center text-gray-800 capitalize font-bold mt-10 mb-8">{results.name}, {results.sys.country}</h1>
                <div class="flex-wrap  flex items-center md:grid grid-cols-2 gap-2 justify-center">
                  <div class="bg-gradient-to-r flex-auto  w-42 h-42  from-gray-700 to-gray-600 shadow-lg rounded-lg">
                      <div class="w-4/4 my-2">
                        <h2 class="text-lg text-center text-gray-200 capitalize">{results.weather[0].description}</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Temperature {results.main.temp}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Feels like {results.main.feels_like}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Humidity {results.main.humidity}%</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Pressure {results.main.pressure}Pa</h2>
                      </div>
                  </div>
                  <div class="bg-gradient-to-r flex-auto  w-42 h-42  from-gray-700 to-gray-600 shadow-lg rounded-lg">
                      <div class="w-4/4 my-2">
                        <h2 class="text-lg text-center text-gray-200 capitalize">{results.weather[0].description}</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Temperature {results.main.temperature}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Feels like {results.main.feels_like}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Humidity {results.main.humidity}%</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Pressure {results.main.pressure}Pa</h2>
                      </div>
                  </div>
                  <div class="bg-gradient-to-r flex-auto  w-42 h-42  from-gray-700 to-gray-600 shadow-lg rounded-lg">
                      <div class="w-4/4 my-2">
                        <h2 class="text-lg text-center text-gray-200 capitalize">{results.weather[0].description}</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Temperature {results.main.temperature}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Feels like {results.main.feels_like}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Humidity {results.main.humidity}%</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Pressure {results.main.pressure}Pa</h2>
                      </div>
                  </div>
                  <div class="bg-gradient-to-r flex-auto  w-42 h-42  from-gray-700 to-gray-600 shadow-lg rounded-lg">
                      <div class="w-4/4 my-2">
                        <h2 class="text-lg text-center text-gray-200 capitalize">{results.weather[0].description}</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Temperature {results.main.temperature}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Feels like {results.main.feels_like}°C</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Humidity {results.main.humidity}%</h2>
                        <h2 class="text-lg  text-gray-400  text-center">Pressure {results.main.pressure}Pa</h2>
                      </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
