const APIURL = 'https://restcountries.com/v3.1/';
const region = document.getElementById('region');
const spiner = document.getElementById('spiner');
const container = document.getElementById('container');
const showAll = document.getElementById('show-all');

region.addEventListener('change', () => {
    spiner.classList.remove('hidden');
    container.classList.add('hidden');
    document.getElementById('view-all').parentNode.style.display = 'block';
    const regionData = region.value;
    getData(regionData,20)
});

function getData(region,limit){
    fetch(APIURL + region)
    .then(res => res.json())
    .then(data => showCountires(data,limit))

}
getData('all',20)

function showCountires(countires,limit) {   
    spiner.classList.add('hidden');
    container.classList.remove('hidden');

    if (countires.length > 20) {
      showAll.classList.remove('hidden')
    } else {
        showAll.classList.add('hidden');
  }
    const reducedCountry = countires.slice(0,limit);
    container.innerHTML = '';
    document.getElementById('total-result').innerText = `Total ${countires.length} countries found`;
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


document.getElementById('view-all').addEventListener('click', (e) => {
    getData(region.value);
    e.target.parentNode.style.display = 'none';
})