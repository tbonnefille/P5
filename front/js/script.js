

fetch('http://localhost:3000/api/products')



  .then(function (res) {
    if (res.ok) {
      console.log("test ok");
      console.log(res);

      return res.json();

    }

    else {

      console.log('test fail')
    }
  })



  .then(data => {
    console.table(data);


    for (let kanap of data) {


      const section = document.getElementById("items");
      const a = document.createElement("a")
      const article = document.createElement("article");

      a.setAttribute('href', "./product.html?id="+kanap._id);


      section.appendChild(a);
      a.appendChild(article);

      const img = document.createElement("img");
      img.src = kanap.imageUrl;
      img.alt = kanap.altTxt;
      article.appendChild(img);

      const h3 = document.createElement("h3");
      h3.classList.add("productName");
      h3.innerHTML = kanap.name;
      article.appendChild(h3);

      const p = document.createElement("p");
      p.classList.add("productDescription");
      p.innerHTML = kanap.description;
      article.appendChild(p);

    }


  }
  )

  .catch(function(err) {
    console.log("intervention de catch")
    
  })


















