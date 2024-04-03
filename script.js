const apiUrl = 'https://restcountries.com/v3.1/all'; // API URL for fetching country data

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    // Sort the data alphabetically by country name
    data.sort((a, b) => {
      const countryA = a.name.common.toLowerCase();
      const countryB = b.name.common.toLowerCase();
      if (countryA < countryB) return -1;
      if (countryA > countryB) return 1;
      return 0;
    });

    const selectElement = document.getElementById('countries'); // Get the select element by its ID

    // Iterate over the sorted array of country objects
    data.forEach(country => {
      const optionElement = document.createElement('option'); // Create an option element
      optionElement.value = country.name.common; // Set the value of the option to the country name
      optionElement.textContent = country.name.common; // Set the text content of the option to the country name
      selectElement.appendChild(optionElement);
    });

    // Add event listener for change event on the select element
    selectElement.addEventListener('change', function(event) {
      const selectedCountryName = event.target.value; // Get the selected country name
      const selectedCountry = data.find(country => country.name.common === selectedCountryName); // Find the selected country object
      if (selectedCountry) {
        const areaCode = selectedCountry.cca2; // Get the country code of the selected country
        const flagUrl = selectedCountry.flags.png; // Get the flag image URL
        const capital = selectedCountry.capital; // Get the capital of the selected country

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close">&times;</span>
            <h3>Area Code: ${areaCode}</h3>
            <h3>Capital: ${capital}</h3>
            <img src="${flagUrl}" alt="Flag">
          </div>
        `;

        document.body.appendChild(modal);

        // Close the countries when 'X'' button is clicked
        modal.querySelector('.close').addEventListener('click', function() {
          modal.remove();
        });
      } else {
        console.log('Country not found');
      }
    });
  })
  .catch(err => {
    console.log(err);
  });