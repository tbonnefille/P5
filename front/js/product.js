





let urlParams = new URLSearchParams(location.search);


let urlid = urlParams.get('id');

console.log(urlid)

fetch('http://localhost:3000/api/products/' + urlid)


  .then(function (res) {
    if (res.ok) {
      console.log("test ok");

      return res.json();

    }


  }
  )


  .then(data => {
    console.table(data);

    document.title = data.name;

    const div = document.getElementsByClassName("item__img")[0];
    const img = document.createElement("img");

    /* img.setAttribute("src", "../images/logo.png");
     img.alt = "Photographie d'un canapé";*/
    img.src = data.imageUrl;
    img.alt = data.altTxt;

    div.appendChild(img);

    const h1 = document.getElementById("title")
    h1.innerHTML = data.name;

    const price = document.getElementById("price")
    price.innerHTML = data.price;

    const description = document.getElementById("description")
    description.innerHTML = data.description;


    for (let palette in data.colors) {
      console.log(data.colors[palette])


    }


    /*
    
  for (let palette in data.colors) {
    const select = document.getElementById('colors')
    const option = document.createElement("p")

    option.innerHTML = data.colors[palette];

    select.appendChild('option')

  }
              
  */


  });

/*
.catch(function(err) {
    console.log("intervention de catch")
    
  })

  */