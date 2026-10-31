
// localStorage.setItem("num1", 1) //yeh store ho chahe yeh comment kar do ja cut kar do
// localStorage.setItem("num2", 2)
// localStorage.setItem("num3", 3)


// // yeh access karti hai ki storage mein kya diya hai / agar storage mein num likha hai thoo yeh only num ko hi access karga num ke alawa kuch bhi de doo yeh access nahi karga yeh null print kar dega (kuch hai hi nahi)
// let result = localStorage.getItem("num") //yeh code vs code mein run nahi hoga kiyuki yeh browser ka part hai thoo yeh browser mein run hoga
// console.log(result);


// // //kis index par kya likha hai (like kis line par kya likha hai)
// let result2 = localStorage.key("0")
// console.log(result2);


// // //yeh localStorage se kuch remove karne ke hai
// let result3 = localStorage.removeItem("num")
// console.log(result3);



// // clear button
// // document.querySelector("#clear-local-storage").addEventListener("click", () => {
// //     localStorage.clear()
// // })



// // button hai session storage ka
// document.querySelector("#add-session-item").addEventListener("click", () => {
//     sessionStorage.setItem("session", "item")
// })






// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//     let data = xhttp.responseText;
//     console.log(data);
// };
// xhttp.open("GET", "https://api.github.com/users/nishantsaini2331", true);
// xhttp.send();

// or

// fetch("https://api.github.com/users/nishantsaini12331")
//     .then(data => data.json())
//     .then(data => console.log(data))

// or

async function getUser(username = "nishantsaini2331") {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    return data;
}

getUser()


document.querySelector("#github-form").addEventListener("submit", async (e) => {
    e.preventDefault()

    let username = document.querySelector("#github-username").value

    const data = await getUser(username)

    document.querySelector("#show-profile").innerHTML = `
<img src=${data.avatar_url} width="100px" heigth="100px" alt="">
<h2>${data.name}</h2>
<i>username : ${data.login}</i>
<p>bio : ${data.bio}</p>
<p>followers : ${data.followers}</p>
<p>following : ${data.following}</p>
<p>Public repos : ${data.public_repos}</p>
`

})

