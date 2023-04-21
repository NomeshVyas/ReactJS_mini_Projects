import React, {useState, useEffect} from 'react'

function WeatherBox() {
   const ApiKey = "7a2b2076d661e90a990a69837f7a201c";
   const [queryCity, setQueryCity] = useState(null)
   const [normalTemp, setNormalTemp] = useState(null)
   const [tempMin, setTempMin] = useState(null)
   const [tempMax, setTempMax] = useState(null)
   const [cityName, setCityName] = useState(null)
   const [countryName, setCountryName] = useState(null)
   const [windSpeed, setWindSpeed] = useState(null)
   const [humidity, setHumidity] = useState(null)
   const [weather, setWeather] = useState(null)
   

   const fetchData = async () => {
      // if(!queryCity)return;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${queryCity}&appid=${ApiKey}`);
      const jsonData = await response.json();
      console.log(jsonData);
      setCityName(jsonData.name);
      setNormalTemp(jsonData.main.temp);
      setTempMin(jsonData.main.temp_min);
      setTempMax(jsonData.main.temp_max);
      setCountryName(jsonData.sys.country);
      setWindSpeed(jsonData.wind.speed);
      setHumidity(jsonData.main.humidity);
      setWeather(jsonData.weather[0].description);
   }

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [queryCity])

  return (
   <div className="screen">
      <div className="container">
         <form className="input-box flex" onSubmit={(e)=>{e.preventDefault(); fetchData();}}>
            <input className='input' placeholder='Enter Your City Name' defaultValue={"ajmer"} type="search" onChange={(e)=>{setQueryCity(e.target.value);}} />
         </form>
         {cityName && <div style={{height: "80%"}}>
            <div className="city-name flex">
            <i className="fa-solid fa-street-view"></i>{cityName} <span className='orange'>({countryName})</span>
            </div>
            <div className="temp">
               <div className="normal-temp flex"> {(normalTemp-273.15).toFixed(2)}<span className="orange">°С</span></div>
               <div className="min-max flex">Min : {(tempMin-273.15).toFixed(2)}<span className="orange">°С</span> <span style={{marginInline: "10px"}}>|</span> Max : {(tempMax-273.15).toFixed(2)}<span className="orange">°С</span></div>
            </div>
               <div className="weather flex" style={{fontSize: "1.1rem"}}>Weather: {weather} <span className='icon' style={{backgroundImage: "url(./weather_icon_full_sun.svg)"}}></span></div>
            <div className="otherInformation">
               <div style={{display: "flex", justifyContent: "space-between", marginInline: "10%"}}>
                  <div className="humidity">Humidity: <span className="orange">{humidity}</span></div>
                  <div className="windSpeed">Wind Speed: <span className="orange">{windSpeed}</span></div>
               </div>
            </div>
         </div>}
         {!cityName && <div className='flex notFound' style={{height: "80%", fontSize: "2.25rem"}}>
            City not Found
         </div>}
      </div>
   </div>
  )
}

export default WeatherBox;