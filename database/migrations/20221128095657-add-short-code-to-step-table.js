'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	return queryInterface.addColumn(
			'QYOL_Steps',
			'short_code',
			{
				allowNull: false,
				defaultValue: 'quy-y-tam-bao',
				type: Sequelize.STRING
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
