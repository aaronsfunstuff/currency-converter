async function convert() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/1c84989414fff80c2aeb4aae/latest/${from}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rates[to];
            const convertedAmount = amount * rate;

            document.getElementById('result').innerText = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        } else {
            throw new Error('Failed to fetch exchange rates');
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('result').innerText = 'Error fetching exchange rates';
    }
}

// Populate currency dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/1c84989414fff80c2aeb4aae/latest/USD');
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = Object.keys(data.conversion_rates);

            const fromSelect = document.getElementById('from');
            const toSelect = document.getElementById('to');

            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.innerText = currency;
                fromSelect.appendChild(option.cloneNode(true));
                toSelect.appendChild(option);
            });

            // Set default currencies
            fromSelect.value = 'USD';
            toSelect.value = 'EUR';
        } else {
            throw new Error('Failed to fetch currency list');
        }
    } catch (error) {
        console.error('Error fetching currency list:', error);
        alert('Failed to fetch currency list. Please try again later.');
    }
}

populateCurrencies();
