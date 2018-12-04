# All the News That's Fit to Scrape

### Overview

This is a web app that lets users view and leave comments on the latest news. It utilizes Mongoose and Cheerio for web scraping and handlebars to display content. This application is deployed using a Heroku database for storing articles and comments of users.

### Dependencies and Packages

   * express

  * express-handlebars

   3. mongoose

   4. cheerio

   5. axios
   
 ### Application Walk-through

* Whenever a user visits this site, the app scrapes stories from a news outlet and displays them for the user. Each scraped article is saved to a Heroku database. The app scrapes and displays the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

* Users can leave comments on the articles displayed and revisit them later. The comments are saved to the Heroku database and associated with their articles. User can delete comments left on articles. All stored comments are visible to every user.



