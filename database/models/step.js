const { DataTypes } = require('sequelize');

module.exports = (Sequelize, sequelize) => {
	return sequelize.define('Step', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: 'UNIQUEIDENTIFIER',
			defaultValue: DataTypes.UUIDV4,
		},
		short_code: {
			allowNull: false,
			defaultValue: 'quy-y-tam-bao',
			type: Sequelize.STRING,
			unique: true
		},
		name: {
			type: Sequelize.STRING
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
		prev_step: {
			type: Sequelize.STRING
		},
		next_step: {
			type: Sequelize.STRING
		},
		type: {
			type: Sequelize.INTEGER
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
		tableName: 'QYOL_Steps',
		updatedAt: 'updated_at',
		createdAt: 'created_at'
	});
};
