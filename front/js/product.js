// Récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let urlId = urlParams.get('id');
//  Récupérer le panier sous forme d'objet
let lsCart = localStorage.getItem("product");
// S"assurer que lsCart exist bien (sous forme de string)
if (!lsCart) {
  lsCart = '[]';
}
let cart = JSON.parse(lsCart);

fetch('http://localhost:3000/api/products/' + urlId)

  .then(function (res) {
    if (res.ok) {
      return res.json();

    }

  })

  .then(data => {
    // Renomage de la page en fonction du produit
    document.title = data.name;
    // Création du contenu de l'article descriptif du produit
    const div = document.getElementsByClassName("item__img")[0];
    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.altTxt;
    div.appendChild(img);
    const h1 = document.getElementById("title");
    h1.innerHTML = data.name;
    const price = document.getElementById("price");
    price.innerHTML = data.price;
    const description = document.getElementById("description");
    description.innerHTML = data.description;
    // Renseignement des options de couleur
    for (let color of data.colors) {
      const select = document.getElementById('colors');
      const option = document.createElement("option");
      option.innerHTML = color;
      option.value = color;
      select.appendChild(option);

    }
    // Oninput pour calcul du sous total en temps réel
    let inputQty = document.querySelector("input");
    inputQty.oninput = function () {
      sstt.innerHTML = "sous total : " + inputQty.value * data.price + "€";
    };
    // Affichage du sous total
    const div_icsq = document.getElementsByClassName("item__content__settings__quantity")[0];
    const sstt = document.createElement("h2");
    sstt.innerHTML = " Sous total : " + data.price * document.getElementById("quantity").value + "€";
    div_icsq.appendChild(sstt);

    //////////////////////////////////////////////addToCart///////////////////////////////////////////////////////////////

    const addToCart_btn = document.getElementById("addToCart");
    // Validation listen
    addToCart_btn.addEventListener('click', (e) => {
      (e).preventDefault();
      // Récupérer les données de couleur et qte
      let selectedColor = document.getElementById("colors").value;
      // ATTENTION: nous voulons une valeur et pas une string
      let qty = parseInt(document.getElementById("quantity").value);
      // Construire l'objet sélectionné
      // Canapé choisi
      const selection = {
        id: data._id,
        option: selectedColor,
        quantité: qty

      }

      // Je recherche l'objet sélectionné dans le panier
      const objectInCart = findObjectInCart(selection.id, selection.option);
      let qtyInCart;
      // Version opérateur ternaire
      // qtyInCart = (objectInCart === null) ? 0 : objectInCart.quantité;
      if (objectInCart === null) {
        qtyInCart = 0;
      } else {
        qtyInCart = objectInCart.quantité;
      }

      console.log("qtyInCart  :" + qtyInCart)


      // Obliger le visiteur à choisir des quantiés et couleur valides
      if (
        isNaN(qty) ||
        qty <= 0 ||
        qty > 100 - qtyInCart

      ) {
        alert("Veuillez selectionner une quantité totale comprise entre 1 et 100");
        return;
      };

      if (
        selectedColor == null ||
        selectedColor == ""

      ) {
        alert("Veuillez selectionner une couleur");
        return;
      };

      ///////////////////////////////////////////////////////gestion du localstorage/////////////////////////////////////////////
      /**
       * Fonction qui retourne l'objet sélectionné trouvé dans le panier s'il existe, null sinon.
       * @param {*} id l'identifiant de l'objet à trouver dans le panier
       * @param {*} option l'option (couleur) de l'objet à trouver dans le panier
       * @returns L'objet présent dans le panier ou null
       */
      function findObjectInCart(id, option) {
        // Parcourir le panier => for
        for (let product of cart) {
          // À chaque objet :
          // Vérifier si l'objet correspond à la sélection
          // Si c'est le cas (if)
          if (product.id === id && product.option === option) {

            // product.quantité += qty;

            // J'ai trouvé l'objet, je le retourne
            return product;
          }
          // Sinon (else) je passe à l'objet suivant
        } // Fin de boucle
        // Ici, on sait que le produit n'est pas dans le panier
        return null;
      }

      // Si l'objet n'est pas déja dans le panier, on l'ajoute
      if (objectInCart === null) {
        cart.push(selection);

      } else {
        qtyInCart += selection.quantité;

      }

      for (let product of cart) {

        if (product.id === selection.id && product.option === selection.option) {
          // Je modifie la quantité dans la panier
          product.quantité += qty;
        }

      }
      // Dans tous les cas on remet le panier dans le storage
      localStorage.product = JSON.stringify(cart);

    })

  })

  .catch(function (err) {
    console.error("intervention de catch: il y a une erreur")

  })