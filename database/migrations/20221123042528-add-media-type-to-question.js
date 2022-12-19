'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return queryInterface.addColumn(
			'QYOL_Questions',
			'media_type',
			{
				after: "audio_url",
				type: "tinyint",
				allowNull: false,
				defaultValue: 0
			}
		);
	},

	async down (queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	}
};
