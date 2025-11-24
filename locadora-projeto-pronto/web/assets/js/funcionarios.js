
async function carregar() {
  const dados = await apiGet('/funcionarios');
  const tbody = document.getElementById('tbFunc');
  tbody.innerHTML = '';
  dados.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.id}</td>
      <td><input value="${f.nome}" data-id="${f.id}" data-campo="nome"></td>
      <td><input type="number" value="${f.idade ?? ''}" data-id="${f.id}" data-campo="idade"></td>
      <td><input value="${f.endereco ?? ''}" data-id="${f.id}" data-campo="endereco"></td>
      <td><input value="${f.telefone ?? ''}" data-id="${f.id}" data-campo="telefone"></td>
      <td><input type="number" step="0.01" value="${f.salario}" data-id="${f.id}" data-campo="salario"></td>
      <td class="actions">
        <button onclick="atualizar(${f.id})">Atualizar</button>
        <button onclick="excluir(${f.id})">Excluir</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

async function atualizar(id) {
  const inputs = [...document.querySelectorAll(`input[data-id='${id}']`)];
  const body = {};
  inputs.forEach(i => body[i.dataset.campo] = i.value);
  await apiPut(`/funcionarios/${id}`, body);
  await carregar();
}

async function excluir(id) {
  await apiDelete(`/funcionarios/${id}`);
  await carregar();
}

const form = document.getElementById('formFunc');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form).entries());
  if (dados.idade) dados.idade = Number(dados.idade);
  dados.salario = Number(dados.salario);
  await apiPost('/funcionarios', dados);
  form.reset();
  await carregar();
});

carregar();
