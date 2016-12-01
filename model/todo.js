module.exports = function(sequelize, DataType) {
	return sequelize.define('todo', {
		name: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		surname: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		nature: {
			type: DataType.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});
}