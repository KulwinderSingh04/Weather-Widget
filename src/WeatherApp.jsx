import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import { useState } from 'react';
export default function WeatherApp() {
    let [weatherInfo, setWeatherInfo] = useState({
        city : "Delhi",
        feelsLike : 30.39,
        humidity : 45,
        temp : 30.06,
        tempMax : 30.06,
        tempMin : 30.06,
        weather : "haze"
    });
    let updateInfo = (result) => {
        setWeatherInfo(result);
    }
    return (
        <div style={{textAlign : "center"}}>
            <h1>Weather App</h1>
            <SearchBox update={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}