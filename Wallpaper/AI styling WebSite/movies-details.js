
const API_KEY = "aa1c232";

const params = new URLSearchParams(location.search);
const imdbID = params.get("id");
const movieDetail = document.querySelector("#movie-detail");
const detailStatus = document.querySelector("#detailStatus");

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("movieVerseFavorites")) || [];
    } catch {
        return [];
    }
}

function updateFavorite(movie) {
    let favorites = getFavorites();
    const exists = favorites.some(item => item.imdbID === movie.imdbID);

    favorites = exists
        ? favorites.filter(item => item.imdbID !== movie.imdbID)
        : [...favorites, movie];

    localStorage.setItem("movieVerseFavorites", JSON.stringify(favorites));
    return !exists;
}

async function searchMovie(id) {
    movieDetail.innerHTML = '<div class="loader"></div>';
    detailStatus.textContent = "Loading movie details...";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=full`
        );

        const data = await response.json();

        if (data.Response !== "True") {
            movieDetail.innerHTML = "";
            detailStatus.textContent = data.Error || "Movie details unavailable.";
            return;
        }

        document.title = `${data.Title} | MovieVerse`;
        document.querySelector("#detailHeading").textContent = data.Title;
        detailStatus.textContent = "";
        displayMovie(data);
    } catch (error) {
        movieDetail.innerHTML = "";
        detailStatus.textContent = "Details load nahi ho paayi. Internet check karo.";
        console.error(error);
    }
}

function displayMovie(data) {
    const poster = data.Poster && data.Poster !== "N/A"
        ? data.Poster
        : "";

    const movie = {
        imdbID: data.imdbID,
        Title: data.Title,
        Year: data.Year,
        Poster: data.Poster
    };

    const detailItems = [
        ["Released", data.Released],
        ["Rated", data.Rated],
        ["Runtime", data.Runtime],
        ["Genre", data.Genre],
        ["Director", data.Director],
        ["Writer", data.Writer],
        ["Actors", data.Actors],
        ["Language", data.Language],
        ["Country", data.Country],
        ["Awards", data.Awards],
        ["Box Office", data.BoxOffice]
    ];

    movieDetail.innerHTML = `
        <div class="detail-poster-wrap">
            <img id="detailPoster" class="detail-poster" alt="">
            <button id="detailFavorite" class="detail-favorite"></button>
        </div>
        <div class="detail-content">
            <div class="detail-badges">
                <span class="detail-badge" id="detailYear"></span>
                <span class="detail-badge" id="detailType"></span>
                <span class="detail-badge" id="detailRuntime"></span>
            </div>

            <div class="rating-box">
                <span class="rating-star">★</span>
                <div><strong id="detailRating"></strong><p>IMDb Rating</p></div>
            </div>

            <h2>Plot Overview</h2>
            <p id="detailPlot" class="detail-plot"></p>

            <h2>Movie Information</h2>
            <div id="detailMetadata" class="detail-metadata"></div>

            <a id="imdbLink" class="primary-btn" target="_blank"
               rel="noopener noreferrer">VIEW ON IMDb ↗</a>
        </div>
    `;

    const detailPoster = document.querySelector("#detailPoster");
    detailPoster.src = poster;
    detailPoster.alt = `${data.Title} poster`;
    detailPoster.onerror = () => {
        detailPoster.removeAttribute("src");
        detailPoster.style.background =
            "linear-gradient(135deg, #241637, #11111b)";
    };

    document.querySelector("#detailYear").textContent = data.Year || "Year N/A";
    document.querySelector("#detailType").textContent = data.Genre || "Genre N/A";
    document.querySelector("#detailRuntime").textContent = data.Runtime || "Runtime N/A";
    document.querySelector("#detailRating").textContent =
        data.imdbRating && data.imdbRating !== "N/A"
            ? `${data.imdbRating} / 10`
            : "Not rated";
    document.querySelector("#detailPlot").textContent =
        data.Plot && data.Plot !== "N/A"
            ? data.Plot
            : "Plot information is not available.";

    const metadata = document.querySelector("#detailMetadata");

    detailItems.forEach(([label, value]) => {
        if (!value || value === "N/A") return;

        const item = document.createElement("div");
        item.className = "metadata-item";

        const title = document.createElement("span");
        title.textContent = label;

        const content = document.createElement("p");
        content.textContent = value;

        item.append(title, content);
        metadata.append(item);
    });

    document.querySelector("#imdbLink").href =
        `https://www.imdb.com/title/${encodeURIComponent(data.imdbID)}/`;

    const favoriteButton = document.querySelector("#detailFavorite");

    function refreshFavoriteButton() {
        const exists = getFavorites().some(item => item.imdbID === movie.imdbID);
        favoriteButton.textContent = exists ? "♥ Saved to Favorites" : "♡ Add to Favorites";
        favoriteButton.classList.toggle("active", exists);
        favoriteButton.setAttribute("aria-pressed", String(exists));
    }

    favoriteButton.addEventListener("click", () => {
        const added = updateFavorite(movie);
        refreshFavoriteButton();

        favoriteButton.classList.remove("heart-pop");
        void favoriteButton.offsetWidth;
        favoriteButton.classList.add("heart-pop");

        detailStatus.textContent = added
            ? "Movie added to your favorites ♥"
            : "Movie removed from your favorites.";
    });

    refreshFavoriteButton();
}

if (imdbID) {
    searchMovie(imdbID.trim());
} else {
    detailStatus.textContent = "No movie ID found. Please select a movie from Home.";
}
