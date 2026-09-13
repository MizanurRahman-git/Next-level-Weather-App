import { useState } from "react";
import LocationModal from "../Components/LocationModal";

const Home = () => {
    const [click, setClick] = useState(false)

    return (
        <div>
            <h1 className="text-6xl font-extrabold text-blue-200">NextLevel <span className="text-blue-500">Weather</span></h1>
            <p className="text-center text-md py-4 font-semibold">Check Your Weather Today in NextLevel </p>

            <div className="text-center">
                <button onClick={()=>setClick(true)} className="text-lg font-medium px-5 py-2 bg-blue-500 rounded-3xl text-gray-100 hover:scale-105 transition-all delay-75 cursor-pointer">
                    Check Weather
                </button>
            </div>

            {
                click && <LocationModal setClick={setClick}/>
            }
        </div>
    );
};

export default Home;