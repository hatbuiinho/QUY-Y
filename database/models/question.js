const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('Question', {
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
		video_url: {
			type: Sequelize.STRING
		},
		audio_url: {
			type: Sequelize.STRING
		},
		media_type: {
			type: Sequelize.INTEGER
		},
		time: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		score: {
			allowNull: false,
			type: Sequelize.INTEGER
		},
		multiple: {
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
		tableName: 'QYOL_Questions',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
