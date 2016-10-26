var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000 ;
var todos = [{
		id : 1 ,
		name : "nafis",
		suename : "khan"
	},
	{
		id : 2 ,
		name : "javed",
		suename : "ahmed"
	},
	{
		id : 3 ,
		name : "shamshad",
		suename : "chaudhry"
	},
	{
		id : 4 ,
		name : "ismail",
		suename : "shaikh"
	}
];
app.get('/',function(req,res){
	res.send('To Do API ROOT');
});
app.get('/data',function(req,res){
	res.json(todos);
});
app.get('/data/:id',function(req,res){
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
app.listen(PORT,function(){
	console.log("Express Server Is Started "+PORT+" .")
});
