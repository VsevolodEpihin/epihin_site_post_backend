module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'TagsPosts',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        post_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Posts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        tag_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Tags',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        timestamps: true,
        underscored: true,
      },
    );
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('TagsPosts');
  },
};
