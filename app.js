require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const logger = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express View engine setup

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "lEnD1T",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 1000,
    }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.enable("trust proxy");
app.disable("etag");

app.use("/", routes);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;

// import mongoSanitize = require("express-mongo-sanitize");
// import helmet = require("helmet");
// import xss = require("xss-clean");
// import hpp = require("hpp");
// import cookieParser = require("cookie-parser");

// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(mongoSanitize());
// app.use(helmet());
// app.use(xss());
// app.use(hpp());
// app.use(cors());
