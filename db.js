/*for Heroku : cmds
Heroku addons:create heroku-postgresql:hobb-dev (after this)
heroku pg:wait (check again for confirmation)
heroku pg:wait
install pg: npm install pg --save
install pg-hstore : npm install pg-hstore --save
*/
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env == 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}

var db = {};
db.todo = sequelize.import(__dirname + '/model/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;