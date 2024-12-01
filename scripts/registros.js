function exibirRegistros() {
    const listaRegistros = document.getElementById('listaRegistros');

    // Recupera os pacientes do localStorage ou define uma lista vazia como padrão
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    // Limpa o conteúdo da lista para evitar duplicações
    listaRegistros.innerHTML = '';

    // Exibe uma mensagem se não houver pacientes registrados
    if (pacientes.length === 0) {
        listaRegistros.innerHTML = '<p class="text-center w-100">Nenhum paciente encontrado.</p>';
        return;
    }

    // Cria cards para cada paciente
    pacientes.forEach((paciente) => {
        const cardHtml = `
            <div class="col-md-4 mb-4" style="width: 300px;">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">${paciente.nome}</h4>
                        <p class="card-text">
                            <strong>Categoria:</strong> ${paciente.categoria}<br>
                            <strong>Prioridade:</strong> ${paciente.prioridade}<br>
                            <strong>Contato:</strong> ${paciente.email}
                        </p>
                        <button onclick="editarPaciente(${paciente.id})" class="btn btn-outline-warning">Editar</button>
                        <button onclick="removerPaciente(${paciente.id})" class="btn btn-outline-danger">Remover</button>
                    </div>
                </div>
            </div>
        `;
        listaRegistros.innerHTML += cardHtml;
    });
}

function editarPaciente(id) {
    // Recupera a lista de pacientes do localStorage
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    
    // Busca o paciente com o ID fornecido
    const paciente = pacientes.find((p) => p.id === id);
    if (!paciente) return; // Se não encontrar o paciente, encerra a função

    // Cria o modal para edição
    const modal = `
        <div class="modal fade show" id="editModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Paciente</h5>
                        <button type="button" class="btn-close" onclick="fecharModal()"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm">
                            <input type="hidden" id="editId" value="${paciente.id}">
                            <div class="mb-3">
                                <label for="editNome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="editNome" value="${paciente.nome}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editCategoria" class="form-label">Categoria</label>
                                <select class="form-select" id="editCategoria" required>
                                    <option value="consulta" ${paciente.categoria === 'consulta' ? 'selected' : ''}>Consulta</option>
                                    <option value="exame" ${paciente.categoria === 'exame' ? 'selected' : ''}>Exame</option>
                                    <option value="encaixe" ${paciente.categoria === 'encaixe' ? 'selected' : ''}>Encaixe</option>
                                    <option value="retorno" ${paciente.categoria === 'retorno' ? 'selected' : ''}>Retorno</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editPrioridade" class="form-label">Prioridade</label>
                                <select class="form-select" id="editPrioridade" required>
                                    <option value="alta" ${paciente.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
                                    <option value="media" ${paciente.prioridade === 'media' ? 'selected' : ''}>Média</option>
                                    <option value="baixa" ${paciente.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="editEmail" class="form-label">Contato</label>
                                <input type="text" class="form-control" id="editEmail" value="${paciente.email}" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insere o modal no corpo da página
    document.body.insertAdjacentHTML('beforeend', modal);

    // Adiciona o evento para salvar as alterações ao formulário
    document.getElementById('editForm').addEventListener('submit', function (e) {
        e.preventDefault();
        salvarEdicao();
    });
}

function salvarEdicao() {
    // Recupera a lista de pacientes do localStorage
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    // Obtém os dados do formulário
    const id = parseInt(document.getElementById('editId').value);
    const nome = document.getElementById('editNome').value;
    const categoria = document.getElementById('editCategoria').value;
    const prioridade = document.getElementById('editPrioridade').value;
    const email = document.getElementById('editEmail').value;

    // Atualiza o paciente correspondente
    const index = pacientes.findIndex((p) => p.id === id);
    if (index !== -1) {
        pacientes[index] = { id, nome, categoria, prioridade, email };

        // Salva as alterações no localStorage
        localStorage.setItem('pacientes', JSON.stringify(pacientes));

        // Fecha o modal e atualiza a exibição
        fecharModal();
        exibirRegistros();
    }
}

function fecharModal() {
    // Remove o modal da página
    const modal = document.getElementById('editModal');
    if (modal) modal.remove();
}

function removerPaciente(id) {
    // Recupera a lista de pacientes do localStorage
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    // Filtra os pacientes para remover o correspondente ao ID
    pacientes = pacientes.filter((paciente) => paciente.id !== id);

    // Atualiza o localStorage e a exibição
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
    exibirRegistros();
}

// Exibe os registros quando a página é carregada
document.addEventListener('DOMContentLoaded', exibirRegistros);
