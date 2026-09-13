const WMO_CODES = {
    0: {
        condition: "clear",
        description: "Clear sky",
        label: "Clear Sky",
        icon: "clear",
    },

    1: {
        condition: "mainly_clear",
        description: "Mainly clear",
        label: "Mainly Clear",
        icon: "mainly_clear",
    },

    2: {
        condition: "partly_cloudy",
        description: "Partly cloudy",
        label: "Partly Cloudy",
        icon: "partly_cloudy",
    },

    3: {
        condition: "overcast",
        description: "Overcast",
        label: "Overcast",
        icon: "overcast",
    },

    45: {
        condition: "fog",
        description: "Fog",
        label: "Fog",
        icon: "fog",
    },

    48: {
        condition: "depositing_rime_fog",
        description: "Depositing rime fog",
        label: "Depositing Rime Fog",
        icon: "depositing_rime_fog",
    },

    51: {
        condition: "drizzle",
        description: "Light drizzle",
        label: "Light Drizzle",
        icon: "drizzle",
    },

    53: {
        condition: "drizzle",
        description: "Moderate drizzle",
        label: "Moderate Drizzle",
        icon: "drizzle",
    },

    55: {
        condition: "drizzle",
        description: "Dense drizzle",
        label: "Dense Drizzle",
        icon: "drizzle",
    },

    56: {
        condition: "freezing_drizzle",
        description: "Light freezing drizzle",
        label: "Light Freezing Drizzle",
        icon: "freezing_drizzle",
    },

    57: {
        condition: "freezing_drizzle",
        description: "Dense freezing drizzle",
        label: "Dense Freezing Drizzle",
        icon: "freezing_drizzle",
    },

    61: {
        condition: "rain",
        description: "Slight rain",
        label: "Slight Rain",
        icon: "rain",
    },

    63: {
        condition: "rain",
        description: "Moderate rain",
        label: "Moderate Rain",
        icon: "rain",
    },

    65: {
        condition: "rain",
        description: "Heavy rain",
        label: "Heavy Rain",
        icon: "rain",
    },

    66: {
        condition: "freezing_rain",
        description: "Light freezing rain",
        label: "Light Freezing Rain",
        icon: "freezing_rain",
    },

    67: {
        condition: "freezing_rain",
        description: "Heavy freezing rain",
        label: "Heavy Freezing Rain",
        icon: "freezing_rain",
    },

    71: {
        condition: "snow",
        description: "Slight snowfall",
        label: "Slight Snowfall",
        icon: "snow",
    },

    73: {
        condition: "snow",
        description: "Moderate snowfall",
        label: "Moderate Snowfall",
        icon: "snow",
    },

    75: {
        condition: "snow",
        description: "Heavy snowfall",
        label: "Heavy Snowfall",
        icon: "snow",
    },

    77: {
        condition: "snow_grains",
        description: "Snow grains",
        label: "Snow Grains",
        icon: "snow_grains",
    },

    80: {
        condition: "rain_showers",
        description: "Slight rain showers",
        label: "Slight Rain Showers",
        icon: "rain_showers",
    },

    81: {
        condition: "rain_showers",
        description: "Moderate rain showers",
        label: "Moderate Rain Showers",
        icon: "rain_showers",
    },

    82: {
        condition: "rain_showers",
        description: "Violent rain showers",
        label: "Violent Rain Showers",
        icon: "rain_showers",
    },

    85: {
        condition: "snow_showers",
        description: "Slight snow showers",
        label: "Slight Snow Showers",
        icon: "snow_showers",
    },

    86: {
        condition: "snow_showers",
        description: "Heavy snow showers",
        label: "Heavy Snow Showers",
        icon: "snow_showers",
    },

    95: {
        condition: "thunderstorm",
        description: "Slight or moderate thunderstorm",
        label: "Thunderstorm",
        icon: "thunderstorm",
    },

    96: {
        condition: "thunderstorm_hail",
        description: "Thunderstorm with slight hail",
        label: "Thunderstorm with Slight Hail",
        icon: "thunderstorm_hail",
    },

    99: {
        condition: "thunderstorm_hail",
        description: "Thunderstorm with heavy hail",
        label: "Thunderstorm with Heavy Hail",
        icon: "thunderstorm_hail",
    },
};


const getWeather = async(info) => {
    const {longitude, latitude} = info;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,weather_code,wind_speed_10m,rain,relative_humidity_2m,apparent_temperature,is_day`;

    const result = await fetch(url)
    const data = await result.json();
    const weatherDetails = data.current;
    if(!weatherDetails){
        throw new Error("Weather Not Found!")
    }

    const {wind_speed_10m, temperature_2m, relative_humidity_2m, apparent_temperature, weather_code} = weatherDetails;

    const weather = WMO_CODES[weather_code]
    const {condition, description, label} = weather;

    const icon = weather.icon === "clear" && weatherDetails.is_day === 0 ? "Clear_Night" : weather.icon

    return {
        temperature : Math.round(temperature_2m),
        humidity: relative_humidity_2m,
        windSpeed: Math.round(wind_speed_10m),
        feelsLike: Math.round(apparent_temperature),
        condition,
        description,
        conditionalLabel : label,
        icon

    }
};

export default getWeather;