const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('UserQuestion', {
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
		question_id: {
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
		tableName: 'QYOL_UserQuestions',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
