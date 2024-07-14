const params = new URLSearchParams(window.location.search);
const param_page = parseInt(params.get('page'));
const param_name = params.get('name');

const pesquisa = document.querySelector('#pesquisa');
const input_pesquisa = document.querySelector('#input-pesquisa');

const dados_alunos = document.querySelector('#dados-alunos');
const tabela_alunos = document.querySelector('#tabela-alunos');

const prev_page = document.querySelector('#prev-page');
const page_info = document.querySelector('#page-info');
const next_page = document.querySelector('#next-page');

// EVENT LISTENERS

document.addEventListener('DOMContentLoaded', async () => {
    page_info.querySelector('span').innerText = param_page;

    if (param_page === 1) {
        prev_page.disabled = true;
    }

    let query_1 = `?offset=${(param_page - 1) * 5}&limit=5`;
    let query_2 = `?offset=${(param_page) * 5}&limit=5`;

    if (param_name) {
        query_1 += `&name=${param_name}`;
        query_2 += `&name=${param_name}`;
    }

    // verificar se existe alunos para a próxima página
    // e desativar o botão next_page se não tiver alunos
    await fetch(`/api/alunos/lista/${query_2}`)
        .then(res => res.json())
        .then(data => {
            if (data.length !== 0) return;
            next_page.disabled = true;
        });

    // colocar dados na tabela
    await fetch_lista(query_1);
});

pesquisa.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const param = input_pesquisa.value ? `name=${input_pesquisa.value}` : "";
    
    window.location.assign(`/alunos/lista?page=1&${param}`);
});

prev_page.addEventListener('click', () => {
    let query = `?page=${param_page - 1}`;
    
    if (param_name) {
        query += `&name=${param_name}`;
    }
    window.location.assign(`/alunos/lista${query}`);
});

next_page.addEventListener('click', () => {
    let query = `?page=${param_page + 1}`;
    
    if (param_name) {
        query += `&name=${param_name}`;
    }
    window.location.assign(`/alunos/lista${query}`);
});

// FUNCTIONS

function remover_aluno(id) {
    fetch(`/api/alunos/delete/${id}`, { method: 'DELETE' })
        .then(_res => window.location.reload());
}

async function fetch_lista(query) {
    await fetch(`/api/alunos/lista/${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                const p = document.createElement('p');
                dados_alunos.innerHTML = "";

                p.innerText = "* Nenhum aluno foi encontrado"
                p.style.color = "#ff0000";
                p.style.fontSize = "18px";

                dados_alunos.appendChild(p);
                return;
            }

            for (const aluno of data) {
                const btn_atualizar = document.createElement('a');
                btn_atualizar.href = `/alunos/atualizar?id=${aluno.id_aluno}`;
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
}
