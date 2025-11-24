
async function carregar() {
  const dados = await apiGet('/carros');
  const tbody = document.getElementById('tbCarros');
  tbody.innerHTML = '';
  dados.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.id}</td>
      <td><input value="${c.nome}" data-id="${c.id}" data-campo="nome"></td>
      <td><input value="${c.modelo ?? ''}" data-id="${c.id}" data-campo="modelo"></td>
      <td><input value="${c.marca ?? ''}" data-id="${c.id}" data-campo="marca"></td>
      <td><input type="number" step="0.01" value="${c.valor_hora}" data-id="${c.id}" data-campo="valor_hora"></td>
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
  await apiPut(`/carros/${id}`, body);
  await carregar();
}

async function excluir(id) {
  await apiDelete(`/carros/${id}`);
  await carregar();
}

const form = document.getElementById('formCarro');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(form).entries());
  dados.valor_hora = Number(dados.valor_hora);
  await apiPost('/carros', dados);
  form.reset();
  await carregar();
});

carregar();
