const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password_confirm = document.querySelector('#password-confirm');

const error_class = document.querySelectorAll('.invalid-feedback');

const form_cadastro = document.querySelector('#form-cadastro');

form_cadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cadastro = {
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirm: password_confirm.value
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(cadastro),
        headers: { 'Content-Type': 'application/json' }
    }

    await fetch('/api/admin/cadastro/', options)
        .then(res => res.json())
        .catch(err => err.message = "")
        .then(res => {
            if (res?.msg) {
                for (let prop in res.msg) {
                    const error_msg = '* ' + res.msg[prop];

                    if (prop === "password_confirm") {
                        prop = "password-confirm";
                    }

                    document.querySelector(`#${prop}`).classList.add('is-invalid');
                    document.querySelector(`#${prop}-error`).innerHTML = error_msg;
                }
            }
            else {
                alert('Cadastro realizado com sucesso!');
                username.value = "";
                email.value = "";
                password.value = "";
                password_confirm.value = "";
                limpar_mensagens_erros()
            }
            username.focus();
        });
});

function limpar_mensagens_erros() {
    const inputs = document.querySelectorAll('.is-invalid');

    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });

    error_class.forEach(err => {
        err.innerText = '';
    });
}
