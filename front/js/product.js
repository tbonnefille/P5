//récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let URLid = urlParams.get('id');

fetch('http://localhost:3000/api/products/' + URLid)

  .then(function (res) {
    if (res.ok) {
      return res.json();

    }

  })

  .then(data => {
    //renomage de la page en fonction du produit
    document.title = data.name;
    //création du contenu de l'article descriptif du produit
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

    //renseignement des options de couleur
    for (let color of data.colors) {
      const select = document.getElementById('colors');
      const option = document.createElement("option");
      option.innerHTML = color;
      option.value = color;
      select.appendChild(option);

    }

    //oninput pour calcul du sous otal en temps réel
    let inputQty = document.querySelector("input");
    inputQty.oninput = function () {
      sstt.innerHTML = "sous total : " + inputQty.value * data.price + "€";
    };

    //sous total
    const div_icsq = document.getElementsByClassName("item__content__settings__quantity")[0];
    const sstt = document.createElement("h2")
    sstt.innerHTML = " Sous total : " + data.price * document.getElementById("quantity").value + "€";
    div_icsq.appendChild(sstt);

    //////////////////////////////////////////////addToCart///////////////////////////////////////////////////////////////


    const addToCart_btn = document.getElementById("addToCart");

    //listen
    addToCart_btn.addEventListener('click', (e) => {
      (e).preventDefault();

      //récupérer les données de couleur et qte
      let selectedColor = document.getElementById("colors").value;
      //let qte = document.getElementById("quantity").value; ATTENTION LE PIEGE!
      let qte = parseInt(document.getElementById("quantity").value);

      //obliger le visiteur à choisir des quantité et couleurs valides
      if (
        qte == 0 ||
        qte > 100 ||
        selectedColor == null ||
        selectedColor == ''
      )
       {
        alert("Veuillez selectionner une couleur et une quantité comprise entre 1 et 100");
        return;
      };

      //canapé choisi
      let selection = {
        id: data._id,
        option: selectedColor,
        quantité: qte

      }
      console.log(selection)

      ///////////////////////////////////////////////////////gestion du localstorage/////////////////////////////////////////////

      
      let lsCart = localStorage.getItem("product");

      if (!lsCart) {
        lsCart = '[]';
      }
      let panier = JSON.parse(lsCart);
      console.log(panier)
      // Créer un drapeau "trouvé" à false
      let foundFlag = false
      // Parcourir le panier => for
      for (let product of panier) {
        // À chaque objet :
        // Vérifier si l'objet correspond à la sélection
        // Si c'est le cas (if)
        if (product.id === selection.id && product.option === selection.option) {
          //    je lève le drapeau (trouvé = true)
          foundFlag = true
          //    Je modifie la quantité dans la panier
          product.quantité += qte
        }
        // Sinon (else) je passe à l'objet suivant
      }
      // Après la boucle je regarde le drapeau
      // Si le drapeau n'est pas levé (false) c'est que je n'ai pas l'objet dans le panier
      if (foundFlag == false) {
        // => je l'ajoute
        panier.push(selection);
      }
      // Dans tous les cas on remet le panier dans le storage
      localStorage.product = JSON.stringify(panier);
      



    })
    /*
      })
      .catch(function (err) {
        console.error("intervention de catch: il y a une erreur")
    */
  })

