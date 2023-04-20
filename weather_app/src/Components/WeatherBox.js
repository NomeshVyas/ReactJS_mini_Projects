import React, {useState, useEffect} from 'react'

function WeatherBox() {
   const ApiKey = "7a2b2076d661e90a990a69837f7a201c";
   const [queryCity, setQueryCity] = useState(null)
   const [normalTemp, setNormalTemp] = useState(null)
   const [tempMin, setTempMin] = useState(null)
   const [tempMax, setTempMax] = useState(null)
   const [cityName, setCityName] = useState(null)
   const [countryName, setCountryName] = useState(null)
   

   const fetchData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${queryCity}&appid=${ApiKey}`);
      const jsonData = await response.json()
      console.log(jsonData);
      setCityName(jsonData.name);
      setNormalTemp(jsonData.main.temp);
      setTempMin(jsonData.main.temp_min);
      setTempMax(jsonData.main.temp_max);
      setCountryName(jsonData.sys.country);
   }

   useEffect(() => {
      fetchData();
      // eslint-disable-next-line
   }, [queryCity])
   

  return (
   <div className="screen">
      <div className="container">
         <div className="input-box flex">
            <input className='input' type="search" onChange={(e)=>{setQueryCity(e.target.value)}} />
         </div>
         <div className="city-name flex">
         <i className="fa-solid fa-street-view"></i>{cityName} ({countryName})
         </div>
         <div className="temp">
            <div className="normal-temp flex"> {(normalTemp-273.15).toFixed(2)}°С</div>
            <div className="min-max flex">Min : {(tempMin-273.15).toFixed(2)}°С | Max : {(tempMax-273.15).toFixed(2)}°С</div>
         </div>
      </div>
   </div>
  )
}

export default WeatherBox