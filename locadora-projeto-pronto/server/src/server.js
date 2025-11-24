
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const clientesRouter = require('./routes/clientes');
const funcionariosRouter = require('./routes/funcionarios');
const carrosRouter = require('./routes/carros');
const alugueisRouter = require('./routes/alugueis');

const app = express();
app.use(cors());
app.use(express.json());

// Serve o frontend estático
const webPath = path.join(__dirname, '../../web');
app.use(express.static(webPath));

// API
app.use('/api/clientes', clientesRouter);
app.use('/api/funcionarios', funcionariosRouter);
app.use('/api/carros', carrosRouter);
app.use('/api/alugueis', alugueisRouter);

// Fallback para SPA simples (não é uma SPA, mas garante index.html no /)
app.get('*', (req, res) => {
  res.sendFile(path.join(webPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor e frontend em http://localhost:${port}`));
