//initialize express 
var router= require("express").Router();
//dependencies
var logger = require("morgan")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// //require all models
// var db = require('./models');

//use morgan logger for logging requests
router.use(logger('dev'));
//use body parser for handling form submissions
router.use(bodyParser.urlencoded({extended:true}));

//routes

router.get("/", function(req, res){
    res.render("home")
})

router.get("/scrape", function(req, res) {
    axios.get("http://www.echojs.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        // console.log($("article h2"))

        //grab all the h2 within article tag
        $("article h2").each(function(i, element){
            //save an empty result object
            var result = {};

            //add the text and href of every link scraped and save as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            //create a new article using the 'result' object built from scraping    
            db.Article.create(result)
            .then(function(dbArticle) {
                //view the added result in the console
                console.log(dbArticle)
            }) 
            .catch(function(err){
                //if an error occured, send it to client
                return res.json(err);
            });  
        });
        // if we successfully scrape and save an article, send a message to the client
        res.send("Scrape Complete");
    });
});

//route for getting all articles from the db
router.get("/articles", function(req, res){
    //grab every document from the articles section
    db.Article.find({})
    .then(function(dbArticle){
        //if we were able to successfully find articles, send them back to client
        res.json(dbArticle);
    })
    .catch(function(err){
        //if error occured, send it the client
        res.json(err)
    });
});

//route for grabbing a specific article by id, populate it with its note
router.get('./articles/:id', function(req, res) {
    //using id passed in the id parameter, prepare a query that finds the matching id
    db.Article.findOne({_id: req.params.id })
    // and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle){
        //if succesful, send it back to client
        res.json(dbArticle);
    })
    .catch(function(err){
        //if an error occured, send it to the client
        res.json(err);
    });
});

//route for saving/updating an articles associated note
app.post("/articles/:id", function(req, res){
    // create a new note and pass the req.body to the entry
    db.Note.create(req.body)
    .then(function(dbNote){
          // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id}, { note: dbNote._id}, { new: true});
    })
    .then(function(dbArticle) {
        //if successfully updated and article, send it back to client
        res.json(dbArticle);
    })
    .catch(function(err) {
        //if an error occured, send it to the client
        res.json(err);
    });
});

module.exports= router;