
async function carregarClientes() {
  const dados = await apiGet('/clientes');
  const tbody = document.getElementById('tbClientes');
  tbody.innerHTML = '';
  dados.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td><input value="${c.nome}" data-id="${c.id}" data-campo="nome"></td>
      <td><input type="number" value="${c.idade ?? ''}" data-id="${c.id}" data-campo="idade"></td>
      <td><input value="${c.cnh ?? ''}" data-id="${c.id}" data-campo="cnh"></td>
      <td><input value="${c.endereco ?? ''}" data-id="${c.id}" data-campo="endereco"></td>
      <td><input value="${c.telefone ?? ''}" data-id="${c.id}" data-campo="telefone"></td>
      <td class="actions">
        <button onclick="atualizar(${c.id})">Atualizar</button>
        <button onclick="excluir(${c.id})">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

async function atualizar(id) {
  const inputs = [...document.querySelectorAll(`input[data-id='${id}']`)];
  const body = {};
  inputs.forEach(i => body[i.dataset.campo] = i.value);
  await apiPut(`/clientes/${id}`, body);
  await carregarClientes();
}

async function excluir(id) {
  await apiDelete(`/clientes/${id}`);
  await carregarClientes();
}

const form = document.getElementById('formCliente');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form).entries());
  dados.idade = dados.idade ? Number(dados.idade) : null;
  await apiPost('/clientes', dados);
  form.reset();
  await carregarClientes();
});

carregarClientes();
