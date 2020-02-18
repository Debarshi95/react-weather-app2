import React from "react";
import "./App.css";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";

const API_KEY =
  "To use this app,GET YOUR API KEY FROM  openweathermap and post it here.";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

class App extends React.Component {
  state = {
    isLoading: false,
    error: null,
    weather: {
      cityname: "",
      current_temp: 0,
      conditions: "",
      feels_like: 0,
      humidity: 0
    },
    location: {
      city: "",
      country: ""
    }
  };
  makeNetworkRequest = e => {
    e.preventDefault();

    if ((this.state.location.city && this.state.location.country) !== "") {
      this.setState({
        isLoading: true,
        location: {
          city: "",
          country: ""
        }
      });
      fetch(
        `${BASE_URL}?q=${this.state.location.city},${this.state.location.country}&appid=${API_KEY}`
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res.ok) {
            this.setState({
              isLoading: false,
              weather: {
                cityname: res.name,
                humidity: res.main.humidity,
                current_temp: this.kelvinToCelsius(res.main.temp),
                feels_like: this.kelvinToCelsius(res.main.feels_like),
                conditions: res.weather[0].description
              }
            });
          } else {
            this.setState({
              isLoading: false,
              error: res.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false, error: err.message });
        });
    } else {
      alert("Pl put details");
    }
  };

  updateLocation = e => {
    this.setState({
      location: {
        ...this.state.location,
        [e.target.name]: e.target.value
      }
    });
  };

  kelvinToCelsius = tempInKelvin => {
    return Math.round(tempInKelvin - 273);
  };

  render() {
    const { isLoading, weather, error } = this.state;
    if (isLoading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <div className="App">
        <Form
          handleLocation={this.updateLocation}
          state={this.state}
          submit={this.makeNetworkRequest}
        />
        {weather.current_temp !== 0 ? (
          <Weather weatherDetails={weather} />
        ) : null}
        {error !== null ? <Error errorMessage={error} /> : null}
      </div>
    );
  }
}

export default App;
