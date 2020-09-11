NPM install

NPM init

node start server.js

or

nodemon server.js

Install Client Rest Plugin

Run the application

This is a weather api and task builder api built with external and internal apies in NodeJs and Express. 
Please install dependencies if not existing. All dependencies have been globally installed however. Doing above will run the app.

-----------------------------------------------------------------------------

POST http://localhost:8000/addtask
Content-Type: application/json

{
 "newtask" : "Shopping"
}

###

POST http://localhost:8000/
Content-Type: application/json

{
 "city" : "delhi"
}


###
GET http://localhost:8000/
Content-Type: application/json
