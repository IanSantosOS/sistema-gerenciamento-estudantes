const pesquisa = document.querySelector('#pesquisa');
const input_pesquisa = document.querySelector('#input-pesquisa');

const tabela_alunos = document.querySelector('#tabela-alunos');

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    let query_name = "";

    if (params.get('name')) {
        query_name = `?name=${params.get('name')}`
    }

    fetch(`/api/alunos/lista/${query_name}`)
        .then(res => res.json())
        .then(data => {
            for (const aluno of data) {
                const btn_atualizar = document.createElement('a');
                btn_atualizar.href = `/aluno/atualizar?id=${aluno.id_aluno}`;
                btn_atualizar.classList = 'btn btn-primary me-2';
                btn_atualizar.innerText = 'Atualizar';
                btn_atualizar.role = 'button';

                const btn_remover = document.createElement('button');
                btn_remover.classList = 'btn btn-danger';
                btn_remover.innerText = 'Remover';
                btn_remover.addEventListener('click', () => remover_aluno(aluno.id_aluno));

                const tr = tabela_alunos.insertRow();
                tr.insertCell(0).innerText = aluno.id_aluno;
                tr.insertCell(1).innerText = aluno.nome_comp;
                tr.insertCell(2).innerText = aluno.telefone;
                tr.insertCell(3).innerText = aluno.cod_turma;

                const coluna4 = tr.insertCell(4);
                coluna4.appendChild(btn_atualizar);
                coluna4.appendChild(btn_remover);
            }
        });
});

pesquisa.addEventListener('submit', (e) => {
    e.preventDefault();

    const param = input_pesquisa.value ? `?name=${input_pesquisa.value}` : "";

    window.location.assign(`/alunos/lista${param}`);
});

function atualizar_aluno(id) {

}

function remover_aluno(id) {
    fetch(`/api/alunos/delete/${id}`, { method: 'DELETE' });
}
