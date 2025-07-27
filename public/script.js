document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById('currency-table');
  const tableNew = document.getElementById('currency-table-new');
  const converterForm = document.getElementById('converter-form');
  const sourceCurrencySelect = document.getElementById('source-currency');
  const targetCurrencySelect = document.getElementById('target-currency');
  const searchInput = document.getElementById('search-input');

  const convertCurrency = (amount, sourceCurrency, targetCurrency) => {
    fetch('/rates')
      .then(response => response.json())
      .then(data => {
        const { [sourceCurrency]: sourceRate, [targetCurrency]: targetRate } = data;
        const result = (amount / sourceRate) * targetRate;
        const resultElement = document.getElementById('conversion-result');
        resultElement.textContent = `${amount} ${sourceCurrency} = ${result.toFixed(2)} ${targetCurrency}`;
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
        alert('Error fetching currencies. Please try again later.');
      });
  };

  converterForm.addEventListener('submit', event => {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const sourceCurrency = sourceCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    if (sourceCurrency === targetCurrency) {
      alert('Please select different currencies for source and target.');
      return;
    }
    convertCurrency(amount, sourceCurrency, targetCurrency);
  });

  const fetchDataAndUpdateTable = () => {
    fetch('/rates') 
      .then(response => response.json())
      .then(data => {
        table.innerHTML = '';
        tableNew.innerHTML = '';
        const selectedCurrencies = Object.keys(data);
        const firstTableCurrencies = selectedCurrencies.slice(0, 10);
        const secondTableCurrencies = selectedCurrencies.slice(10, 20);
        firstTableCurrencies.forEach(currency => {
          const row = createRow(currency, data);
          table.appendChild(row);
        });
        secondTableCurrencies.forEach(currency => {
          const row = createRow(currency, data);
          tableNew.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  };

  const updateCurrencyOptions = data => {
    const currencies = Object.keys(data);
    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      sourceCurrencySelect.appendChild(option);
      if (currency !== sourceCurrencySelect.value) {
        targetCurrencySelect.appendChild(option.cloneNode(true));
      }
    });
  };

  fetchDataAndUpdateTable();

  fetch('/rates')
    .then(response => response.json())
    .then(data => {
      updateCurrencyOptions(data);
    })
    .catch(error => {
      console.error('Error fetching currencies:', error);
    });

  const refreshInterval = 5000;
  setInterval(fetchDataAndUpdateTable, refreshInterval);

  searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toUpperCase();
    const allCurrencyRows = [...table.getElementsByTagName('tr'), ...tableNew.getElementsByTagName('tr')];
    allCurrencyRows.forEach(row => {
      const currencyCell = row.getElementsByTagName('td')[0];
      if (currencyCell) {
        const currencyText = currencyCell.textContent.toUpperCase();
        row.style.display = currencyText.includes(searchValue) ? '' : 'none';
      }
    });
  });
  
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.location.href = '/';
      console.log('User logged out');
    });
  }
});

const createRow = (currency, data) => {
  const row = document.createElement('tr');
  const currencyCell = document.createElement('td');
  currencyCell.textContent = currency;
  const rateCell = document.createElement('td');
  const rate = data[currency];
  rateCell.textContent = rate ? rate.toFixed(2) : 'N/A';
  row.appendChild(currencyCell);
  row.appendChild(rateCell);
  return row;
};
