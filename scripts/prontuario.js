
function carregarPacientes() {
    const pacienteSelect = document.getElementById('pacienteSelecionado');
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    
    pacienteSelect.innerHTML = '<option value="">Selecione um paciente</option>';

    
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nome;
        pacienteSelect.appendChild(option);
    });
}


function carregarFormularioProntuario() {
    const pacienteId = parseInt(document.getElementById('pacienteSelecionado').value);
    const formProntuario = document.getElementById('formProntuario');
    
    
    formProntuario.style.display = 'block';
    
    
    document.getElementById('pacienteId').value = pacienteId;

    
    carregarHistoricoProntuarios(pacienteId);
}


function salvarProntuario(e) {
    e.preventDefault();
    
   
    const prontuario = {
        pacienteId: parseInt(document.getElementById('pacienteId').value),
        dataConsulta: document.getElementById('dataConsulta').value,
        medico: document.getElementById('medico').value,
        queixaPrincipal: document.getElementById('queixaPrincipal').value,
        historicoDoenca: document.getElementById('historicoDoenca').value,
        pressaoArterial: document.getElementById('pressaoArterial').value,
        temperatura: document.getElementById('temperatura').value,
        diagnostico: document.getElementById('diagnostico').value,
        tratamento: document.getElementById('tratamento').value,
        observacoes: document.getElementById('observacoes').value,
        id: Date.now() 
    };

    
    let prontuarios = JSON.parse(localStorage.getItem('prontuarios')) || [];
    
    
    prontuarios.push(prontuario);
    
    
    localStorage.setItem('prontuarios', JSON.stringify(prontuarios));

    
    carregarHistoricoProntuarios(prontuario.pacienteId);

    
    e.target.reset();

    
    alert('Prontuário salvo com sucesso!');
}


function carregarHistoricoProntuarios(pacienteId) {
    const listaProntuarios = document.getElementById('listaProntuarios');
    
    
    const prontuarios = JSON.parse(localStorage.getItem('prontuarios')) || [];
    
    
    const prontuariosPaciente = prontuarios.filter(p => p.pacienteId === pacienteId);

    
    listaProntuarios.innerHTML = '';

    
    if (prontuariosPaciente.length === 0) {
        listaProntuarios.innerHTML = '<p class="text-center">Nenhum prontuário encontrado para este paciente.</p>';
        return;
    }

    
    prontuariosPaciente.forEach((prontuario) => {
        const cardHtml = `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between">
                    <strong>Consulta em: ${new Date(prontuario.dataConsulta).toLocaleDateString()}</strong>
                    <div>
                        <button onclick="editarProntuario(${prontuario.id})" class="btn btn-sm btn-warning me-2">Editar</button>
                        <button onclick="excluirProntuario(${prontuario.id}, ${pacienteId})" class="btn btn-sm btn-danger">Excluir</button>
                    </div>
                </div>
                <div class="card-body">
                    <p><strong>Médico:</strong> ${prontuario.medico}</p>
                    <p><strong>Queixa Principal:</strong> ${prontuario.queixaPrincipal}</p>
                    <p><strong>Diagnóstico:</strong> ${prontuario.diagnostico}</p>
                    <p><strong>Tratamento:</strong> ${prontuario.tratamento}</p>
                </div>
            </div>
        `;
        listaProntuarios.innerHTML += cardHtml;
    });
}


function editarProntuario(prontuarioId) {
    
    const prontuarios = JSON.parse(localStorage.getItem('prontuarios')) || [];
    
    
    const prontuario = prontuarios.find(p => p.id === prontuarioId);

    if (prontuario) {
       
        document.getElementById('pacienteId').value = prontuario.pacienteId;
        document.getElementById('dataConsulta').value = prontuario.dataConsulta;
        document.getElementById('medico').value = prontuario.medico;
        document.getElementById('queixaPrincipal').value = prontuario.queixaPrincipal;
        document.getElementById('historicoDoenca').value = prontuario.historicoDoenca;
        document.getElementById('pressaoArterial').value = prontuario.pressaoArterial;
        document.getElementById('temperatura').value = prontuario.temperatura;
        document.getElementById('diagnostico').value = prontuario.diagnostico;
        document.getElementById('tratamento').value = prontuario.tratamento;
        document.getElementById('observacoes').value = prontuario.observacoes;

        
        const updatedProntuarios = prontuarios.filter(p => p.id !== prontuarioId);
        localStorage.setItem('prontuarios', JSON.stringify(updatedProntuarios));
    }
}


function excluirProntuario(prontuarioId, pacienteId) {
    
    if (!confirm('Tem certeza que deseja excluir este prontuário?')) return;

    
    let prontuarios = JSON.parse(localStorage.getItem('prontuarios')) || [];
    
    
    prontuarios = prontuarios.filter(p => p.id !== prontuarioId);
    
    
    localStorage.setItem('prontuarios', JSON.stringify(prontuarios));

    
    carregarHistoricoProntuarios(pacienteId);
}


document.addEventListener('DOMContentLoaded', () => {
    
    carregarPacientes();

    
    document.getElementById('pacienteSelecionado').addEventListener('change', carregarFormularioProntuario);

    
    document.getElementById('prontuarioForm').addEventListener('submit', salvarProntuario);
});