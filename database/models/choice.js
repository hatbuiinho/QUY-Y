const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('Choice', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		question_id: {
			allowNull: false,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		answer_id: {
			allowNull: false,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		is_correct: {
			allowNull: false,
			type: Sequelize.BOOLEAN
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
		tableName: 'QYOL_Choices',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
