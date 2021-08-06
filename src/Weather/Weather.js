import React from 'react';
import './Weather.css';
import therm from './thermometer.svg';

const apiKey = '05ab4ed9b8e0e1dede5632a9237d1bee';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {weather: '', temp: '', city: 'Dnipro'};
        this.weatherUpdate();
    }

    

    weatherUpdate = async () => {
        const apiRequest = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},UA&appid=${apiKey}&units=metric`)
        const weatherData = await apiRequest.json();
        this.setState({temp: weatherData.main.temp.toFixed(0)})
        this.setState({weather: weatherData.weather[0].icon})
    }


    changeCity = async () => {
        let select = document.querySelector('select'),
            selectValue = select.value;
            const apiRequest = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectValue},UA&appid=${apiKey}&units=metric`)
            const weatherData = await apiRequest.json();
            this.setState({temp: weatherData.main.temp.toFixed(0)})
            this.setState({weather: weatherData.weather[0].icon})
    }
    

    render() {

        let url = `images/${this.state.weather}.svg`


        return (
            <div className='weather_widget'>
                <img src={url} alt='weatherIcon' className='weatherIcon'></img>
                <div className='temperature'>
                    <h2>{this.state.temp}<img src={therm} alt='therm' className='therm'></img></h2>
                    <select onChange={this.changeCity}>
                        <option>Dnipro</option>
                        <option>Kiev</option>
                        <option>Lviv</option>
                        <option>Kharkiv</option>
                        <option>Odessa</option>
                        <option>Kryvyi Rih</option>
                    </select>
                </div>
            </div>
        )
    }
    
}

export default Weather