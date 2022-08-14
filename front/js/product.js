// Récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let urlId = urlParams.get('id');

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

      // Obliger le visiteur à choisir des quantité et couleurs valides
      if (
       // qty == 0 ||
        //qty > 100 ||
        qty == NaN ||
       // qty == null ||
       // sstt.innerHTML == 0 ||
        selectedColor == null ||
        selectedColor == ''
      ) {
        alert("Veuillez selectionner une couleur et une quantité comprise entre 1 et 100");
        return;
      };

      // Canapé choisi
      let selection = {
        id: data._id,
        option: selectedColor,
        quantité: qty

      }

      ///////////////////////////////////////////////////////gestion du localstorage/////////////////////////////////////////////

      let lsCart = localStorage.getItem("product");
      // S"assurer que lsCart exist bien (sous forme de string)
      if (!lsCart) {
        lsCart = '[]';
      }
      let cart = JSON.parse(lsCart);
      console.log(cart)
      // Créer un drapeau "trouvé" à false
      let foundFlag = false;
      // Parcourir le panier => for
      for (let product of cart) {
        // À chaque objet :
        // Vérifier si l'objet correspond à la sélection
        // Si c'est le cas (if)
        if (product.id === selection.id && product.option === selection.option) {
          // Je lève le drapeau (trouvé = true)
          foundFlag = true;
          // Je modifie la quantité dans la panier
          product.quantité += qty;
        }
        // Sinon (else) je passe à l'objet suivant
      }
      // Après la boucle je regarde le drapeau
      // Si le drapeau n'est pas levé (false) c'est que je n'ai pas l'objet dans le panier
      if (foundFlag == false) {
        // => je l'ajoute
        cart.push(selection);
      }
      // Dans tous les cas on remet le panier dans le storage
      localStorage.product = JSON.stringify(cart);

    })

  })

  .catch(function (err) {
    console.error("intervention de catch: il y a une erreur")

  })

