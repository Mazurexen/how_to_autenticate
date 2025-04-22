const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { gerarToken } = require('../services/authService');

// Cadastro de usuário
router.post('/registrar', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({
      id: usuario.id,
      token: gerarToken(usuario)
    });
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
    return res.status(401).json({ erro: 'Credenciais inválidas' });
  }

  res.json({ token: gerarToken(usuario) });
});

module.exports = router;