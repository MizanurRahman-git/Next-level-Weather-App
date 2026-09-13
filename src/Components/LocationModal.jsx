import { X, LocateFixed } from "lucide-react";

const LocationModal = ({ setClick }) => {
  const handleTextBtn = (e) => {
    e.preventDefault();
    console.log(e.target.cityName.value);
  };

  const handleGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        console.log({latitude, longitude});
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 10000
      }
    );
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
      <div className="shadow-2xl w-100 h-75 bg-gray-100 py-2 px-5 rounded-xl">
        <div className="flex justify-between mt-3">
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
      </div>
    </div>
  );
};

export default LocationModal;
