

fetch('http://localhost:3000/api/products')



.then(function(res){
    if (res.ok) {
        console.log("test ok");
        console.log(res);
        
      return res.json();
      
    }
  
  else{

    console.log('test fail')
  }})
  .catch(function(err) {
    console.log("intervention de catch")
  })



.then(data => {
/* console.table(data);*/


  for ( let catalogue of data) {
  

    let elt = document.getElementById("items"); 
  const a = document.createElement("a")
  const article = document.createElement("article");
    
  a.setAttribute('href', "./product.html?id=42");

  
  items.appendChild(a);
  a.appendChild(article);

  const img = document.createElement("img");
  img.src = catalogue.imageUrl;
  img.alt = catalogue.altTxt;
  article.appendChild(img);
    
  const h3 = document.createElement("h3");
  h3.classList.add(".productName");
  h3.innerHTML = catalogue.name;
  article.appendChild(h3);
    
  const p = document.createElement("p");
  p.classList.add(".productDescription");
  p.innerHTML = catalogue.description;
  article.appendChild(p);

  }
    

  }
  )
  
   









  
  







  