import "./SearchBox.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
const apiKey = import.meta.env.VITE_API_KEY;
export default function SearchBox({update}) {

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const GEO_URL = "http://api.openweathermap.org/geo/1.0/direct";
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    // const API_KEY = "eede01232845d097e6c9d78ff3d8896f";
    // console.log(apiKey);

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${GEO_URL}?q=${city}&appid=${apiKey}`);
            let jsonResponse = await response.json();
            let weatherRes = await fetch(`${API_URL}?lat=${jsonResponse[0].lat}&lon=${jsonResponse[0].lon}&appid=${apiKey}&units=metric`);
            let jsonWeatherRes = await weatherRes.json();
            console.log(jsonWeatherRes);
            let result = {
                city : city,
                temp : jsonWeatherRes.main.temp,
                tempMin : jsonWeatherRes.main.temp_min,
                tempMax : jsonWeatherRes.main.temp_max,
                humidity : jsonWeatherRes.main.humidity,
                feelsLike : jsonWeatherRes.main.feels_like,
                weather : jsonWeatherRes.weather[0].description
            }
            return result;
        }
        catch(err) {
            throw err;
        }
    }
    let handle = (event) => {
        setCity(event.target.value);
    }
    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
            let res = await getWeatherInfo();
            update(res);
            setError(false);
            setCity("");
        }
        catch(err) {
            setError(true);
        }
    }
    return (
        <div className="SearchBox">
            <h3>Search for the Weather</h3>
            <form action="" onSubmit={handleSubmit}>
                <TextField id="outlined-basic" label="City Name" value={city} variant="outlined" required onChange={handle}/>
                <br /><br />
                <Button variant="contained" type='submit'>Search</Button>
                {error && <p style={{color : "red"}}>No Such Place Exists</p>}
            </form>
        </div>
    );
}