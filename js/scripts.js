//pokedex arrays
let pokemonList= [
    {name: 'Arcanine', height: 6, type: 'Fire'},
    {name: 'Slowbro', height: 5, type: ['Water', 'Psychic']},
    {name: 'Mew',height: 1, type: 'Psycic'}
];

//Loop lists pokemon name and height on index.html, and highlights if the pokemon is a big pokemon based on size. <p> tags added for list
function pokemonLoopFunction(pokemon) {
    document.write('<p>' + pokemon.name + ' has a height of ' + pokemon.height )
};
pokemonList.forEach(pokemonLoopFunction);