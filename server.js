var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(express.json())
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//External API

let apiKey = 'cdfa7eb4d222fca0ab0a49d1fcff3576';
let city = 'delhi';
//let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


app.post('/', function (req, res) {
    let city = req.body.city;
    let url =  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null, task: null, complete: null});
                res.json(req.body);
            }
        }
    });
});

app.set('port', (process.env.PORT || 9000));
app.listen(app.get('port'), function(){
	    console.log('Server listening on port ' +app.get('port'));
});


  //Internal API


var task = [];


var complete = [];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.render("index", { task: task, complete: complete ,weather: null, error: null});
    res.json(req.body);
});

app.get("/", function(req, res) {    
  res.render("index", { task: task, complete: complete ,weather: null, error: null});

});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;

    if (typeof completeTask === "string") {
       
    //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    
    }
    res.render("index", { task: task, complete: complete ,weather: null, error: null});
    res.json(req.body);
});

