import React from "react";

function Weather({ weatherDetails }) {
  console.log(weatherDetails);
  return (
    <div>
      <h3>Temperature: {weatherDetails.current_temp}</h3>
    </div>
  );
}
export default Weather;
