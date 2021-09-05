const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRoute = require("./routes/movies");
const genreRoute = require("./routes/genres");
const userRoute = require("./routes/users");

const app = express();

//To prevent CORS errors
app.use(cors());

//Connecting mongoDB
const databaseConfig = require("./config/keys");
console.log(databaseConfig);
mongoose.connect(databaseConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Checking the connection to db
var db = mongoose.connection;
db.once("open", () => console.log("Mongo Database is connected now!"));
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.static("./uploads"));

// Body parser middleware
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
// app.use(bodyParser.json({ limit: "10mb" }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

//App routes to handle requests
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute); //cache
app.use("/api/users", userRoute);

//Serve our static asset
app.use(express.static("frontend/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
