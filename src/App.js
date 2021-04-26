import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&aqi=no`
      )
      .then((data) => setWeather(data.data))
      .catch((err) => console.log(err));
  }, []);

  const weatherInput = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
        // console.log(data);
      });
  };

  return (
    <div>
      {weather && (
        <div>
          <div className="search">
            <input onChange={weatherInput} type="text" />
            <button onClick={searchWeather}> Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="" />
            </div>
            <h3>Current Temp: {weather.current.temp_c} Celcius</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
