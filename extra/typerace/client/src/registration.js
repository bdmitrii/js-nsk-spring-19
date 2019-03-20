const axios = require('axios');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;

  axios
    .post('/api/registration', {
      login,
      password,
      password2
    })
    .then(res => {
      if (res.statusText === 'OK') {
        window.location.replace('/login');
      }
    });

  event.preventDefault();
});
