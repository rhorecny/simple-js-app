//pokedex arrays
let pokemonList= [
    {name: 'Arcanine', height: 6, type: 'Fire'},
    {name: 'Slowbro', height: 5, type: ['Water', 'Psychic']},
    {name: 'Mew',height: 1, type: 'Psycic'}
];

//Loop lists pokemon name and height on index.html, and highlights if the pokemon is a big pokemon based on size. <p> tags added for list
for (let i = 0; i < pokemonList.length; i++){
    document.write(`<p>${pokemonList[i].name} (Height: ${pokemonList[i].height})`);
 if (pokemonList[i].height > 5) {
    document.write(' - Wow, that\'s a big Pokemon!</p>');
} else {
    document.write('</p>');
}
} 