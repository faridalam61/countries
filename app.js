const APIURL = 'https://restcountries.com/v3.1/';
const region = document.getElementById('region');
const spiner = document.getElementById('spiner');
const container = document.getElementById('container');


region.addEventListener('change', () => {
    spiner.classList.remove('hidden');
    container.classList.add('hidden')
    const regionData = region.value;
    getData(regionData)
});

function getData(region){
    fetch(APIURL + region)
    .then(res => res.json())
    .then(data => showCountires(data))

}
getData('all')

function showCountires(countires) {   
    spiner.classList.add('hidden');
    container.classList.remove('hidden');
  
    const reducedCountry = countires.slice(0,20);
    container.innerHTML = '';
    reducedCountry.forEach(country => { 
       
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