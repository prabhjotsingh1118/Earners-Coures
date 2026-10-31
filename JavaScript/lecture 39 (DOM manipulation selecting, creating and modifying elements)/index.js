// let h1 = document.getElementById("anime") 

// let h1 = document.querySelector("h1") 
// let h1 = document.querySelector(".h1") 
// let h1 = document.querySelector("#h1") 

// let h1 = document.querySelectorAll("h1") 

// console.log(h1);

// let p = document.querySelector("p")

// p.textContent = "hello world"
// p.innerHTML = "<h2>hello anime world </h2>"  //very very risky
// p.innerText =  "naruto"
// console.log(p);


// console.log(p.textContent);
// console.log(p.innerHTML);
// console.log(p.innerText);


// p.setAttribute("style" , "background-color : pink; font-size : 80px")

// let btn = document.querySelector("#btn")
// btn.setAttribute("disabled" , "true")


// btn.textContent = "new text"


// let res = btn.getAttribute("disabled")
// console.log(res);  

// btn.removeAttribute("style")


//yeh class CSS se li hai  
// p.classList.add("random")
// p.classList.remove("random")
// p.classList.toggle("random")

// console.log(p.classList.contains('random'));    

// p.style.backgroundColor = "red"  //camel case

// p.dataset.hello = "anime"





// let products = [
//     {
//         name: "samsung",
//         price: "4444"
//     },

//     {
//         name: "apple",
//         price: "4444"
//     },

//     {
//         name: "huwai",
//         price: "4444"
//     },

//     {
//         name: "oppo",
//         price: "4444"
//     }

// ]

// let div = document.createElement("div")
// div.textContent = "hello"
// let body = document.querySelector("body")


// body.appendChild(div)  
// body.append(div)

// body.append(div) //starting mrin likh dega
// body.prepend(div) //last mein likh dega 





let products = [
    {
        name: "samsung",
        price: "4444"
    },

    {
        name: "apple",
        price: "4444"
    },

    {
        name: "huwai",
        price: "4444"
    },

    {
        name: "oppo",
        price: "4444"
    }

]



// let productList = document.querySelector("#product-list")

// products.forEach((product) => {
//     const card = document.createElement("p")
//     card.textContent = `${product.name} - ${product.price}`
//     productList.append(card)
// })



let productList = document.querySelector("#product-list")

// products.forEach((product) => {
//     const card = document.createElement("div")
//     card.classList.add("singleProduct")

//     const upperDiv = document.createElement("div")
//     const lowerDiv = document.createElement("div")


//     const img = document.createElement("img")

//     img.setAttribute("src", "attack on titan.jpg")

//     upperDiv.append(img)

//     card.textContent = `${product.name} - ${product.price}`
//     productList.append(card)
// })




products.forEach((product) => {

    const card = document.createElement("div")
    card.classList.add("singleProduct")

    card.innerHTML = `<div>
        <img src="attack on titan.jpg" alt="">
    </div>
    <div class="productDetail">
        <p>${product.name}</p>
        <p>${product.price}</p>
    </div>`

    productList.append(card)

})


