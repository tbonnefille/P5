// Récupération de id dans l'URL via urlParams.get
let urlParams = new URLSearchParams(location.search);
let orderId = urlParams.get("id");

if(!orderId){
// Message d'avertissement
let noOrder = document.querySelector('p');
noOrder.innerHTML = "Vous devez passer une commande pour obtenir un numéro valide.";
noOrder.style.fontWeight = "bold";
noOrder.style.color = "red";
noOrder.style.fontSize = "larger";
}

else{
// Affichage de orderId
const orderNum = document.getElementById("orderId");
orderNum.innerHTML = orderId;
orderNum.style.color = "red";
// Effacement des données stockées dans le localStorage
localStorage.removeItem("product");
}