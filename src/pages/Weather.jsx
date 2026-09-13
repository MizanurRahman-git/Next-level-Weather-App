import { useLocation } from "react-router";
import getWeather from "../Services/getWeather";
import { useEffect, useState } from "react";
import { Cloud, Droplets, MapPin, Thermometer, Wind } from "lucide-react";

const Weather = () => {
  const info = useLocation();
  const place = info.state;
  const [weatherInfo, setWeatherInfo] = useState({});
  const {
    windSpeed,
    temperature,
    humidity,
    feelsLike,
    description,
    conditionalLabel,
  } = weatherInfo;
  
  useEffect(() => {
    if (!place) {
      return;
    }

    const fetchingWeather = async () => {
      try {
        const result = await getWeather(place);
        setWeatherInfo(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingWeather();
  }, [place]);

  const rain = ["drizzle", "rain", "freezing_rain"];

  const getRecommandations = (condition) => {
    if (!condition) {
      return;
    }

    if (condition === "snow") {
      return {
        type: "snow",
        label: "Snow",
        text: "It's snowing outside. Drive carefully.",
      };
    }

    if (rain.includes(condition)) {
      return {
        type: "rain",
        label: "Rain",
        text: "It's raining today. Take an umbrella before you leave home!",
      };
    }

    if (condition === "thunderstorm") {
      return {
        type: "thunderstorm",
        label: "Thunderstorm",
        text: "Thunderstorms are expected today. Stay indoors and avoid unnecessary travel.",
      };
    }

    if (condition === "clear") {
      return {
        type: "clear",
        label: "Clear Sky",
        text: "The sky is clear today. It's a great day to enjoy the outdoors!",
      };
    }

    if (condition === "mainly_clear") {
      return {
        type: "clear",
        label: "Mainly Clear",
        text: "The weather is mostly clear today. Enjoy your day outside!",
      };
    }

    if (condition === "partly_cloudy") {
      return {
        type: "cloudy",
        label: "Partly Cloudy",
        text: "It's partly cloudy today. You can enjoy outdoor activities comfortably.",
      };
    }

    if (condition === "cloudy") {
      return {
        type: "cloudy",
        label: "Cloudy",
        text: "It's cloudy today. The weather may change later, so keep an eye on the sky.",
      };
    }

    if (condition === "overcast") {
      return {
        type: "overcast",
        label: "Overcast",
        text: "The sky is overcast today. It may feel a little gloomy outside.",
      };
    }

    if (condition === "fog") {
      return {
        type: "fog",
        label: "Fog",
        text: "It's foggy outside. Drive carefully and maintain a safe distance.",
      };
    }

    if (condition === "haze") {
      return {
        type: "haze",
        label: "Haze",
        text: "Hazy conditions are expected today. Visibility may be reduced.",
      };
    }

    if (condition === "dust") {
      return {
        type: "dust",
        label: "Dusty",
        text: "It's dusty outside today. Consider wearing a mask if you are sensitive to dust.",
      };
    }

    if (condition === "windy") {
      return {
        type: "windy",
        label: "Windy",
        text: "It's quite windy today. Be careful around trees and loose objects.",
      };
    }

    if (condition === "freezing") {
      return {
        type: "freezing",
        label: "Freezing",
        text: "It's freezing outside. Dress warmly before heading out.",
      };
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
      <div className="px-6 py-7 sm:px-10 sm:py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
            <Cloud className="h-8 w-8 text-blue-500" strokeWidth={1.8} />
          </div>
          <div className="flex">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                Today's Weather Details
              </h2>
              <div className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin className="h-5 w-5 text-slate-400" />
                <span className="text-base font-medium sm:text-lg">
                  {place?.name}
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <h1 className="ml-7 text-xl font-medium tracking-tight text-slate-400 sm:text-xl animate-weather-text">
                {getRecommandations(weatherInfo?.condition)?.text}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden bg-linear-to-br from-blue-50 via-slate-50 to-blue-100 px-6 py-10 sm:px-10">
        <Cloud
          className="absolute -right-8 -top-8 h-48 w-48 text-white/60"
          strokeWidth={1}
        />
        <Cloud
          className="absolute -bottom-16 -right-16 h-64 w-64 text-white/40"
          strokeWidth={1}
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/70 shadow-sm backdrop-blur-sm sm:h-44 sm:w-44">
            <Cloud
              className="h-24 w-24 text-slate-400 sm:h-28 sm:w-28"
              strokeWidth={1.5}
            />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-start justify-center sm:justify-start">
              <span className="text-7xl font-bold tracking-tight text-slate-800 sm:text-8xl">
                {temperature}
              </span>
              <span className="mt-2 text-4xl font-semibold text-slate-700">
                °C
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
              {conditionalLabel}
            </h3>
            <p className="mt-1 text-lg text-slate-500"> {description} </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex items-center gap-4 px-6 py-6 sm:px-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Thermometer className="h-7 w-7 text-blue-500" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 sm:text-base">
              Feels Like
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-800">
              {feelsLike}°C
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-6 sm:px-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Droplets className="h-7 w-7 text-blue-500" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 sm:text-base">
              Humidity
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-800">
              {humidity}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-6 sm:px-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Wind className="h-7 w-7 text-blue-500" strokeWidth={1.8} />{" "}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 sm:text-base">
              Wind Speed
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-800">
              {windSpeed} km/h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
