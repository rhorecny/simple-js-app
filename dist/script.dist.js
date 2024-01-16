var pokemonRepository = (function () {
  var t = [],
    e = "https://pokeapi.co/api/v2/pokemon/",
    n = 0;
  function a(e) {
    "object" == typeof e && "name" in e && "detailsUrl" in e
      ? t.push(e)
      : console.error("add a pokemon");
  }
  function o() {
    return t;
  }
  function i(t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    $(".modal-header"), n.empty(), e.empty();
    let a = $("<h1>" + t.name + "</h1>"),
      o = $('<img class="modal-img" style="width:50%">');
    o.attr("src", t.imageUrlFront);
    let i = $('<img class="modal-img" style="width:50%">');
    i.attr("src", t.imageUrlBack);
    let r = $("<p>height : " + t.height + "</p>"),
      l = $("<p>weight : " + t.weight + "</p>");
    n.append(a), e.append(o), e.append(i), e.append(r), e.append(l);
  }
  return (
    $("#loadMoreButton").on("click", function () {
      var o;
      ((o = e + "?offset=" + n + "&limit=20"),
      $.ajax(o)
        .then(function (e) {
          var o = [];
          return (
            e.results.forEach(function (e) {
              if (
                !t.find(function (t) {
                  return t.name === e.name;
                })
              ) {
                var n = { name: e.name, detailsUrl: e.url };
                a(n), o.push(n);
              }
            }),
            (n += 20),
            o
          );
        })
        .catch(function (t) {
          console.error(t);
        })).then(function (t) {
        t.forEach(function (t) {
          pokemonRepository.addListItem(t);
        });
      });
    }),
    {
      add: a,
      getAll: o,
      addListItem: function t(e) {
        pokemonRepository.loadDetails(e).then(function () {
          var t = $(".row"),
            n = $('<div class="card" style="width:400px"></div>'),
            a = $(
              '<img class="card-img-top" alt="Card image" style="width:20%" />'
            );
          a.attr("src", e.imageUrlFront);
          var o = $('<div class="card-body"></div>'),
            r = $("<h4 class='card-title' >" + e.name + "</h4>"),
            l = $(
              '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
            );
          t.append(n),
            n.append(a),
            n.append(o),
            o.append(r),
            o.append(l),
            l.on("click", function (t) {
              (function t(e) {
                pokemonRepository.loadDetails(e).then(function () {
                  i(e);
                });
              })(e);
            });
        });
      },
      loadList: function t() {
        return $.ajax(e)
          .then(function (t) {
            t.results.forEach(function (t) {
              a({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      loadDetails: function t(e) {
        var n = e.detailsUrl;
        return $.ajax(n)
          .then(function (t) {
            (e.imageUrlFront = t.sprites.front_default),
              (e.imageUrlBack = t.sprites.back_default),
              (e.height = t.height),
              (e.weight = t.weight);
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      showModal: i,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});