const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./Usuario');

const Calculo = sequelize.define('Calculo', {
  operacao: DataTypes.STRING,
  valores: DataTypes.JSON,
  resultado: DataTypes.FLOAT,
  usuarioId: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario, 
      key: 'id'       
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

module.exports = Calculo;