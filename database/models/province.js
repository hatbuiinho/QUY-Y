module.exports = (Sequelize, sequelize) => {
	return sequelize.define('DM_Tinh', {
		ID: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		Ma: {
			type: Sequelize.TEXT,
		},
		Ten: {
			type: Sequelize.TEXT,
		},
		CreatedBy: {
			type: Sequelize.INTEGER,
		},
		CreatedOn: {
			type: Sequelize.DATE,
		},
		EditedBy: {
			type: Sequelize.INTEGER,
		},
		EditedOn: {
			type: Sequelize.DATE,
		},
		IDQuocGia: {
			type: Sequelize.INTEGER,
		},
	}, {
		freezeTableName: true,
		tableName: 'DM_Tinh',
		createdAt: false,
		updatedAt: false
	});
};
