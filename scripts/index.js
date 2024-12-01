document.getElementById('registroForm').addEventListener('submit',  function(e){
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const categoria = document.getElementById('categoria').value;
    const prioridade = document.getElementById('prioridade').value;
    const email = document.getElementById('email').value;


    const paciente = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        prioridade: document.getElementById('prioridade').value,
        email: document.getElementById('email').value,
        id: Date.now()
    }

    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    //adc novo registro
    pacientes.push(paciente);

    localStorage.setItem('pacientes',JSON.stringify(pacientes));
    alert ('paciente cadastrado com sucesso!')
    //vou usar em registros.js
    //Lista de cadastrados
    // const lista = document.getElementById('tabela-cadastro');
    // const itemLista = document.createElement('li');

    // itemLista.innerHTML = `
    //     <strong>Nome: </strong> ${nome}<br>
    //     <strong>Categoria: </strong> ${categoria}<br>
    //     <strong>Prioridade: </strong> ${prioridade}<br>
    //     <strong>Contato: </strong> ${email}
    //     <button onclick="this.parentElement.remove()">Remover</button>
    // `;
    
    // lista.appendChild(itemLista);
    // alert('Cadastro efetuado com sucesso!')

    //limpando formulário depois do cadastro
    this.reset();
})