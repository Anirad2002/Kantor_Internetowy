document.addEventListener("DOMContentLoaded", function() {
  const token = localStorage.getItem('token');
  const changePasswordForm = document.getElementById('change-password-form');

  fetch('/profile/data', {
    headers: {
      'Authorization': token
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch user data');
    }
  })
  .then(data => {
    if (data.success) {
      document.getElementById('username').textContent = data.username;
      document.getElementById('email').textContent = data.email;
      document.getElementById('token').textContent = data.token;
      // document.getElementById('password').textContent = data.password; 
      document.getElementById('balance-usd').textContent = data.balance.USD.toFixed(2);
      document.getElementById('balance-eur').textContent = data.balance.EUR.toFixed(2);
    } else {
      console.error('Error:', data.message);
      window.location.href = "../zalogowany/index.html";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    window.location.href = "../zalogowany/index.html";
  });
  changePasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (!oldPassword || !newPassword) {
      alert('Prosze wypełnic wszyskie pola');
      return;
    }
    fetch('/profile/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ oldPassword, newPassword })
    })
    .then(response => {
      if (response.ok) {
        alert('Haslo zostalo zmienione');
        document.getElementById('old-password').value = '';
        document.getElementById('new-password').value = '';
      } else {
        throw new Error('Blad przy zmianie hasla');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Blad przy zmianie hasla');
    });
  });
});
