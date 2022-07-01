const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const fileRoute = require("./routes/file");
const userRoute = require("./routes/user");
const requestRoute = require("./routes/request");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

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
