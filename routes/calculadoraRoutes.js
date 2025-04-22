const express = require('express');
const router = express.Router();
const Calculo = require('../models/Calculo');
const autenticar = require('../middlewares/auth');

router.post('/', autenticar, async (req, res) => {
  console.log('Usuário autenticado ID:', req.usuarioId);
  console.log('Body recebido:', req.body);

  const { operacao, a, b } = req.body;

  if (!operacao || a === undefined || b === undefined) {
    return res.status(400).json({ 
      erro: 'Parâmetros faltando!',
      detalhes: 'Forneça: operacao, a, b'
    });
  }

  const numA = Number(a);
  const numB = Number(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ 
      erro: 'Valores inválidos!',
      detalhes: 'a e b devem ser números'
    });
  }

  let resultado;
  try {
    switch (operacao) {
      case 'soma':
        resultado = numA + numB;
        break;
      case 'subtracao':
        resultado = numA - numB;
        break;
      case 'multiplicacao':
        resultado = numA * numB;
        break;
      case 'divisao':
        if (numB === 0) throw new Error('Divisão por zero');
        resultado = numA / numB;
        break;
      case 'porcentagem':
        resultado = (numA * numB) / 100;
        break;
      case 'potencia':
        resultado = Math.pow(numA, numB);
        break;
      default:
        throw new Error('Operação inválida');
    }

    const calculo = await Calculo.create({
      operacao,
      valores: [numA, numB],
      resultado,
      usuarioId: req.usuarioId
    });

    res.json({
      sucesso: true,
      operacao: `${numA} ${operacao} ${numB}`,
      resultado,
      calculoId: calculo.id,
      timestamp: calculo.createdAt
    });

  } catch (erro) {
    console.error('Erro no cálculo:', erro.message);
    res.status(400).json({
      erro: 'Falha na operação',
      detalhes: erro.message
    });
  }
});

router.get('/historico', autenticar, async (req, res) => {
  try {
    const historico = await Calculo.findAll({
      where: { usuarioId: req.usuarioId },
      attributes: ['id', 'operacao', 'valores', 'resultado', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ historico });
  } catch (erro) {
    res.status(500).json({ 
      erro: 'Falha ao buscar histórico',
      detalhes: erro.message 
    });
  }
});

module.exports = router;