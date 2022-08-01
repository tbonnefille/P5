//renomage de la page
document.title = "Kanap |  Votre panier";

//tableau des sous totaux
let tableauDesSSTT = [];

//récupération des données "product"
let lsCart = localStorage.product;
if (lsCart == null) {
    // JSON.parse a besoin d'une string en paramètre
    lsCart = '[]';
}
let cart = JSON.parse(lsCart);
console.log(cart);
console.log("lenght of cart: " + cart.length);
// Signaler qu'il n'y a rien dans le panier 
if (cart.length == 0) {
    const empty_section = document.getElementById("cart__items");
    const empty_cart = document.createElement("h2")
    empty_cart.innerHTML = "Votre panier est vide";
    empty_section.appendChild(empty_cart)

} else {
    document.getElementById("cart__items").innerHTML = "";
}
// Pour chaque produit dans le panier
for (let i = 0; i < cart.length; i++) {
    let id = cart[i].id;
    let color = cart[i].option;
    let qty = cart[i].quantité;

    //récupérer les données complémentaires de "selection" via fetch
    fetch("http://localhost:3000/api/products/" + id)

        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        /* .catch(function (err) {
             console.error("intervention de catch: il y a une erreur")
     
         })*/
        // Traitement des données productdata pour créer les balises
        .then(productdata => {

            // Si le panier n'est pas vide : creation des cart articles
            const section = document.getElementById("cart__items");
            const article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute('data-id', id);
            article.setAttribute('data-color', color);
            section.appendChild(article);

            const div_img = document.createElement("div");
            div_img.classList.add("cart__item__img");
            article.appendChild(div_img);

            const img = document.createElement("img");
            img.src = productdata.imageUrl;
            img.alt = productdata.altTxt;
            div_img.appendChild(img);

            const div_content = document.createElement("div");
            div_content.classList.add("cart__item__content");
            article.appendChild(div_content);

            const div_description = document.createElement("div");
            div_description.classList.add("cart__item__content");
            div_content.appendChild(div_description);

            const h2 = document.createElement("h2");
            h2.innerHTML = productdata.name;
            div_description.appendChild(h2);

            const p_color = document.createElement("p");
            p_color.innerHTML = color;
            h2.appendChild(p_color);

            const p_price = document.createElement("p");
            p_price.innerHTML = productdata.price + "€";
            h2.appendChild(p_price);

            const div_settings = document.createElement("div");
            div_description.classList.add("cart__item__content__settings");
            div_content.appendChild(div_settings);

            const div_quantity = document.createElement("div");
            div_description.classList.add("cart__item__content__settings__quantity");
            div_settings.appendChild(div_quantity);

            const p_qty = document.createElement("p");
            p_qty.innerHTML = "Qté : " + qty;
            div_quantity.appendChild(p_qty)

            const inputQty = document.createElement('input');
            inputQty.setAttribute('type', 'number');
            inputQty.classList.add('itemQuantity');
            inputQty.name = "itemQuantity";
            inputQty.min = 1;
            inputQty.max = 100;
            inputQty.value = qty;
            div_quantity.appendChild(inputQty);

            let itemDelete = document.createElement('div');
            itemDelete.classList.add('cart__item__content__settings__delete');
            div_quantity.appendChild(itemDelete);

            let p_itemDelete = document.createElement('p');
            p_itemDelete.classList.add('deleteItem');
            p_itemDelete.innerHTML = 'Supprimer';
            itemDelete.appendChild(p_itemDelete);

            // Calcul du sous total ds articles
            let sousTotal = inputQty.value * productdata.price;
            tableauDesSSTT.push(sousTotal);
            console.log(tableauDesSSTT)

            // Gestion du changement de quantité dû à l'input(listen)
            inputQty.addEventListener("input", () => {
                newQty = parseInt(inputQty.value);
                if (newQty <= 0 || newQty > 100) {
                    alert("Veuillez sélectionner une quantité comprise entre 1 et 100");
                } else {
                    // Changer le panier
                    cart[i].quantité = newQty;
                    // Calculer et afficher le prix de la ligne d'article
                    sstt.innerHTML = "sous total : " + newQty * productdata.price + "€";
                    // Changer le sous-total dans le tableau des ss-totaux
                    tableauDesSSTT[i] = newQty * productdata.price;
                    // Mettre l'affichage de la quantité de l'article à jour
                    p_qty.innerHTML = "Qté : " + inputQty.value;
                    // Calculer et afficher le prix total
                    calcQty();
                    // Mettre à jour le localStorage
                    saveCartToLocalStorage();
                }
            });

            // Calcul du prix total via reducer(somme des sous totaux) et affichage
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const prixTotal = tableauDesSSTT.reduce(reducer, 0);
            console.log(prixTotal)
            let sumSSTT = document.getElementById('totalPrice');
            sumSSTT.innerHTML = prixTotal;
            //affichage du sous total par article
            const sstt = document.createElement("h3")
            sstt.innerHTML = "sous total : " + inputQty.value * productdata.price + "€";
            div_quantity.appendChild(sstt);

            // Suppression d'article
            let deleteItem = document.querySelectorAll(".deleteItem");
            console.log(deleteItem)

            p_itemDelete.addEventListener("click", function () {
                // On passe la quantité à 0 pour l'élémpent courant
                cart[i].quantité = 0;
                // On filtre le panier sur les éléments ayant au moins 1 en quantité
                cart = cart.filter(elt => elt.quantité > 0);
                // On sauvegarde le panier
                saveCartToLocalStorage();
                // On recharge la page
                location.reload();
            });
            // On recalcule les quantités
            calcQty();

        })

    //Calcul de la quantité globale et du prix total
    function calcQty() {
        let eltQuantity = document.getElementsByClassName('itemQuantity');
        let totalQuantitySelect = 0;

        for (let elt of eltQuantity) {
            totalQuantitySelect += parseInt(elt.value);
        }
        let totalQuantityItems = document.getElementById('totalQuantity');
        totalQuantityItems.innerHTML = totalQuantitySelect;

        // Calcul et affichage du prix total
        let totalPrice = tableauDesSSTT.reduce((acc, current) => acc + current, 0);
        document.getElementById("totalPrice").innerHTML = totalPrice;

    }

    // Modifier les quantités des articles
    function modifyQty(evt, canap, option) {
        const modifQty = evt.target;

        for (let m = 0; m < modifQty.length; m++) {
            modifQty[m].addEventListener('change', function (e) {
                e.preventDefault();

                cart[m].quantité = e.target.value;

                if (
                    cart[m].quantité == 0 ||
                    cart[m].quantité > 100
                ) {
                    alert("Veuillez sélectionner une quantité comprise entre 1 et 100");
                } else {
                    calcQty();
                    saveCartToLocalStorage();
                }

            });
        }
    }
    // Fonction de MAJ du ls
    function saveCartToLocalStorage() {
        localStorage.product = JSON.stringify(cart);

    }

}

//////////////////////////////Gestion du formulaire


