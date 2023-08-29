
import { useState, useEffect } from "react";
import "./style.scss";

const baseURL = "https://worldtimeapi.org/api/ip";
import axios from "axios";
const index = () => {

    const [time, setTime] = useState("");
    async function getTime(){
        try{
            const response = await axios.get(`${baseURL}`);
            setTime(response.data);
          
        }catch(error){
            console.log(error.message);
        }
       
    }
    useEffect(() => {
        getTime();
    }, []);

    const weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const datetime = new Date(time.datetime);
    return (
        <header>
            <div className="container">
                <div className="flex items-center justify-between h-[80px] bg-slate-100 p-5 rounded-2xl">
                    <h2 className="font-bold text-2xl">World Time Zone</h2>
                    <div className="text-lg font-semibold">
                        <p>Location: <span className="font-normal">{time.timezone}</span></p>
                        <p>Time: <span className="font-normal"> {datetime.getHours()}:{datetime.getMinutes()}.{datetime.getSeconds()}</span></p> 
                        {/* <p>Date: <span> {datetime.getDate()}/{datetime.getMonth() + 1}/{datetime.getFullYear()}</span></p>
                        <p>Week: <span>{weekName[time.day_of_week]}</span></p> */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default index;