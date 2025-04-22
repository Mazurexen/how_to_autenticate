const { verificarToken } = require('../services/authService');

async function autenticar(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token ausente');

    const payload = verificarToken(token);
    req.usuarioId = payload.id; // Adiciona ID do usuário à requisição
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Não autorizado' });
  }
}

module.exports = autenticar;