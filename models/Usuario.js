const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  nome: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    set(value) {
      this.setDataValue('senha', bcrypt.hashSync(value, 10));
    }
  }
});

module.exports = Usuario;