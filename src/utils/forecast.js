const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d795f5f60ca3ea84f7ba00c6b7c0277f&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          "It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.feelslike +
          " degress out."
      );
    }
  });
};

module.exports = forecast;
