import React from 'react'

function WeatherBox() {
  return (
   <div className="screen">
      <div className="container">
         <div className="input-box">
            <input className='input' type="search" />
         </div>
         <div className="city-name">
         <i className="fa-solid fa-street-view"></i>Mumbai
         </div>
      </div>
   </div>
  )
}

export default WeatherBox