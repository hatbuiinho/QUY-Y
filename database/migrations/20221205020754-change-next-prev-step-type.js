'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return [
			queryInterface.changeColumn(
				'QYOL_Steps',
				'prev_step',
				{ type: Sequelize.STRING }
			),
			queryInterface.changeColumn(
				'QYOL_Steps',
				'next_step',
				{ type: Sequelize.STRING }
			)
		];
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
