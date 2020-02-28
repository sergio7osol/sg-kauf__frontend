import React from 'react';
import PropTypes from 'prop-types';

import request from 'request';

import './ImgTitleDescCard.scss';

export default class ImgTitelDescCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      temperature: 0,
      precipProbability: 0 
    };
  }

  // getGeoData() {
  //   const url = "https://api.darksky.net/forecast/3c2fd92dec2343df5e5cb7fe9e87f934/37.8267,-122.4233?units=si";

  //   request({ url, json: true }, (error, response) => {
  //     const data = response.body;

  //     if (error) { console.log('error >> ', error) };
      
  //     this.setState(state => ({
  //       temperature: data.currently.temperature,
  //       rain: data.currently.precipProbability
  //     }));
  //   });
  // }

  getGeoData() {
    request({ url: "http:localhost:3001/weather", json: true }, (error, response) => {
      if (error) { console.log('error >> ', error) };

      this.setState(state => ({
        temperature: response.temperature,
        rain: response.precipProbability
      }));
    });
  }

  render() {
    return (
      <div className="weather-card">
        <h3 className="weather-card__title">Weather</h3>
        {/* <p style={{ color: "#555" }} >{this.state.weather.place_name}</p> */}
        <p className="weather-card__desc" style={{ color: "#555", fontSize: "2em", fontWeight: "bold" }}>
          {/* {this.state.weather.coordinates.latitude, this.state.weather.coordinates.longitude} */}
        </p>
        <h3 className="weather-card__value">{this.state.temperature} C</h3>
        <h4 className="weather-card__value">{this.state.rain}% Regen</h4>
        <button className="weather-card__btv" onClick={() => this.getGeoData()}>get Weather</button>
      </div>
    )
  }
}

// List.propTypes = {
//   items: PropTypes.string
// };