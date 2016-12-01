var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	surname: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	nature: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}

});

sequelize.sync({
	force: true
}).then(function() {
	console.log('Everything is synced');
	Todo.create({
		name: ' ',
		surname: true,
		nature: "false"
	}).then(function() {
		return Todo.create({
			name: 'NFS',
			surname: " ",
			nature: "hello"
		});
	}).then(function() {
		return Todo.findAll({
			/*where: {
				name:{
					$like : "%s"
				} 
			}*/
		});
	}).then(function(todos) {
		if (todos) {
			todos.forEach(function(todo) {
				console.log(todo.toJSON());
			});
		} else {
			console.log('no todo found!');
		}
	}).catch(function(e) {
		console.log(e);
	});

});