//renomage de la page
document.title = "Kanap |  Votre panier";

//////////////////////////////////////////////////

let addSousTotal = [];



console.log(addSousTotal)




//récupération des données "product"
let productsinStorage = localStorage.product;
let panier = JSON.parse(productsinStorage);
console.log(panier);



// Pour chaque produit dans le panier
for (i = 0; i < panier.length; i++) {
    let id = panier[i].id;
    let color = panier[i].option;
    let qté = panier[i].quantité;


    //récupérer les données complémentaires de "selection" via fetch pour éviter de saturer localhost
    fetch("http://localhost:3000/api/products/" + id)

        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })


        //traitement des données productdata pour créer les balises



        .then(productdata => {

            //Affichage si panier vide
            if (panier === null || panier.length === 0) {

                const empty_section = document.getElementById("cart__items");
                const empty_cart = document.createElement("h2")
                empty_cart.innerHTML = "Le panier est vide";
                empty_section.appendChild(empty_cart)
            }
            else {
                //si le panier n'est pas vide creation des cart article

                const section = document.getElementById("cart__items");

                const article = document.createElement("article")
                article.classList.add("cart__item");


                article.setAttribute('data-id', id);
                article.setAttribute('data-color', color);


                section.appendChild(article)

                const div_img = document.createElement("div");
                div_img.classList.add("cart__item__img")
                article.appendChild(div_img)

                const img = document.createElement("img");
                img.src = productdata.imageUrl;
                img.alt = productdata.altTxt;
                div_img.appendChild(img)

                const div_content = document.createElement("div");
                div_content.classList.add("cart__item__content");
                article.appendChild(div_content)

                const div_description = document.createElement("div");
                div_description.classList.add("cart__item__content");
                div_content.appendChild(div_description)

                const h2 = document.createElement("h2");
                h2.innerHTML = productdata.name;
                div_description.appendChild(h2)

                const p_color = document.createElement("p")
                p_color.innerHTML = color;
                h2.appendChild(p_color)

                const p_price = document.createElement("p")
                p_price.innerHTML = productdata.price + "€";
                h2.appendChild(p_price)

                const div_settings = document.createElement("div");
                div_description.classList.add("cart__item__content__settings");
                div_content.appendChild(div_settings)

                const div_quantity = document.createElement("div");
                div_description.classList.add("cart__item__content__settings__quantity");
                div_settings.appendChild(div_quantity)

                const p_qté = document.createElement("p");
                p_qté.innerHTML = "Qté : " + qté;
                div_quantity.appendChild(p_qté)


                const inputQty = document.createElement('input');

                inputQty.setAttribute('type', 'number');
                inputQty.classList.add('itemQuantity');
                inputQty.name = "itemQuantity";
                inputQty.min = 1;
                inputQty.max = 100;

                inputQty.value = qté;
                div_quantity.appendChild(inputQty);

                //affichage du sous total
                const sstt = document.createElement("h3")
                sstt.innerHTML = "sous total : " + qté * productdata.price + "€";
                div_quantity.appendChild(sstt)


                let itemDelete = document.createElement('div');
                itemDelete.classList.add('cart__item__content__settings__delete');
                div_quantity.appendChild(itemDelete);


                let p_itemDelete = document.createElement('p');
                p_itemDelete.classList.add('deleteItem');
                p_itemDelete.innerHTML = 'Supprimer';
                itemDelete.appendChild(p_itemDelete);




            }



            //Calcul de la quantité
            let eltQuantity = document.getElementsByClassName('itemQuantity');

            let totalQuantitySelect = 0;

            for (let i = 0; i < eltQuantity.length; i++) {
                totalQuantitySelect += parseInt(eltQuantity[i].value);
            }
            let totalQuantityItems = document.getElementById('totalQuantity');
            totalQuantityItems.innerHTML = totalQuantitySelect;


            //somme des sous totaux
            let sousTotal = qté * productdata.price;
            addSousTotal.push(sousTotal);

            console.log(addSousTotal)

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const prixTotal = addSousTotal.reduce(reducer, 0);
            console.log(prixTotal)

            let sumSSTT = document.getElementById('totalPrice');
            sumSSTT.innerHTML = prixTotal;




            /*
                        //calcul du Prix total
                        let totalPrice = 0;
                        for (let i = 0; i < eltQuantity.length; i++) {
                            totalPrice += parseInt(eltQuantity[i].value) * parseInt(panier[i].px);
                            // totalPrice += parseInt(eltQuantity[i].value) * productdata[i].price;
            
                        }
                        let productTotalPrice = document.getElementById('totalPrice');
                        productTotalPrice.innerHTML = totalPrice;
            
            */



            //ajouer et modifier quantités

            const modifQuantity = document.querySelectorAll('.itemQuantity');

            for (let i = 0; i < modifQuantity.length; i++) {
                modifQuantity[i].addEventListener('change', function (event) {
                    event.preventDefault();

                    panier[i].quantité = event.target.value;

                    if (
                        panier[i].quantité == 0 ||
                        panier[i].quantité > 100
                    ) {
                        alert("Veuillez sélectionner une quantité comprise entre 1 et 100");
                    }
                    else {
                        localStorage.product = JSON.stringify(panier);
                    }
                });
            }



            //delete item

            const delItem = document.querySelectorAll('.deleteItem');

            for (let d = 0; d < delItem.length; d++) {
                delItem[d].addEventListener('click', (e) => {
                    e.preventDefault();

                    let idDelItem = panier[d].id;
                    let colorDelItem = panier[d].option;

                    panier = panier.filter(
                        (element) =>
                            element.id !== idDelItem || element.option !== colorDelItem
                    );
                    localStorage.setItem('product', JSON.stringify(panier));
                    location.reload();

                });
            }






      })

 
            
    
            .catch(function (err) {
                console.error("intervention de catch: il y a une erreur")
    
            })



}





