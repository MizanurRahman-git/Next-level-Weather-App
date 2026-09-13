import { X, LocateFixed } from "lucide-react";
import getGeoCoding from "../Services/getGeoCoding";
import { useState } from "react";
import { useNavigate } from "react-router";

const LocationModal = ({ setClick }) => {
    const navigate = useNavigate()
    const [error, setError] = useState('')

  const handleTextBtn = async(e) => {
    e.preventDefault();
    const cityName = e.target.cityName.value
    if(!cityName){
        setError("Please Enter your City Name")
        return
    }
    try {
        const cityInfo = await getGeoCoding(cityName)
        if(!cityInfo){
           setError('Something went wrong!')
           return
        }
        navigate('/weather', {state:cityInfo})
    } catch (error) {
        setError(error);
    }
    
  };

  const handleGeoLocation = () => {
    if(!navigator.geolocation){
        setError("Geo Location Not Found!")
        return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        navigate('/weather',{state:{latitude, longitude, name:"Your Location"}});
      },
      (error) => {
        setError(error.message);
      },
      {
        timeout: 10000
      }
    );
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      <div className="shadow-2xl w-100  bg-gray-100 py-6 px-5 rounded-xl">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium">Where are you today....</h1>
          <button onClick={() => setClick(false)} className="cursor-pointer">
            <X />
          </button>
        </div>
        <form onSubmit={handleTextBtn} className="mt-2.5">
          <input
            type="text"
            name="cityName"
            placeholder="Enter Your City Name"
            className="border w-full py-1 px-4 rounded-2xl"
          />
          <div className="text-center mt-1.5">
            <button className="w-full text-lg font-medium px-5 py-1 bg-blue-500 rounded-3xl text-gray-100 cursor-pointer hover:scale-105 transition-all delay-75">
              Get Weather
            </button>
          </div>
        </form>
        <div className="text-center my-5">
          <p>Or</p>
        </div>
        <div className="text-center mt-1.5">
          <button
            onClick={handleGeoLocation}
            className="flex justify-center items-center w-full text-lg font-medium px-5 py-1 bg-blue-500 rounded-3xl text-gray-100 cursor-pointer hover:scale-105 transition-all delay-75"
          >
           <LocateFixed /> Use my Location
          </button>
        </div>
        <p className="text-red-600 text-center">{error}</p>
      </div>
    </div>
  );
};

export default LocationModal;
