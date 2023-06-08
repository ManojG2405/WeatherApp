const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  // res.send("Server is started and runnig.");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "994477dfaf0bc7a6717b99ea0c922794";
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      // console.log("Temperature in " + query + " is: " + temp);
      // console.log("The weather is currently: " + weatherDescription);
      res.write("<h1>Temperature in " + query + " is: " + temp + " Degrees Celcius</h1>");
      res.write("<h3>The weather is currently: " + weatherDescription + "</h3>");
      res.write("<h3>The Humidity is: " + humidity + " g.m-3</h3>");
      res.write("<image src=" + imageURL + ">");
      res.send();
      //Remember that we can use res.send() only once. If we use it twice, Our App will get crashed.
    })
  })

});






app.listen(3000, function () {
  console.log("Server is runnig on port 3000.");

});
