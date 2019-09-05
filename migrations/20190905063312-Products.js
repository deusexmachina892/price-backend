'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
        return Promise.all([
          queryInterface.addColumn(
            'product',
            'latest_price',
            {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                notEmpty: true,
                }
            }
          ),
          queryInterface.addColumn(
          'product',
          'latest_discounted_price',
          {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
          }
    )
        ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
