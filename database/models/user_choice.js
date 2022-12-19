const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('UserChoice', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		user_id: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		choice_id: {
			allowNull: false,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		step_id: {
			allowNull: false,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		created_at: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updated_at: {
			allowNull: false,
			type: Sequelize.DATE
		}
	}, {
		freezeTableName: true,
		tableName: 'QYOL_UserChoices',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
