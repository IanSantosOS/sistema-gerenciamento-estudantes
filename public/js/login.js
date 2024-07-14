const form_login = document.querySelector('#form-login');
const username_email = document.querySelector('#username-email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');

form_login.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = {
        username_email: username_email.value,
        password: password.value
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(login),
        headers: { 'Content-Type': 'application/json' }
    }

    fetch('/api/login', options)
        .then(res => res.json())
        .catch(err => err.message = "")
        .then(data => {
            if (data.msg) {
                error.textContent = data.msg;
            } else {
                window.location.reload();
            }
        });
});
