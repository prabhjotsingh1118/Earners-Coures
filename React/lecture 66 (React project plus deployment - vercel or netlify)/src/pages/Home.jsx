// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import RecipeCard from '../components/RecipeCard';



// function Home() {

//   const [recipes, setRecipes] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [loading, setLoading] = useState(true);

//   const [searchQuery, setSearchQuery] = useState("")

//   async function fetchRecipes(skipCount, query) {
//     setLoading(skipCount === 0);

//     try {
//       let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`
//       if (query) {
//         url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`
//       }

//       const { data } = await axios.get(url)

//       setRecipes((prev) =>
//         skipCount === 0 ? data.recipes : [...prev, ...data.recipes],4
//       );
//       setTotal(data.total)
//     }
//     catch (error) {
//       // setErroMsg("please try again later")
//     }
//     setLoading(false);

//   }

//   useEffect(() => {
//     fetchRecipes(0);
//   }, []);




//   function handleSearch(e) {
//     // console.log(e.target)
//     e.preventDefault();

//     const form = new FormData(e.target)
//     let query = form.get("query").trim();

//     setSearchQuery(query);


//     fetchRecipes(0, query);

//   }




// return (
//     <main className="max-w-6xl mx-auto px-4 py-8">

//       <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
//         <input
//           type="text"
//           name="query"
//           placeholder="Search recipes..."
//           className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
//         />
//         <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
//           Search
//         </button>
//       </form>

//       {/* 1. Loading state true hone par sirf loading dikhegi */}
//       {loading ? (
//         <div className="text-center py-20">
//           <p className="text-xl font-semibold animate-pulse">
//             Loading Recipes...
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* 2. Jab loading band ho jaye aur koi recipe na mile tabhi yeh show hoga */}
//           {recipes.length === 0 ? (
//             <div className="text-center py-10">
//               <p className="text-xl font-semibold animate-pulse">
//                 {`No recipe found '${searchQuery}'`}
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recipes.map((recipe) => (
//                 <RecipeCard key={recipe.id} recipe={recipe} />
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* Load More Button */}
//       {!loading && recipes.length < total && (
//         <div className="text-center mt-8">
//           <button
//             type="button"
//             onClick={() => fetchRecipes(recipes.length, searchQuery)}
//             className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </main>
//   );





// }

// export default Home;


















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Favorites state synced with localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorite_recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const categories = ["All", "Italian", "Asian", "American", "Mexican", "Pakistani", "Indian"];

  useEffect(() => {
    localStorage.setItem('favorite_recipes', JSON.stringify(favorites));
  }, [favorites]);

  async function fetchRecipes(skipCount, query = "", category = activeCategory) {
    if (skipCount === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;

      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${encodeURIComponent(query)}`;
      } else if (category !== "All") {
        url = `https://dummyjson.com/recipes/tag/${encodeURIComponent(category)}?limit=6&skip=${skipCount}`;
      }

      const { data } = await axios.get(url);

      setRecipes((prev) =>
        skipCount === 0
          ? data.recipes
          : [...prev, ...data.recipes]
      );

      setTotal(data.total);

    } catch (error) {
      console.log("Error fetching recipes:", error);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const query = form.get("query").trim();

    setActiveCategory("All");
    setShowFavoritesOnly(false);
    setSearchQuery(query);
    fetchRecipes(0, query, "All");
  }

  function handleCategorySelect(cat) {
    setActiveCategory(cat);
    setShowFavoritesOnly(false);
    setSearchQuery("");
    fetchRecipes(0, "", cat);
  }

  function toggleFavorite(recipe) {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === recipe.id);
      if (exists) {
        return prev.filter((item) => item.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  }

  const displayedRecipes = showFavoritesOnly ? favorites : recipes;

  return (
    <div className="min-h-screen bg-[#030719] text-white font-sans relative overflow-hidden animate-fadeIn">

      {/* Background Decorative Glowing Orbs with Smooth Floating Feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Dark Glassmorphism Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#101a30]/90 backdrop-blur-md border-b border-[#26344d]/80 px-6 py-4 transition-all shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setShowFavoritesOnly(false); fetchRecipes(0); }}>
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🍳</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              RecipeFinder
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:translate-y-0.5 active:scale-95 ${showFavoritesOnly
                  ? 'bg-gradient-to-r from-pink-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-[#17243b] text-slate-300 hover:bg-[#26344d] hover:text-white border border-[#26344d]'
                }`}
            >
              <span className="hover:scale-125 transition-transform">❤️</span>
              <span>Favorites</span>
              <span className="bg-[#030719] text-purple-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {favorites.length}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="px-4 py-10 relative z-10">

        {/* Dynamic Heading Banner */}
        <div className="text-center mb-10 transition-all duration-300">
          <p className="text-purple-400 font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3">
            {showFavoritesOnly ? "Your Personal Collection" : "Discover Delicious Food"}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            {showFavoritesOnly ? "Your Saved " : "Explore Our "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              {showFavoritesOnly ? "Favorites" : "Recipes"}
            </span>
          </h1>

          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            {showFavoritesOnly
              ? "All your bookmarked recipes in one place for quick cooking access."
              : "Discover amazing recipes and find your next favourite dish."}
          </p>
        </div>

        {/* Search & Categories */}
        {!showFavoritesOnly && (
          <>
            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto flex gap-3 mb-8"
            >
              <input
                type="text"
                name="query"
                placeholder="Search recipes (e.g. Pizza, Pasta)..."
                className="w-full min-w-0 bg-[#101a30] border border-[#26344d] rounded-xl px-5 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base shadow-inner"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:translate-y-1 active:scale-95 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-150"
              >
                Search
              </button>
            </form>

            {/* Quick Category Filters */}
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 active:translate-y-1 active:scale-95 ${activeCategory === cat && !searchQuery
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 scale-105'
                      : 'bg-[#101a30] text-slate-400 hover:text-white hover:bg-[#17243b] border border-[#26344d] hover:scale-102'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Recipe Grid Container */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-400 mt-5 text-sm animate-pulse">Loading Recipes...</p>
            </div>
          ) : (
            <>
              {displayedRecipes.length === 0 ? (
                <div className="text-center py-20 bg-[#101a30]/70 rounded-3xl border border-[#26344d] max-w-xl mx-auto backdrop-blur-sm transition-all">
                  <div className="text-6xl mb-4 animate-bounce">🍽️</div>
                  <h2 className="text-2xl font-bold mb-2">
                    {showFavoritesOnly ? "No Favorites Saved Yet" : "No Recipes Found"}
                  </h2>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto">
                    {showFavoritesOnly
                      ? "Click the heart icon on any recipe card to save it here for later."
                      : searchQuery
                        ? `No matching recipes found for "${searchQuery}". Try another search.`
                        : "No recipes found in this category."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {displayedRecipes.map((recipe) => (
                    <div key={recipe.id} className="relative group transition-all duration-300 hover:-translate-y-1.5">
                      {/* Heart Toggle Button Overlaid on Card */}
                      <button
                        onClick={() => toggleFavorite(recipe)}
                        className="absolute top-3 right-3 z-10 bg-[#101a30]/90 backdrop-blur-md border border-[#26344d]/80 p-2.5 rounded-full text-lg shadow-md transition-all duration-200 active:scale-75 hover:bg-[#17243b] hover:scale-110"
                        title={favorites.some((fav) => fav.id === recipe.id) ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        {favorites.some((fav) => fav.id === recipe.id) ? '❤️' : '🤍'}
                      </button>

                      <RecipeCard recipe={recipe} />
                    </div>
                  ))}
                </div>
              )}

              {/* Load More Pagination */}
              {!showFavoritesOnly && !loading && recipes.length < total && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => fetchRecipes(recipes.length, searchQuery, activeCategory)}
                    disabled={loadingMore}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:translate-y-1 active:scale-95 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-150 hover:shadow-purple-500/40"
                  >
                    {loadingMore ? "Loading..." : "Load More Recipes ↓"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;  