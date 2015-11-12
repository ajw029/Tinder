var application_root = __dirname;
var express = require("express");
var bodyParser = require("body-parser");

var http = require('http');
var httpServer = http.Server(app);

var app = express();
var port = 8080;

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function profileSchema(name, age, likes, imgsrc, friends, interests, superlike, id_, dislikes) {
	this.name = name;
	this.age = age;
	this.likes = likes;
	this.imgsrc = imgsrc;
	this.friends = friends;
	this.interests = interests;
	this.superlike = superlike;
	this.id_ = id_;
}

var arraylist = [];
function createPotential_Test() {

	var jung = new profileSchema('Jung', '21', ['secret-id'], "img/jung.jpg", [],[],[], guid());
	var tobey = new profileSchema('Tobey', '21', [], "img/tobey.jpg", [],[],[], guid());
	var cindy = new profileSchema('Cindy', '21', ['secret-id'], "img/cindy.jpg",['greg', 'jung', 'jessica'],['cats'],[], guid());
	var greg = new profileSchema('Greg', '20', ['secret-id'], "img/greg.jpg",[],[],[], guid());
	var sheng = new profileSchema('Sheng', '21', [], "img/sheng.png",[],[],[], guid());
	var michelle = new profileSchema('Michelle', '22', [], "img/michelle.jpg",[],[],[], guid());
	var hao = new profileSchema('Hao', '21', [], "img/hao.jpg",[],[],[], guid());
	var soda = new profileSchema('DJ Soda', '22', [], "img/soda.jpg",[],[],[], guid());
	var toki = new profileSchema('Tokimonsta', '28', ['secret-id'], "img/toki.jpg",[],[],[], guid());
	var david = new profileSchema('David', '21', ['secret-id'], "img/david.jpg",[],[],[], guid());
	arraylist.push(cindy);
	arraylist.push(tobey);
	arraylist.push(jung);
	arraylist.push(greg);
	arraylist.push(sheng);
	arraylist.push(hao);
	arraylist.push(michelle);
	arraylist.push(soda);
	arraylist.push(toki);
	arraylist.push(david);

	return shuffle(arraylist);
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

app.get('/getpotentials', function (req, res) {
	arraylist = [];
	var data = createPotential_Test();
	var shuffledArr= shuffle(data);
	res.send(shuffledArr);
});

app.get('/getme', function (req, res) {
	var data = new profileSchema('Anthony', '21', [], 'img/me.png', ['greg', 'jung'], ['cats'], [], 'secret-id');
	res.send(data);
});

app.post('/checkmatch', function (request, response) {
	var reqBody =request.body;
	var their_id = reqBody.their_id;
	var my_id = reqBody.my_id;
	var bFound = false;
	for (var i  = 0 ; i < arraylist.length; i++) {
		if (arraylist[i].id_ == their_id) {
			var their_likes = arraylist[i].likes;
			for (var j = 0; j < their_likes.length; j++) {
				if (their_likes[j] == my_id) {
					// Match Found
					bFound = true;
				}
			}
		}
	}
	if (bFound) {
		response.send("true");
	}
	else 
		response.send("false");
	
});

app.post('/getuser', function (request, response) {
	var reqBody =request.body;
	var their_id = reqBody.their_id;

	for (var i  = 0 ; i < arraylist.length; i++) {
		if (arraylist[i].id_ == their_id) {
			response.send(arraylist[i]);
		}
	}
	
});

app.get('/', function(req,res) {
  res.sendfile('index.html');
});

// Launch server
app.listen(process.env.PORT||port);