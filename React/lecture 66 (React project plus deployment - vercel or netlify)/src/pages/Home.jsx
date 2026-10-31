import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';



function Home() {

  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("")

  async function fetchRecipes(skipCount, query) {
    setLoading(skipCount === 0);

    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`
      }

      const { data } = await axios.get(url)
          
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],4
      );
      setTotal(data.total)
    }
    catch (error) {
      // setErroMsg("please try again later")
    }
    setLoading(false);

  }

  useEffect(() => {
    fetchRecipes(0);
  }, []);




  function handleSearch(e) {
    // console.log(e.target)
    e.preventDefault();

    const form = new FormData(e.target)
    let query = form.get("query").trim();

    setSearchQuery(query);


    fetchRecipes(0, query);

  }




return (
    <main className="max-w-6xl mx-auto px-4 py-8">

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

      {/* 1. Loading state true hone par sirf loading dikhegi */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold animate-pulse">
            Loading Recipes...
          </p>
        </div>
      ) : (
        <>
          {/* 2. Jab loading band ho jaye aur koi recipe na mile tabhi yeh show hoga */}
          {recipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl font-semibold animate-pulse">
                {`No recipe found '${searchQuery}'`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Load More Button */}
      {!loading && recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchRecipes(recipes.length, searchQuery)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );





}

export default Home;