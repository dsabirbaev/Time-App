import { useState, useEffect } from "react";
import "./style.scss";
const baseURL = "https://worldtimeapi.org/api/timezone";
import axios from "axios";
const index = () => {

    const[area, setArea] = useState("");
    const[location, setLocation] = useState("");
    const[data, setData] = useState("");
 
    async function getCountryTime(){
        try{
            const response = await axios.get(`${baseURL}/${area}/${location}`);
            setData(response.data);
           
        }catch(error){
            console.log(error.message);
        } 
    }

    function handleForm(e){
        e.preventDefault();
        getCountryTime();
    }
    useEffect(() => {
        getCountryTime();
    }, []);

    const weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const datetime = new Date(data.datetime);
    return (
        <main>
            <section className="mt-5">
                <div className="container">
                    <div className="wrapper p-5 border border-sky-400 rounded-2xl">
                        <form onSubmit={handleForm} className="flex gap-x-5 mb-8">

                            <select value={area} onChange={(e) => setArea(e.target.value)} className="outline-none block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option >Choose an Area</option>
                                <option value="Africa">Africa</option>
                                <option value="America">America</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Asia">Asia</option>
                                <option value="Atlantic">Atlantic</option>
                                <option value="Australia">Australia</option>
                                <option value="Europe">Europe</option>
                                <option value="Indian">Indian</option>
                                <option value="Pacific">Pacific</option>
                            </select>

                            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter the location" />
                            <button className="w-[200px]  relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Search
                                </span>
                            </button>
                        </form>

                        <ul className="border border-blue-400 rounded-lg p-5">
                            <li>Location: <span className="font-normal">{data.timezone ? data.timezone : "Not found!"}</span></li>
                            <li>Time: <span className="font-normal">{datetime.getHours()}:{datetime.getMinutes()}.{datetime.getSeconds()}</span></li>
                            <li>Date: <span> {`${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`}</span></li>
                            <li>Week: <span>{weekName[data.day_of_week] ? weekName[data.day_of_week] : "Not found!"}</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default index;