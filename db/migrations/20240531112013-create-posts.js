module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Posts',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true,
          },
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            notNull: true,
            notEmpty: true,
          },
        },
        image_url: {
          type: Sequelize.STRING,
        },
      },
      {
        timestamps: true,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Posts');
  },
};
