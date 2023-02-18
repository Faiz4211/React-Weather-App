import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [data, setData] = useState();
  const [input, setInput] = useState('');

  const apiKey = '324a51544441d6b6e0dfacc3239075b5';

  const searchWeather = async (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    await axios.get(apiURL)
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSearch = () => {
    if (!input) {
      toast.error('enter city name', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    searchWeather(input);
    setInput('');

  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="weather">
              <h1 className='heading'>Weather App</h1>
              <div className="d-grid gap-3 col-md-4 mt-4">
                <input placeholder='City Name' type="text" className='form-control' value={input} onChange={handleChange} />
                <button onClick={handleSearch} className='btn btn-primary' type='button'>Search</button>
                <ToastContainer />
              </div>
            </div>
            <div className="col-md-12 text-center mt-5">
              <div className="shadow rounded weatherResult">
                <img className='icon' src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="weather-icon" />
                {data ?
                  (<div>
                    <h5 className='city'>{data?.name}</h5>
                    <h6 className="temp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
                  </div>)
                  : (<h2 className='text-center text-black'>Nothing to show, Please search for city name!</h2>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;