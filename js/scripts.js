var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/";
  //limit and offest for pokeapi.co for load more
  var limit = 20;
  var offset = 0;

  //add pokemon to repository
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.error("add a pokemon");
    }
  }

  function getAll() {
    return repository;
  }
  //load more function to add additonal cards on button click
  function loadMore() {
    var updatedApiUrl = apiUrl + "?offset=" + offset + "&limit=" + limit;

    return $.ajax(updatedApiUrl)
      .then(function (json) {
        var newPokemons = [];

        json.results.forEach(function (item) {
          var existingPokemon = repository.find(function (p) {
            return p.name === item.name;
          });

          if (!existingPokemon) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
            newPokemons.push(pokemon);
          }
        });

        offset += limit;
        return newPokemons;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // load more button on click
  $("#loadMoreButton").on("click", function () {
    loadMore().then(function (newPokemons) {
      // After loading more data, add new cards to the page
      newPokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
      });
    });
  });
  //pokemon card creator
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      var row = $(".row");

      var card = $('<div class="card" style="width:400px"></div>');
      var cardImage = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      cardImage.attr("src", pokemon.imageUrlFront);
      var cardBody = $('<div class="card-body"></div>');
      var cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      var profile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      row.append(card);
      //Append the image to each card
      card.append(cardImage);
      card.append(cardBody);
      cardBody.append(cardTitle);
      cardBody.append(profile);

      profile.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url)
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  // show the modal content
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    //clear modal
    modalTitle.empty();
    modalBody.empty();

    //Creates name in modal
    let nameElement = $("<h1>" + item.name + "</h1>");
    // creates image in modal
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    // hideModal: hideModal
  };
})();
pokemonRepository.loadList().then(function () {
  // loading data to list
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
