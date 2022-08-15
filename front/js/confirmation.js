// Récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let orderId = urlParams.get("id");

// Affichage de orderId
const confirmation = document.getElementById("orderId");
confirmation.innerHTML = orderId;
confirmation.style.color = "red";

// Effacement des données stockées dans le localStorage
localStorage.removeItem("product");
