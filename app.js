const region = document.getElementById('region');
region.addEventListener('change', () => {
    let url = `https://restcountries.com/v3.1/region/${region.value}`;
    fetch(url)
        .then(res => res.json())
    .then(data => showCountires(data))
})

function showCountires(countires) {
    let container = document.getElementById('container');
    container.innerHTML = '';
    countires.forEach(country => { 
       
        let makeDiv = document.createElement('div');
        makeDiv.innerHTML = `
                <div class="card">
                   <img src="${country.flags.png}" alt="" class="img">
                   <h2 class="country-name">${country.altSpellings[1] ? country.altSpellings[1] : country.altSpellings[0]}</h2>
                   <p>Capital: ${country.capital ? country.capital[0] : 'Unknown'}</p>
                </div>
        `;
        container.appendChild(makeDiv);
    }
        
    );

}