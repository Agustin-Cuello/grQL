const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './characters.db',
});

const Character = sequelize.define('Character', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  movie: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = {
  sequelize,
  Character,
};
