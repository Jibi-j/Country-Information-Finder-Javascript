document.getElementById('searchButton').addEventListener('click', async () => {
    const countryName = document.getElementById('countryInput').value;
    const countryInfoDiv = document.getElementById('countryInfo');
    countryInfoDiv.innerHTML = ''; 
    if (!countryName) {
        countryInfoDiv.innerHTML = '<p>Please enter a country name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        const data = await response.json();
        const country = data[0];

        const countryDetails = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        `;
        countryInfoDiv.innerHTML = countryDetails;
    } catch (error) {
        countryInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
});

