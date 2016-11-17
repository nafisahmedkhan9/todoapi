var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000 ;
var nextId = 1 ;
var todos = [];

app.use(bodyParser.json());

//get request for /
app.get('/',function(req, res){
	res.send('To Do API ROOT');
	console.log("GET Request Hit /(ROOT) !");
});

//get request for /data
app.get('/data',function(req, res){
	res.json(todos);
	console.log("GET Request Hit /data !");
});

//get request for /data/:id
app.get('/data/:id',function(req, res){
	var inputid = parseInt(req.params.id) ;
	var id_data = _.findWhere(todos, {id: inputid});
	if (id_data) {
		res.json(id_data);	
	}else{
		res.status(404).send();
	}
	console.log("GET Request Hit /data/:id !");
});

//post request for /data
app.post('/data',function(req, res){
	var body = _.pick(req.body,'name','surname','nature') ;
	body.id = nextId++;	
	if (!_.isBoolean(body.nature) || !_.isString(body.name) || !_.isString(body.surname) || body.name.trim().length == 0 || body.surname.trim().length == 0 ) {
		res.status(400).send();
	}	
	body.name = body.name.trim();
	body.surname = body.surname.trim();
	todos.push(body);
	res.json(body);
	console.log('POST Request HIT /data !');
});

//delete request for /data/:id
app.delete('/data/:id',function(req, res){
	var inputid = parseInt(req.params.id) ;
	var id_data = _.findWhere(todos, {id: inputid});
	if(!id_data){
		res.status(404).json({"error":"no todo found with that id"});
	}
	todos = _.without(todos,id_data);
	res.json(id_data);
	console.log('Delete Request HIT /data/:id !');
});

//put request for /data/:id
/*app.put('/data/:id',function(req, res){
	var body = _.pick(req.body,'name','surname','nature') ;
	var correctdata = {} ;
	if (body.hasOwnProperty(),) || ) {}
})*/
app.listen(PORT,function(){
	console.log("Express Server Is Started "+PORT+" .")
});
