
API = "http://www.omdbapi.com/?apikey=aa1c232&t=avenger"

// jayda function use kiye hai kiyuki code readival karne ke liye , code saaf karne ke liye , jese bahut sari sabzi hai thoo function knife hai thoo knife use tukdo mein kar do


const searchForm = document.querySelector("#searchForm")
const movieInput = document.querySelector("#movieInput")
const movieHub = document.querySelector("#movieHub")
const hamBurger = document.querySelector("#hamBurger")

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()

    if (!query) { //isse aagr kuch nahi hai tho kuch bhi print nahi hoga isse yeh jese 1000 limit hai tho waste nahi hoga 
        return
    }

    console.log(query);
    searchMovie(query)
})


async function searchMovie(movieName) {  //async isliye liye kiyuki searchh hokar aane mein time lagega

    movieHub.innerHTML = `<div class="loader"></div>` // yeh jese movies search ki and movies aa gayi , thoo inte samay mein jo time hoga usme yeh searching movies.... aajaye gaa and hat bhi jayega kiyu ki niche  movieHub.innerHTML = ""  yeh lga hai 

    let response = await fetch(`http://www.omdbapi.com/?apikey=aa1c232&s=${movieName}`) // (s) lagaya ki hai ki search karni hai movies ke bare mein
    let data = await response.json() // json promise return kar raha hai , aagr json nahi likhe ge tho yeh true false jesa dikha dega / raw data    
    console.log(data);

    if (data.Response === "True") {

        displayMovies(data.Search) //.Search API ke data mein movies ki list nikalta hai, aur displayMovies() us list ko webpage par dikhane ka kaam karta hai.

    } else {
        console.log(data.Error);
        movieHub.innerHTML = `<p>${data.Error}</P>`
    }

}


function displayMovies(movies) {

    movieHub.innerHTML = "" //Agar yeh line nahi likhoge Maan lo tumne pehle Avengers search kiya. Tumhare webpage par 10 movies aa gayi. Phir tumne Batman search kiya. Tumhare code mein movieHub.append(div) naye cards add karega, lekin Avengers ki purani movies bhi wahin rahengi. (in short Result: Avengers + Batman, dono ki movies ek saath dikhengi.)

    movies.forEach((movie) => {
        const div = document.createElement("div")

        div.dataset.imdbID = movie.imdbID //Isse har card par us movie ki IMDb ID store ho jaati hai.
        div.setAttribute("class", "movie-card")

        div.innerHTML = `
            <div>
                <img src=${movie.Poster} alt="">
            </div>

            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div> 
            `

        movieHub.append(div) //append() khud movie ki image ya details nahi banata. Woh pehle se banaye gaye div ko webpage mein insert karta hai. 

    })

}


movieHub.addEventListener("click", (e) => { //Iska matlab hai: jab bhi movieHub ke andar click hoga, yeh function run karega.
    e.stopPropagation();  // yeh aagar hum click karge thoo yeh click parent ke bahar naa jaye

    // e.target.closest yeh jese image and text ek div ke ander hai aur woo div hi parent hai thoo yeh image se lekar apne parent tak check karga id ke liye
    const movieCard = e.target.closest(".movie-card") //dot isliye kiyuki yeh class hai movie-card //jis element par tumne click kiya, jaise movie ki image ya title.
    const imdbID = movieCard.dataset.imdbID

    location.href = `movies-details.html?id=${imdbID}` //yaha file ka name likhna hai //href means hyper reference means kaha jana hai //yeh ek movie par click karne ke baad uski details wale page par chale jayege
})




//  yeh html mein bhi red dot se mark hai and yeh three dots wala part hai yeh 
// hamBurger.addEventListener("click" , (e) => {  
//     e.stopPropagation();

// })
