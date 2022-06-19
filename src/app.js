const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
    footer: "Thank for checked your weather.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "chue wathan kyaw",
    footer: "This is all my about",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "chue",
    helpText: "This is some helpful text.",
    footer: "if you need help contact here",
  });
});
// app.get("", (req, res) => {
//   res.send("<h1>Weather<h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "chue wathan kyaw",
//     age: 23,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Weather</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
  // res.send({
  //   forecast: "70'c",
  //   location: "Myanmar",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "wathan",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "chue wathan kyaw",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
