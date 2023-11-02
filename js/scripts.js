//pokedex arrays wrapped in IIFE allows add new function and a view all funciton
let pokemonRepository = (function () {
    let pokemonList= [
    {name: 'Arcanine', height: 6.03, type: ['Fire']},
    {name: 'Slowbro', height: 5.03, type: ['Water', 'Psychic']},
    {name: 'Mew',height: 1.04, type: ['Psycic']}
];

function add(pokemon) {
    pokemonList.push(pokemon);
}

function getAll() {
    return pokemonList;
}

return {
    add: add,
    getAll: getAll
};
})()

//added value to pokemonRepository using the following format
pokemonRepository.add({name: 'Rattata', height: 1, type:['Normal']});
//execute .getAll command
console.log(pokemonRepository.getAll());

//logic to decipher if pokemon size is large or not
pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height > 5) {
        document.write(pokemon.name + " has a height of " + pokemon.height + '- wow, that\'s a big pokemon!' + '<br>')
    
} else {
    document.write(pokemon.name + ' has a height of ' + pokemon.height + '<br>');
    }
});