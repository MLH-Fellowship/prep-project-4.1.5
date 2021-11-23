import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import SearchLocationInput from "./components/Autocompletion";
import { useDispatch, useSelector } from "react-redux";
import { updateResults } from "./redux/ApiResults";
import Details from "./components/Details";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const { city } = useSelector((state) => state.city);
  const dispatch = useDispatch();
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
      <div className={`flex flex-col h-screen items-center body`}>
        <img
          className="w-44 mt-8 self-start mx-10"
          src={logo}
          alt="MLH Prep Logo"
        ></img>
        <div class="flex flex-wrap justify-center">
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
      </div>
    );
  }
}

export default App;
