# Readme - Favorite Places

# Introduction
Favorite places is a Javascript SPA (Single Page Application) that allows users to document their favorite places. The fields for Places include the name, a description, and an image URL that displays an image. Users can also comment on each place, and the comments will show up below the image for the place. I created this application to practice Javascript, especially object-oriented javascript that relies on classes to separate concerns. The application relies on a Rails API backend that has two models, places and comments, and associates places and comments through a has many/belongs to relationship. 

# Technologies
This application is largely written in Javascript, with a Ruby (2.6.1) on Rails (6.1.3) backend. the FastJSON api is used to create serializers for places and comments. SQLite3 is used for the database, and ActiveRecord is used to manage the Rails models. 

# Launch
Clone this repo, then run the commands 'bundle install' and 'rails db:migrate' to install the application. Navigate into the backend with your terminal using 'cd backend' and run 'rails s', then drag the index.html file into your browser and click 'Add a Place' to get started. 

# Usage 
Click on "Add a Place" at the top of the page to render the form to add a place. Enter text for the name and description, and a URL ending with .jpg or another image file type into the Image field. Names and descriptions are required to submit the form, whereas the image URL is optional. Upon submitting the form, you will be redirected to the list of places where the place will be displayed, and you can delete the place or add a text comment.

# Contributing
Send an email to strycora@gmail.com if you would like to make a contribution. 

# License
[MIT](https://choosealicense.com/licenses/mit/)

