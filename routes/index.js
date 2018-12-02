var router= require("express").Router();
var axios = require("axios");
var cheerio = require("cheerio");

router.get("/", function(req, res){
    res.render("home")
})

router.get("/scrape", function(req, res) {
    axios.get("http://www.echojs.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        console.log($("article h2"))

        
    })
})

module.exports= router;