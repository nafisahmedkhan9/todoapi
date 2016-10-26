var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000 ;
var nextId = 1 ;
var todos = [];

app.use(bodyParser.json());

app.get('/',function(req,res){
	console.log("GET Request Hit /(ROOT) !");
	res.send('To Do API ROOT');
});
app.get('/data',function(req,res){
	console.log("GET Request Hit /data !");
	res.json(todos);
});
app.get('/data/:id',function(req,res){
	console.log("GET Request Hit /data/:id !");
	var inputid = parseInt(req.params.id) ;
	var index;
	for (var i = 0; i < todos.length; i++) {
		if (inputid == todos[i].id) {
			index = i ;
			break;		
		}
	}
	if (index != null) {
		res.json(todos[index]);	
	}else{
		res.status(404).send();
	}
});
app.post('/data',function(req,res){
	var body = req.body ;
	console.log('GET Request HIT /data !');
	body.id = nextId++;
	todos.push(body);
	res.json(body);

})
app.listen(PORT,function(){
	console.log("Express Server Is Started "+PORT+" .")
});
