const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('Answer', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		content: {
			allowNull: false,
			type: Sequelize.STRING
		},
		image_url: {
			type: Sequelize.STRING
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
		tableName: 'QYOL_Answers',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
