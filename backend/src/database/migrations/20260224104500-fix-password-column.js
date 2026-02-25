'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = 'users';
    // describe current columns (fallback if table doesn't exist yet)
    let fields = {};
    try {
      fields = await queryInterface.describeTable(table);
    } catch (err) {
      // table may not exist, nothing to fix
      return;
    }

    if (fields.senha) {
      // rename and adjust type
      await queryInterface.renameColumn(table, 'senha', 'password');
      await queryInterface.changeColumn(table, 'password', {
        type: Sequelize.STRING,
        allowNull: false
      });
    } else if (!fields.password) {
      // neither column present, add correct one
      await queryInterface.addColumn(table, 'password', {
        type: Sequelize.STRING,
        allowNull: false
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = 'users';
    const fields = await queryInterface.describeTable(table).catch(() => ({}));
    if (fields.password) {
      // drop the password column added/renamed by this migration
      await queryInterface.removeColumn(table, 'password');
    }
  }
};