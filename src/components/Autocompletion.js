import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCity } from "../redux/city";

function SearchLocationInput() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude , setLongitude] = useState(0);
  const [err, setErr] = useState(null);

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"], fields: ["name"], strictBounds: false }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    console.log(addressObject);
    updateQuery(query);
    dispatch(updateCity(addressObject.name));
  }

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const handleChange = (city) => {
    setQuery(city);
    console.log("our  city --------- ", city);
    dispatch(updateCity(city));
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_APIKEY}`
    )
    .then(res => res.json())
    .then(results => {
      if(results.lentgh === 0) setErr({"message": "Can't Find Location"});
      else {
        setLongitude(results[0].lon);
        setLatitude(results[0].lat);
      }
    })
  };
  return (
    <div className="search-location-input">
      <input
        className="my-10 rounded "
        ref={autoCompleteRef}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Enter a City"
        value={query}
        autocomplete={"off"}
      />
    </div>
  );
}

export default SearchLocationInput;
