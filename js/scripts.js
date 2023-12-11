//pokedex arrays wrapped in IIFE allows add new function and a view all funciton
let pokemonRepository = (function () {
   //pokemon list empty array and api
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';



//add new pokemon to pokemon list and error if invalid input
function add(pokemon) {
    if (typeof pokemon === 'object' &&
    "name" in pokemon){
    pokemonList.push(pokemon);
    } else {
        console.log("invalid input");
    }
}
//return all from pokemon list
function getAll() {
    return pokemonList;
}

//creates li to ul tag in html to display buttons for each pokemon in list with event listener to display their details
function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function() {
        showDetails(pokemon);
    });
}
//api load pokemon list name and details
function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json()
    }).then(function (json) {
        json.results.forEach(function (item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url,
            };
            add(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
}

//load details from api
function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
        return response.json();
    }).then(function (details){
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
}
//event listener click to show details
function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
        console.log(pokemon);
    })
}

return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
};
})();

//calls pokemon list funciton to be usable on ul tag in the webpage
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});