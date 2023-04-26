import React, { useState, useEffect } from "react";

export default function WeatherBox() {
  const ApiKey = "7a2b2076d661e90a990a69837f7a201c";
  const [queryCity, setQueryCity] = useState(null);
  const [normalTemp, setNormalTemp] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const fetchData = async () => {
    if (!queryCity) return;
    // try {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?&q=${queryCity}&appid=${ApiKey}`
    )
    .then(response => response.json())
    .then( jsonData => {
      setCityName(jsonData.name);
      setNormalTemp(jsonData.main.temp);
      setTempMin(jsonData.main.temp_min);
      setTempMax(jsonData.main.temp_max);
      setCountryName(jsonData.sys.country);
      setWindSpeed(jsonData.wind.speed);
      setHumidity(jsonData.main.humidity);
      setWeather(jsonData.weather[0].description);
      setLongitude(jsonData.coord.lon);
      setLatitude(jsonData.coord.lat);
      
      if (jsonData.weather[0].icon === "01d") {
        setWeatherIcon("d1");
      } else if (jsonData.weather[0].icon === "01n") {
        setWeatherIcon("n1");
      } else if (jsonData.weather[0].icon === "02d") {
        setWeatherIcon("d2");
      } else if (jsonData.weather[0].icon === "02n") {
        setWeatherIcon("n2");
      } else if (
        jsonData.weather[0].icon === "03d" ||
        jsonData.weather[0].icon === "03n" ||
        jsonData.weather[0].icon === "04d" ||
        jsonData.weather[0].icon === "04n"
      ) {
        setWeatherIcon("dn34");
      } else if (jsonData.weather[0].icon === "09d") {
        setWeatherIcon("d9");
      } else if (jsonData.weather[0].icon === "09n") {
        setWeatherIcon("n9");
      } else if (
        jsonData.weather[0].icon === "10d" ||
        jsonData.weather[0].icon === "10n"
      ) {
        setWeatherIcon("dn10");
      } else if (
        jsonData.weather[0].icon === "11d" ||
        jsonData.weather[0].icon === "11n"
      ) {
        setWeatherIcon("dn11");
      } else if (jsonData.weather[0].icon === "13d") {
        setWeatherIcon("d13");
      } else if (jsonData.weather[0].icon === "13n") {
        setWeatherIcon("n13");
      } else if (
        jsonData.weather[0].icon === "50d" ||
        jsonData.weather[0].icon === "50n"
      ) {
        setWeatherIcon("dn50");
      }
      })
    }
    // } catch (error) {
    //   console.error("Something bad happened");
    //   console.error(error);
    // }
        
    const findMyCity = () => {
      const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&lacalityLanguage=en`;
      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data => setQueryCity(data.city))
    }
    const error = () => {
      // console.log("unable to find your city");
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    findMyCity();
  }, [])

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [queryCity]);

  return (
    <div className="screen">
      <div className="container">
        <form
          className="input-box flex"
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
        >
          <input
            className="input"
            placeholder="Enter Your City Name"
            type="search"
            onChange={(e) => {
              setQueryCity(e.target.value);
            }}
            autoFocus
          />
          <button className="locationIcon flex" onClick={()=>{findMyCity()}}><i className="fa-solid fa-location-dot"></i></button>
        </form>
        {cityName && (
          <div style={{ height: "80%" }}>
            <div className="city-name flex">
              <span className="globeIcon"></span>
              {cityName} <span className="orange">({countryName})</span>
            </div>
            <div className="temp">
              <div className="normal-temp flex">
                {(normalTemp - 273.15).toFixed(2)}
                <span className="orange">°С</span>
              </div>
              <div className="min-max">
                <div>
                  Min : {(tempMin - 273.15).toFixed(2)}
                  <span className="orange">°С</span>
                </div>
                <div
                  style={{
                    marginInline: "10px",
                    borderBottom: "1px solid #f47b21",
                    borderTop: "1px solid #f47b21",
                    paddingBottom: "2px",
                    paddingRight: "1px",
                  }}
                >
                  |
                </div>
                <div>
                  Max : {(tempMax - 273.15).toFixed(2)}
                  <span className="orange">°С</span>
                </div>
              </div>
            </div>
            <div className="weather flex">
              Weather: {weather} <span className={`icon ${weatherIcon}`}></span>
            </div>
            <div className="otherInformation">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginInline: "10%",
                }}
              >
                <div className="humidity">
                  Humidity: <span className="orange">{humidity}</span>
                </div>
                <div className="windSpeed">
                  Wind Speed: <span className="orange">{windSpeed}</span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginInline: "10%",
                }}
              >
                <div className="longitude">
                  Longitude: <span className="orange">{longitude}</span>
                </div>
                <div className="latitude">
                  Latitude: <span className="orange">{latitude}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {!cityName && (
          <div className="flex notFound" style={{ height: "80%" }}>
            City not Found
          </div>
        )}
      </div>
    </div>
  );
}