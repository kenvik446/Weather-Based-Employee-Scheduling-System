document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('country-code').value;
    const totalEmployees = document.getElementById('total-employees').value;

    fetch(`https://open-weather13.p.rapidapi.com/city/${city}/${countryCode}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "open-weather13.p.rapidapi.com",
            "x-rapidapi-key": "280411a079msha20cdb19129ec99p15a18bjsnc166334c5a2c"  
        }
    })
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const weatherConditions = data.weather.map(condition => condition.main).join(', ');

        let employeesNeeded;
        if (temperature > 20 && ["Clear", "Clouds"].some(condition => weatherConditions.includes(condition))) {
            employeesNeeded = totalEmployees;
        } else {
            employeesNeeded = Math.max(1, Math.floor(totalEmployees / 2));
        }

        document.getElementById('results').innerHTML = `
            <h2>Staffing recommendations for ${city}:</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather Conditions: ${weatherConditions}</p>
            <p>Employees Needed: ${employeesNeeded} out of ${totalEmployees}</p>
        `;
    })
    .catch(err => {
        console.error(err);
        document.getElementById('results').innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
    });
});
