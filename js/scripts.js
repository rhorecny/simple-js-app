//pokedex arrays wrapped in IIFE allows add new function and a view all funciton
let pokemonRepository = (function () {
   //pokemon list empty array and api
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';



//add new pokemon to pokemon list and error if invalid input
function add(pokemon) {
    if (typeof pokemon === 'object' &&
    "name" && "detailsUrl" in pokemon){
    pokemonList.push(pokemon);
    } else {
        console.log("invalid input");
    }
}

//modal detals
function showDetails(pokemon) {
    loadDetails(pokemon).then(function ()  {
        showModal(pokemon);
    });
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


function showModal(pokemon) {
    let modalContainer= document.querySelector('#modal-container');

    //Clear all existing modal content
    modalContainer.innerHTML= '';

    let modal= document.createElement('div');
    modal.classList.add('modal');

    //Add new modal content
    let closeButtonElement= document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText= 'x';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement= document.createElement('h1');
    titleElement.innerText= pokemon.name;

    let contentElement= document.createElement('p');
    contentElement.innerText= 'Height:' + ' ' + pokemon.height;

    let imageElement= document.createElement('img');
    imageElement.src= pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
    //event listener to click out of modal
    modalContainer.addEventListener('click', (e) => {
        let target= e.target;
        if(target === modalContainer) {
            hideModal();
        }
    });
}
//hides modal
function hideModal() {
    let modalContainer= document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
}
//adds event listener to close modal on keystroke esc
window.addEventListener('keydown', (e) => {
    let modalContainer= document.querySelector('#modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
});

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


return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
};
})();

//calls pokemon list funciton to be usable on ul tag in the webpage
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});