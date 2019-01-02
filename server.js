//require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs= require('express-handlebars');
var bodyParser = require("body-parser");

//set port to be either host's designated port or 3000
var PORT= process.env.PORT || 3000;

//start the express app
var app = express();
//require our routes
var routes= require("./routes")

//designate our public folder as a static directory
app.use(express.static("public"));

//connect handlebars to express app
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//use body-parser in our app
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//have every request go through our routes middleware
app.use(routes);

//if deployed, us the deployed database, otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//connect to the mongo DB
mongoose.connect(MONGODB_URI);

//listen on the port
app.listen(PORT, function(){
    console.log('listening on port: ', PORT);
});