const getGeoCoding = async(city) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    
    const data = await fetch(url)
    if(!data){
        throw new Error("Geocoding request failed!")
    }
    const result = await data.json()
    const cityInfo = result.results[0]
    
    const {longitude, latitude, name} = cityInfo;

    return {longitude, latitude, name}
};

export default getGeoCoding;