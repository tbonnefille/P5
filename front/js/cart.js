
//testes de récupération des données et localstorage
console.log(localStorage.product);


//récupération des données "product"
let objLinea = localStorage.product;
let panier = JSON.parse(objLinea);

console.log(panier);
console.log("id du 2e article  " + panier[1].id);


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

            //console.table(productdata);
            for (let produit in panier) {
                const section = document.getElementById("cart__items");

                const article = document.createElement("article")

                article.classList.add("cart__item");
                article.dataset.id = "{id}";
                article.dataset.color = "{color}";
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

                const p_qté = document.createElement("p")
                p_qté.innerHTML = "Qté : " + qté;
                div_quantity.appendChild(p_qté)

            }

        })


        .catch(function (err) {
            console.error("intervention de catch: il y a une erreur")
        
          })

}      
