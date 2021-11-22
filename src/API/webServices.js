export const getCityCoordinates = async (city) => {
    return new Promise( async function(resolve, reject){
        fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_APIKEY}`
        )
            .then(res => res.json())
            .then(results => {
            if(results.lentgh === 0) {
                reject(new Error("Can't find City"))
            }
            else {
                resolve({
                    results
                    // lon : results[0].lon,
                    // lat : results[0].lat
                })
            }
        })
    });
}

// pass 'F' for "Fahrenheit" and 'C' for "Celsius"
export const getCityResults = async (longitude, latitude, unit) => {
    unit = unit === 'F' ? "imperial" : "metric";
    return new Promise( async function(resolve, reject){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${process.env.REACT_APP_APIKEY}`
        )
            .then(res => res.json())
            .then(results => {
            if(results.lentgh === 0) {
                reject(new Error("Can't find City"))
            }
            else {
                resolve({
                    results
                })
            }
        })
    });
}