var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
	var id_data = _.findWhere(todos, {id: inputid});

	if (id_data) {
		res.json(id_data);	
	}else{
		res.status(404).send();
	}
});
app.post('/data',function(req,res){
	var body = _.pick(req.body,'name','surname','nature') ;
	body.id = nextId++;
	
	if (!_.isBoolean(body.nature) || !_.isString(body.name) || !_.isString(body.surname) || body.name.trim().length == 0 || body.surname.trim().length == 0 ) {
		res.status(400).send();
	}	

	console.log('POST Request HIT /data !');
	body.name = body.name.trim();
	body.surname = body.surname.trim();
	todos.push(body);
	res.json(body);
})
app.listen(PORT,function(){
	console.log("Express Server Is Started "+PORT+" .")
});
