document.getElementById('formularzPlatnosci').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const imieNazwisko = document.getElementById('imieNazwisko').value;
    const numerKarty = document.getElementById('numerKarty').value;
    const dataWaznosci = document.getElementById('dataWaznosci').value;
    const cvv = document.getElementById('cvv').value;
    const wybranaWaluta = document.getElementById('waluta').value;
    const ilosc = document.getElementById('kwota').value;
    const token = localStorage.getItem('token');

    if (!ilosc) {
        alert('Proszę podać kwotę.');
        return;
    }

    const dataToWrite = {
        "Imię Nazwisko": imieNazwisko,
        "Numer Karty": numerKarty,
        "Data Ważności": dataWaznosci,
        "CVV": cvv,
        "Wybrana Waluta": wybranaWaluta,
        "Ilość": ilosc,
        "Token": token
    };

    try {
        const response = await fetch('http://localhost:3000/write_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToWrite)
        });

        if (!response.ok) {
            throw new Error('Wystąpił problem podczas wysyłania danych.');
        }

        const responseData = await response.text();
        console.log(responseData);
        window.location.href = 'success.html';
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
});
