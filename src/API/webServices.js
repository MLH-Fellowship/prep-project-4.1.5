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