const express = require('express');
const app = express();
app.use(express.json());

const sequelize = require('./database');

const Usuario = require('./models/Usuario');
const Calculo = require('./models/Calculo');

Usuario.hasMany(Calculo, { foreignKey: 'usuarioId' });
Calculo.belongsTo(Usuario, { foreignKey: 'usuarioId' });

const calculadoraRoutes = require('./routes/calculadoraRoutes');
const authRoutes = require('./routes/authRoutes'); 

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Banco de dados sincronizado');
  criarUsuarioTeste(); 
});

app.use('/auth', authRoutes); 
app.use('/', calculadoraRoutes); 

app.use((err, req, res, next) => {
  console.error('Erro:', err.stack);
  res.status(500).json({ erro: 'Algo deu errado!' });
});

app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));