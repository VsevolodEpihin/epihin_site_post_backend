module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Tags',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: true,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Tags');
  },
};
