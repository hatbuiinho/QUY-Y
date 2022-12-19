module.exports = (Sequelize, sequelize) => {
	return sequelize.define('User', {
		id: {
			field: 'ID',
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		full_name: {
			field: 'FullName',
			type: Sequelize.STRING,
		},
		id_card: {
			field: 'IdCard',
			type: Sequelize.STRING,
		},
		gender: {
			field: 'Gender',
			type: Sequelize.INTEGER,
		},
		phone: {
			field: 'Mobile',
			type: Sequelize.STRING,
		},
		email: {
			field: 'Email',
			type: Sequelize.STRING,
		},
		address: {
			field: 'Address',
			type: Sequelize.STRING,
		},
		buddha_name: {
			field: 'BuddhistName',
			type: Sequelize.STRING,
		},
		
		province_id: {
			field: 'ProvinceId',
			type: Sequelize.STRING,
		},
		district_id: {
			field: 'DistrictId',
			type: Sequelize.STRING,
		},
		ward_id: {
			field: 'WardId',
			type: Sequelize.STRING,
		},

		tt_province_id: {
			field: 'TTProvinceId',
			type: Sequelize.STRING,
		},
		tt_province_id: {
			field: 'TTDistrictId',
			type: Sequelize.STRING,
		},
		tt_ward_id: {
			field: 'TTWardId',
			type: Sequelize.STRING,
		},

		ctn_group_id: {
			field: 'CTNGroupId',
			type: Sequelize.INTEGER,
		},

		note: {
			field: 'Note',
			type: Sequelize.STRING,
		},

		birth_day: {
			field: 'BirthDay',
			type: Sequelize.INTEGER,
		},
		birth_month: {
			field: 'BirthMonth',
			type: Sequelize.INTEGER,
		},
		birth_year: {
			field: 'BirthYear',
			type: Sequelize.INTEGER,
		},
		avatar: {
			field: 'Avatar',
			type: Sequelize.STRING,
		},
		nominator: {
			field: 'Nominator',
			type: Sequelize.STRING,
		},
		hash: {
			field: 'Hash',
			type: Sequelize.STRING,
		}
	}, {
		freezeTableName: true,
		tableName: 'QuyY',
		createdAt: false,
		updatedAt: false
	});
};
