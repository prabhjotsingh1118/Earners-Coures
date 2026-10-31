
// Iska kaam URL ke andar se data nikaalna aur URL ka data manage karna hai.
// Is ID se tum API ko request bhejkar movie ki full details la sakte ho.
const params = new URLSearchParams(location.search) //yeh upar wala URL mein se params se nikaalna hai
const imdbID = params.get("id") //params means piche wali extra chij // .get yeh id nikaal kar dega

const movieDetail = document.querySelector("#movie-detail")

if (imdbID) { // koi bhi bina is id ke is page par nahi aa sakta , isse request waste nahi hogi
    searchMovie(imdbID.trim()) //yeh call kiya hai searchMovies ko
}



async function searchMovie(imdbID) {  //async isliye liye kiyuki searchh hokar aane mein time lagega

    let response = await fetch(`http://www.omdbapi.com/?apikey=aa1c232&i=${imdbID}&plot=full`) // (s) lagaya ki hai ki search karni hai movies ke bare mein // &plot=full yeh full plot dega (movies e=ke bare mein puri details dega)
    let data = await response.json() // json promise return kar raha hai , aagr json nahi likhe ge tho yeh true false jesa dikha dega / raw data    
    console.log(data);

    if (data.Response === "True") {

        displayMovie(data) //.Search API ke data mein movies ki list nikalta hai, aur displayMovies() us list ko webpage par dikhane ka kaam karta hai.

    } else {
        console.log(data.Error);
    }

}



function displayMovie(data) {
    movieDetail.innerHTML = ` <div>
            <img src=${data.Poster} alt="">
        </div>

        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>IMDB: ${data.imdbRating} / 10</p>
            </section>

            <div>
                <p>Plot Overview</p>
                <p>${data.Plot}</p>
            </div>

            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>

            <div>
                <p>Actors</p>
                <p>${data.Actors}</p>
            </div>

            <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>

            <button>
                <a href=http://www.imdb.com/title/${data.imdbID}>View on IMDB</a>
            </button>

        </div>`
}
