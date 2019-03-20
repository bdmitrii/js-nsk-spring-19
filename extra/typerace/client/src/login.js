const axios = require('axios');
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  axios
    .post('/login', {
      login,
      password
    })
    .then(res => {
      console.log(res);
      if (res.statusText === 'OK') {
        window.location.replace('/');
      }
    })
    .catch(err => console.error(err));

  event.preventDefault();
});
