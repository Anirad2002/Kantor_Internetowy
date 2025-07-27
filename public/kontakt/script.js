function showMessage() {
    alert("Wiadomość została wysłana. Dziękujemy 😊");
    document.getElementById('contact-form').reset();
}

function saveFormData(event) {
    event.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('/save-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            showMessage();
            document.getElementById('contact-form').reset();
            goBack();
        } else {
            throw new Error('Form not saved');
        }
    })
    .catch(error => {
        console.error('Error saving form:', error);
    });
}

function goBack() {
    window.history.back();
}

window.onload = () => {
    document.getElementById('back-link').addEventListener('click', goBack);
    document.getElementById('contact-form').addEventListener('submit', saveFormData); 
};
