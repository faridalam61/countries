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
                <div class="card text-center">
                   <img src="${country.flags.png}" alt="" class="img">
                   <h2 class="country-name">${country.name.common}</h2>
                   <!--<p>Capital: ${country.capital ? country.capital[0] : 'Not available'}</p>-->
                   <label for='my-modal-6' class='bg-red-200 hover:bg-red-300 py-2 text-black rounded my-2' onclick='viewDetails("${country.name.common}","${country.capital}","${country.region}","${country.subregion}","${country.timezones[0]}")'>View Details</label>
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

function viewDetails(name,capital,region,subregion,timezone){
    document.getElementById('cname').innerHTML = `${name}`;
    document.getElementById('cap').innerHTML = `Capital: ${capital}`;
        document.getElementById('reg').innerHTML = `Region: ${region}`;
       document.getElementById('subregion').innerHTML = `Sub Region: ${subregion}`;
        document.getElementById('timezone').innerHTML = `Timezone: ${timezone}`;
}