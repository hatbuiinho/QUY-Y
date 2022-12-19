'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
	return queryInterface.addColumn(
			'QYOL_UserChoices',
			'step_id',
			{
				allowNull: false,
				type: 'UNIQUEIDENTIFIER',
				defaultValue: DataTypes.UUIDV4
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
