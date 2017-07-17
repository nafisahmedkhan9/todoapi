module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todo', {
		name: {
			type: DataTypes.STRING,
			isLowercase: true,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},			validate: {

		surname: {
			type: DataTypes.STRING,
			allowNull: false,
				len: [1, 250]
			}
		},
		nature: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});
}