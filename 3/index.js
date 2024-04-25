const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
const pathToView = path.join(__dirname, "View.json");

app.get("/", (req, res) => {
  const viewHome = JSON.parse(fs.readFileSync(pathToView));
  let viewersHomePage = viewHome.home;
  res.send(`<h1>Home</h1>
        <a href="/about">About</a>
        <p>Количество просмотров ${++viewersHomePage} </p>`);
  viewHome.home = viewersHomePage;
  fs.writeFileSync(pathToView, JSON.stringify(viewHome));
});

app.get("/about", (req, res) => {
  const viewAbout = JSON.parse(fs.readFileSync(pathToView));
  let viewersAboutPage = viewAbout.about;
  res.send(`<h1>About</h1>
          <a href="/">About</a>
          <p>Количество просмотров ${++viewersAboutPage} </p>`);
  viewAbout.about = viewersAboutPage;
  fs.writeFileSync(pathToView, JSON.stringify(viewAbout));
});

app.listen(port);
