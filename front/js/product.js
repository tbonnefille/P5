
//récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let URLid = urlParams.get('id');
//console.log(URLid)



fetch('http://localhost:3000/api/products/' + URLid)

  .then(function (res) {
    if (res.ok) {
      //console.log(res);
      return res.json();

    }

  })

  .then(data => {
    //console.table(data);
    //renomage de la page en fonction du produit
    document.title = data.name;

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
    /*
        for (let palette in data.colors) {
          console.log(data.colors[palette])
    
        }
    */
    for (let color of data.colors) {
      const select = document.getElementById('colors');
      const option = document.createElement("option");
      option.innerHTML = color;
      option.value = color;
      select.appendChild(option);

    }

    //bouton "addToCart"

    const addToCart_btn = document.getElementById("addToCart");

    //listen
    addToCart_btn.addEventListener('click', (e) => {
      (e).preventDefault();

      //récupérer les données de couleur et qte

      let selectedColor = document.getElementById("colors").value;
      let qte = document.getElementById("quantity").value;

      //canapé choisi
      let selection = {
        id: data._id,
        option: selectedColor,
        quantité: qte,

      }
      console.log(selection)

      //gestion du localstorage


      //déclarer la variable "panier" où on stocke les keys("product") et values("selection") qui sont dans localstorage

      let panier = JSON.parse(localStorage.getItem("product"));

      //s'il y a déjà des "product": écrase par nouvelles valeures
      if (panier) {
        panier.push(selection);
        localStorage.product = JSON.stringify(panier);

      }

      //s'il n'y a pas de product; créer l'array "panier"
      else {
        panier = [];
        panier.push(selection);
        localStorage.product = JSON.stringify(panier);

      }

    })

  })

  .catch(function (err) {
    console.error("intervention de catch: il y a une erreur")

  })
