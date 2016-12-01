var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
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
//get request for /data //filter with nature /data?nature=true
app.get('/data',function(req, res){
	var queryParams = req.query ;
	var where = {};
	if ( queryParams.hasOwnProperty("nature") && queryParams.nature == "true" ) {
		where.nature = true;
	} else if( queryParams.hasOwnProperty("nature") &&  queryParams.nature == "false") {
		where.nature = false;
	}

	if (queryParams.hasOwnProperty("q") && queryParams.q.length > 0 ) {
		where.name ={
			$like: '%'+queryParams.q+'%'
		};
	}
	if (queryParams.hasOwnProperty("s") && queryParams.s.length > 0 ) {
		where.surname ={
			$like: '%'+queryParams.s+'%'
		};
	}

	db.todo.findAll({where: where}).then(function(todos){
		res.json(todos);
	}, function(e){
		res.status(500).send();
	});
	/*var filtertodos = todos ;
	if ( queryParams.hasOwnProperty("nature") && queryParams.nature == "true" ) {
		filtertodos = _.where(filtertodos,{nature:true});
	} else if( queryParams.hasOwnProperty("nature") &&  queryParams.nature == "false") {
		filtertodos = _.where(filtertodos,{nature:false});	
	}

	if (queryParams.hasOwnProperty("q") && queryParams.q.length > 0 ) {
		filtertodos = _.filter(filtertodos, function(todo){
			return todo.name.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1 ;
		});
	}
	res.json(filtertodos);*/
	console.log("GET Request Hit /data !");
});

//get request for /data/:id
app.get('/data/:id',function(req, res){
	var inputid = parseInt(req.params.id) ;
	db.todo.findById(inputid).then(function(todo){
		if(!!todo){
			res.json(todo.toJSON());
		}else{
			res.status(404).send();
		}
	}, function(e){
			res.status(500).send();
	});
	

	/*var id_data = _.findWhere(todos, {id: inputid});
	if (id_data) {
		res.json(id_data);	
	}else{
		res.status(404).send();
	}*/
	console.log("GET Request Hit /data/:id !");
});

//post request for /data
app.post('/data',function(req, res){
	var body = _.pick(req.body,'name','surname','nature') ;

	db.todo.create(body).then(function(){
		res.json(body);
	}),function(e){
		res.status(400).json(e);
		console.log("Error : "+ e);
	};
	/*body.id = nextId++;	
	if (!_.isBoolean(body.nature) || !_.isString(body.name) || !_.isString(body.surname) || body.name.trim().length == 0 || body.surname.trim().length == 0 ) {
		res.status(400).send();
	}	
	body.name = body.name.trim();
	body.surname = body.surname.trim();
	todos.push(body);
	res.json(body);*/
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
app.put('/data/:id',function(req, res){
	var inputid = parseInt(req.params.id) ;
	var id_data = _.findWhere(todos, {id: inputid});
	var body = _.pick(req.body,'name','surname','nature') ;
	var checkeddata = {} ;
	if (body.hasOwnProperty("nature") && _.isBoolean(body.nature)) {
		checkeddata.nature = body.nature ;
	}else if (body.hasOwnProperty("nature")) {
		return res.status(400).send();
	}

	if ( body.hasOwnProperty("name") && _.isString(body.name) && body.name.trim().length > 0 ) {
		checkeddata.name = body.name ;
	}else if (body.hasOwnProperty("name")) {
		return res.status(400).send();
	}

	if ( body.hasOwnProperty("surname") && _.isString(body.surname) && body.surname.trim().length > 0 ) {
		checkeddata.surname = body.surname ;
	}else if (body.hasOwnProperty("surname")) {
		return res.status(400).send();
	}

	_.extend(id_data,checkeddata)
	res.json(id_data);
	console.log('PUT Request HIT /data/:id !');
});

db.sequelize.sync({force: true}).then(function(){
		app.listen(PORT,function(){
		console.log("Express Server Is Started "+PORT+" .")
	});	
})

