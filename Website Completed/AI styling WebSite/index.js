
const API_KEY = "aa1c232";

const searchForm = document.querySelector("#searchForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");
const statusMessage = document.querySelector("#statusMessage");

const menuToggle = document.querySelector("#menuToggle");
const sideMenu = document.querySelector("#sideMenu");
const menuBackdrop = document.querySelector("#menuBackdrop");
const favoritesToggle = document.querySelector("#favoritesToggle");
const menuFavorites = document.querySelector("#menuFavorites");
const favoriteCount = document.querySelector("#favoriteCount");
const showAll = document.querySelector("#showAll");

let currentMovies = [];
let favoritesOnly = false;
let requestNumber = 0;

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("movieVerseFavorites")) || [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem("movieVerseFavorites", JSON.stringify(favorites));
    updateFavoriteCount();
}

function updateFavoriteCount() {
    favoriteCount.textContent = getFavorites().length;
}

function isFavorite(id) {
    return getFavorites().some(movie => movie.imdbID === id);
}

function toggleFavorite(movie) {
    let favorites = getFavorites();
    const exists = favorites.some(item => item.imdbID === movie.imdbID);

    if (exists) {
        favorites = favorites.filter(item => item.imdbID !== movie.imdbID);
    } else {
        favorites.push(movie);
    }

    saveFavorites(favorites);
    return !exists;
}

function closeMenu() {
    sideMenu.classList.remove("open");
    menuBackdrop.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    sideMenu.setAttribute("aria-hidden", "true");
}

function toggleMenu() {
    const isOpen = sideMenu.classList.toggle("open");
    menuBackdrop.classList.toggle("show", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    sideMenu.setAttribute("aria-hidden", String(!isOpen));
}

menuToggle.addEventListener("click", toggleMenu);
menuBackdrop.addEventListener("click", closeMenu);

document.querySelector("#homeLink").addEventListener("click", event => {
    event.preventDefault();
    favoritesOnly = false;
    renderMovies(currentMovies);
    document.querySelector("#resultsTitle").textContent = "Explore Movies";
    closeMenu();
});

document.querySelector("#searchLink").addEventListener("click", closeMenu);

favoritesToggle.addEventListener("click", showFavorites);
menuFavorites.addEventListener("click", event => {
    event.preventDefault();
    showFavorites();
    closeMenu();
});

showAll.addEventListener("click", () => {
    favoritesOnly = false;
    document.querySelector("#resultsTitle").textContent = "Explore Movies";
    renderMovies(currentMovies);
});

function showFavorites() {
    favoritesOnly = true;
    document.querySelector("#resultsTitle").textContent = "My Favorites";
    document.querySelector("#resultsLabel").textContent = "YOUR PERSONAL COLLECTION";
    renderMovies(getFavorites());
    document.querySelector("#searchSection").scrollIntoView({ behavior: "smooth" });
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const query = movieInput.value.trim();
    if (!query) {
        statusMessage.textContent = "Please enter a movie title first.";
        movieInput.focus();
        return;
    }

    favoritesOnly = false;
    searchMovie(query);
});

async function searchMovie(movieName) {
    const thisRequest = ++requestNumber;
    movieHub.innerHTML = '<div class="loader"></div>';
    statusMessage.textContent = "Searching movies...";
    document.querySelector("#resultsTitle").textContent = "Search Results";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}`
        );
        const data = await response.json();

        if (thisRequest !== requestNumber) return;

        if (data.Response === "True") {
            currentMovies = data.Search;
            statusMessage.textContent = `${data.totalResults} matching results may be available.`;
            renderMovies(currentMovies);
        } else {
            currentMovies = [];
            movieHub.innerHTML = "";
            statusMessage.textContent = data.Error || "No movies found.";
        }
    } catch (error) {
        if (thisRequest !== requestNumber) return;
        movieHub.innerHTML = "";
        statusMessage.textContent =
            "Movies load nahi ho paayi. Internet connection check karke retry karo.";
        console.error(error);
    }
}

function renderMovies(movies) {
    movieHub.innerHTML = "";

    if (!movies.length) {
        statusMessage.textContent = favoritesOnly
            ? "Abhi favorites list empty hai. Kisi movie par heart click karo!"
            : "No movies to display. Search a movie title above.";
        return;
    }

    const validMovies = movies.filter(movie =>
        movie && movie.imdbID && movie.Title
    );

    validMovies.forEach((movie, index) => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.style.animationDelay = `${Math.min(index * 40, 400)}ms`;

        const poster = movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : "";

        card.innerHTML = `
            <div class="movie-poster-wrap">
                <img class="movie-poster" alt="" loading="lazy">
                <button class="favorite-btn ${isFavorite(movie.imdbID) ? "active" : ""}"
                    aria-label="${isFavorite(movie.imdbID) ? "Remove from" : "Add to"} favorites"
                    aria-pressed="${isFavorite(movie.imdbID)}"
                    title="Toggle favorite">♥</button>
            </div>
            <div class="movie-info">
                <h3></h3>
                <p class="movie-year"></p>
            </div>
        `;

        const img = card.querySelector(".movie-poster");
        img.src = poster;
        img.alt = poster ? `${movie.Title} poster` : "Poster unavailable";
        img.onerror = () => {
            img.removeAttribute("src");
            img.alt = "Poster unavailable";
            img.style.background =
                "linear-gradient(135deg, #241637, #11111b)";
        };

        card.querySelector("h3").textContent = movie.Title;
        card.querySelector(".movie-year").textContent = movie.Year || "Year unknown";

        const favoriteButton = card.querySelector(".favorite-btn");

        favoriteButton.addEventListener("click", event => {
            event.stopPropagation();

            const added = toggleFavorite(movie);
            favoriteButton.classList.toggle("active", added);
            favoriteButton.setAttribute("aria-pressed", String(added));
            favoriteButton.setAttribute(
                "aria-label",
                added ? "Remove from favorites" : "Add to favorites"
            );

            favoriteButton.classList.remove("heart-pop");
            void favoriteButton.offsetWidth;
            favoriteButton.classList.add("heart-pop");

            statusMessage.textContent = added
                ? `${movie.Title} added to favorites ♥`
                : `${movie.Title} removed from favorites.`;

            if (favoritesOnly && !added) {
                renderMovies(getFavorites());
            }
        });

        card.addEventListener("click", () => {
            location.href =
                `movies-details.html?id=${encodeURIComponent(movie.imdbID)}`;
        });

        movieHub.append(card);
    });

    if (!validMovies.length) {
        statusMessage.textContent = "No valid movie results found.";
    }
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
});

updateFavoriteCount();
searchMovie("Avengers");



//mouse following

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}
