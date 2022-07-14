const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const fileRoute = require("./routes/file");
const userRoute = require("./routes/user");
const requestRoute = require("./routes/request");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const puppeteer = require("puppeteer");

const app = express();

// Bodyparser middleware
app.use(
  bodyparser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

//Databse
require("./db/db");

//sessions
const oneDay = 1000 * 60 * 60 * 24;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.tu-chemnitz.de/informatik/DVS/blocklist/");
  page.evaluate(() => {
    document.querySelector("#krbSubmit").click();
  });
  page.authenticate({ username: "pakak", password: "Part#1112" });
  await page.waitForSelector("#username", { visible: true, timeout: 0 });
  // document.querySelector("#username").value = "pakak";
  await page.evaluate(() => {
    document.querySelector("#username").value = "pakak";
  });
  page.evaluate(() => {
    document
      .querySelector("#top > div > main > div > form > input.btn.btn-default")
      .click();
  });

  await page.waitForSelector("#password", { visible: true, timeout: 0 });
  await page.evaluate(() => {
    document.querySelector("#password").value = "Part#1112";
  });
  await page.evaluate(() => {
    document
      .querySelector("#top > div > main > div > form > input.btn.btn-default")
      .click();
  });
  // browser.close();
  const cookies = await page.cookies();
  const setCookie =
    cookies[0].name +
    "=" +
    cookies[0].value +
    ";" +
    cookies[1].name +
    "=" +
    cookies[1].value +
    ";";
  await fs.writeFile("./cookies.txt", setCookie, (err, result) => {
    if (err) console.log(err);
  });
  await browser.close();
})();

app.use(
  sessions({
    secret: "thisismysecretkeydlfkjgldkgjlsdk",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  }),
);

//parsing incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

//cookie parser middleware
app.use(cookieParser());

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use(cors());

//Routes
app.use(userRoute);
app.use(fileRoute);
app.use(requestRoute);

app.listen(3030, () => {
  console.log("server started on port 3030");
});
