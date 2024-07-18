import React,{useState} from 'react'
import './App.css'
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoMdRainy } from "react-icons/io";
import { WiDayCloudy } from "react-icons/wi";
import { IoIosSunny } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { TbTemperatureSun } from "react-icons/tb";
import { WiCloudyGusts } from "react-icons/wi";
import { BsClouds } from "react-icons/bs";
import { BsCloudFogFill } from "react-icons/bs";


function App() {

  const [city,setCity]=useState("")
  const [temp,setTemp]=useState('')
  const[condition,setCondition]=useState('')
  const[cityName,setCityName]=useState('')
  const[humidity,setHumidity]=useState("")
  const[cloudiness,setCloudiness]=useState('')
  const[wspeed,setwindspeed]=useState("")
  const [wcond,setWcond]=useState('')
  const[icon,seticon]=useState({
    temIcon:"",
    cond:"",
    humid:"",
    cloud:"",
    wind:""
  })


  const changeHandler=(e)=>{
    setCity(e.target.value)
  }
function Submit(e){
  e.preventDefault()
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`).then(response=>response.json()).then(Data=>{setTemp("Temperature : "+Math.round(Data.main.temp-273)+"°C");
    setCondition("Weather : "+Data.weather[0].description);
    setCityName(Data.name);
    setHumidity("Humidity : "+Data.main.humidity+"%");
    setCloudiness("Cloudiness : "+Data.clouds.all+"%");
    setwindspeed("Wind Speed : "+Data.wind.speed+" m/s");
    // setWcond(Data.weather[0].main);
    if(Data.weather[0].main==='Rain'){
      seticon({temIcon:<TbTemperatureSun/>,cond:<IoMdRainy/>,humid:< WiHumidity/>,cloud:<WiDayCloudy/>,wind:<WiCloudyGusts/>})
      }
      else if(Data.weather[0].main==='Clouds'){
        seticon({temIcon:<TbTemperatureSun/>,cond:<BsClouds/>,humid:< WiHumidity/>,cloud:<WiDayCloudy/>,wind:<WiCloudyGusts/>})
      }
      else if(Data.weather[0].main==='Haze'){
        seticon({temIcon:<TbTemperatureSun/>,cond:<BsCloudFogFill/>,humid:< WiHumidity/>,cloud:<WiDayCloudy/>,wind:<WiCloudyGusts/>})
      }
      else{
        seticon({temIcon:<TbTemperatureSun/>,cond:<IoIosSunny/>,humid:< WiHumidity/>,cloud:<WiDayCloudy/>,wind:<WiCloudyGusts/>})
      }
  }).catch(err=>console.log(err))
  setCity("")

  
}
  return (
    <div className='background'>
      <center>
      <div className='card'>
        <div className='card-body'>
          <form onSubmit={Submit}>
            <h2>Weather <TiWeatherPartlySunny /></h2>
            <input type='text' placeholder='City' name='city' value={city} onChange={changeHandler}></input>
            <input type='submit' name='submit'></input>
            <div className='data-body'>
              <center><h1>{cityName}</h1></center>
              <div className='info-body'>
                <h3>{icon.temIcon} {temp}</h3>
                <h3>{icon.cond} {condition}</h3>
                <h3>{icon.humid} {humidity}</h3>
                <h3>{icon.cloud} {cloudiness}</h3>
                <h3>{icon.wind} {wspeed}</h3>
              </div>
            </div>

          </form>
        </div>
      </div>
      </center>
      
    </div>
  )
}

export default App
