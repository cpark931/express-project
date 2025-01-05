'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      hashedPassword: DataTypes.STRING.BINARY,
    },
    { sequelize, modelName: 'User' }
  );

  return User;
};
