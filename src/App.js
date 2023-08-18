import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=294a0932ee2bde564305c756be9dd115`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)   
        setError(null);     
      }).catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('You Have Entered Wrong Location');
        setLocation(''); 
      });
      
    }
    
  }



  return (
    <div className="app">
      
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
          
          {/* Display the error message */}
      {error && <p>{error}</p>}
      </div>
      
        <div className="top centered-container">
        <div class="card">
  <div class="container">
    <div class="cloud front">
      <span class="left-front"></span>
      <span class="right-front"></span>
    </div>
    <span class="sun sunshine"></span>
    <span class="sun"></span>
    <div class="cloud back">
      <span class="left-back"></span>
      <span class="right-back"></span>
    </div>
  </div>
  
  <div class="card-header">
    <span>{data.name}</span>
    <span>{data.weather ? <p>{data.weather[0].main}</p> : null}</span>
  </div>

  <span class="temp">{data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}</span>

  <div class="temp-scale">
    <span>Celcius</span>
        </div>
     </div>
      </div>
      

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    
  );
}

export default App;
