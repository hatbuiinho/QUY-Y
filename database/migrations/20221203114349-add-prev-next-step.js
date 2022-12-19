'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		return [
			queryInterface.addColumn(
				'QYOL_Steps',
				'prev_step',
				{ type: 'UNIQUEIDENTIFIER' }
			),
			queryInterface.addColumn(
				'QYOL_Steps',
				'next_step',
				{ type: 'UNIQUEIDENTIFIER' }
			)
		];
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
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
