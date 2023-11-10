//pokedex arrays wrapped in IIFE allows add new function and a view all funciton
let pokemonRepository = (function () {
   //pokemon list
    let repository = [
    {name: 'Arcanine', height: 6.03, type: ['Fire'], abilities:['Intimidation', 'Flash Fire']},
    {name: 'Slowbro', height: 5.03, type: ['Water', 'Psychic'], abilities:['Oblivious', 'Own Tempo']},
    {name: 'Mew',height: 1.04, type: ['Psycic'], abilities:['Synchronize']}
];
//return all from pokemon list
function getAll() {
    return repository;
}

//add new pokemon to pokemon list
function add(pokemon) {
    if (typeof pokemon === 'object'){
    repository.push(pokemon);
    }
}

//add function test to put another pokemon in repository
add({name: 'Rattata', height: 1, type:['Normal'], abilities:['Run Away', 'Guts']});
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
//event listener click to show details
function showDetails(pokemon) {
    console.log(pokemon);
}

return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem
};
})()

//calls pokemon list funciton to be usable on ul tag in the webpage
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
}); 

