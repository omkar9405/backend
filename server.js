const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var fs = require('fs');
var path = require('path');
require('dotenv').config();
const app = express();

//var corsOptions = {
 // origin: "http://localhost:5000"
//};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Step 4 - set up EJS
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");


//mongo connect
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to omkar powar application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8081;
require("./app/routes/tutorial.routes")(app);
require("./app/routes/employee.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/admin.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
