
async function carregarSelects() {
  const [clientes, funcionarios, carros] = await Promise.all([
    apiGet('/clientes'), apiGet('/funcionarios'), apiGet('/carros')
  ]);
  const selCliente = document.getElementById('selCliente');
  const selFunc = document.getElementById('selFunc');
  const selCarro = document.getElementById('selCarro');

  selCliente.innerHTML = clientes.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
  selFunc.innerHTML = funcionarios.map(f => `<option value="${f.id}">${f.nome}</option>`).join('');
  selCarro.innerHTML = carros.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
}

async function carregarAlugueis() {
  const dados = await apiGet('/alugueis');
  const tbody = document.getElementById('tbAlugueis');
  tbody.innerHTML = '';
  dados.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.id_aluguel}</td>
      <td>${a.nome_cliente}</td>
      <td>${a.nome_funcionario}</td>
      <td>${a.nome_carro}</td>
      <td>${a.horas}</td>
      <td>R$ ${Number(a.valor_hora_total).toFixed(2)}</td>
      <td class="actions"><button onclick="excluir(${a.id_aluguel})">Excluir</button></td>`;
    tbody.appendChild(tr);
  });
}

async function excluir(id) {
  await apiDelete(`/alugueis/${id}`);
  await carregarAlugueis();
}

const form = document.getElementById('formAluguel');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form).entries());
  dados.id_cliente = Number(dados.id_cliente);
  dados.id_funcionario = Number(dados.id_funcionario);
  dados.id_carro = Number(dados.id_carro);
  dados.horas = Number(dados.horas);
  await apiPost('/alugueis', dados);
  form.reset();
  await carregarAlugueis();
});

carregarSelects();
carregarAlugueis();
