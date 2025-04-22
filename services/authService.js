const jwt = require('jsonwebtoken');
const SECRET = 'sua_chave_secreta_super_forte'; // Em produção, use variável de ambiente

function gerarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRET,
    { expiresIn: '1h' }
  );
}

function verificarToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { gerarToken, verificarToken };