module.exports = (Sequelize, sequelize) => {
	return sequelize.define('DM_Huyen', {
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
		IDTinh: {
			type: Sequelize.INTEGER,
		},
	}, {
		freezeTableName: true,
		tableName: 'DM_Huyen',
        createdAt: false,
		updatedAt: false
	});
};
