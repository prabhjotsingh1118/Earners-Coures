// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router'

// function RecipeDetail() {

//   const { id } = useParams()




//   const [recipe, setRecipe] = useState({});

//   const [loading, setLoading] = useState(true)


//   const [errorMsg, setErrorMsg] = useState("")


//   async function fetchRecipe(params) {
//     try {
//       const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`)
//       console.log(data)
//       setRecipe(data)
//     }
//     catch (error) {
//       setErrorMsg("Cloud not load recipe details , Please try again , and this recipe is not available.")
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     fetchRecipe();
//   }, []);




//   if (loading) {
//     return <div className="flex justify-center items-center min-h-[60vh]">
//       <img
//         src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
//         alt="Loading..."
//         className="w-16 h-16"
//       />
//     </div>
//   }


// //yeh jo errorMsg yeh tab aayega jab koi recipe nahi hogi jese yeh link hai (http://localhost:5175/recipe/242 )
//   if (errorMsg) {
//     return (
//       <main className="max-w-6xl mx-auto px-4 py-8">
//         <Link
//           to="/"
//           className="text-accent hover:underline inline-flex items-center gap-1 mb-4"
//         >
//           <svg
//             className="w-4 h-4 stroke-current fill-none"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <line x1="19" y1="12" x2="5" y2="12" />
//             <polyline points="12 19 5 12 12 5" />
//           </svg>
//           Back to Home
//         </Link>
//         <p className="text-accent">{errorMsg || "Recipe not found."}</p>
//       </main>
//     );
//   }





//   return (
//     <main className="max-w-6xl mx-auto px-4 py-8">
//       <Link to={"/"} className="text-accent hover:underline inline-flex items-center gap-1 mb-6">
//         <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
//           <line x1="19" y1="12" x2="5" y2="12" />
//           <polyline points="12 19 5 12 12 5" />
//         </svg>
//         Back to Home
//       </Link>

//       <div className="flex flex-col md:flex-row gap-8 mb-8">
//         <img
//           src={recipe.image}
//           alt={recipe.name}
//           className="w-full md:w-1/2 h-80 object-cover rounded-md border border-border"
//         />
//         <div className="md:w-1/2 flex flex-col justify-center">
//           <h1 className="font-serif text-3xl font-bold text-text mb-2">{recipe.name}</h1>
//           <p className="text-muted mb-4">{recipe.cuisine} - {recipe.difficulty}</p>
//           <div className="flex items-center gap-1 mb-4 font-medium">
//             <svg className="w-4 h-4 fill-accent" viewBox="0 0 24 24">
//               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//             </svg>
//             <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
//           </div>
//           <div className="grid grid-cols-2 gap-2 text-sm border-t border-border pt-4 mb-4">
//             <p><strong>Prep time:</strong> {recipe.prepTimeMinutes} mins</p>
//             <p><strong>Cook time:</strong> {recipe.cookTimeMinutes} mins</p>
//             <p><strong>Servings:</strong> {recipe.servings}</p>
//             <p><strong>Calories:</strong> {recipe.caloriesPerServing} kcal</p>
//           </div>
//           <p className="text-sm text-muted mb-1">
//             <strong>Meal Type:</strong> {recipe?.mealType?.join(', ')}
//           </p>
//           <p className="text-sm text-muted">
//             <strong>Tags:</strong> {recipe?.tags?.join(', ')}
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
//         <div>
//           <h2 className="font-serif text-xl font-bold mb-4">Ingredients</h2>
//           <ul className="list-disc pl-5 space-y-1">
//             {recipe.ingredients?.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <h2 className="font-serif text-xl font-bold mb-4">Instructions</h2>
//           <ol className="list-decimal pl-5 space-y-2">
//             {recipe.instructions?.map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}

//             {/* yeh ? jo quetion mark lagaya hai isko khehte hai optional chaining , yeh nahi lagayoge tho yeh error dega , yeh lga ke yeh error nahi dega , yeh undifined de dega / aesa tab use karte hai jab jese aabhi data nahi aageya par baad mein data aa jayega , tab kuch karne ke need nahi hogi yeh , jab data aayega tab yeh khud hi data render kar dega */}

//           </ol>
//         </div>
//       </div>
//     </main>
//   )
// }



// export default RecipeDetail;

























//new code 

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

function RecipeDetail() {

  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Ingredients checklist
  const [preparedIngredients, setPreparedIngredients] = useState([]);

  // Instructions checklist
  const [completedSteps, setCompletedSteps] = useState([]);

  // Fetch Recipe
  async function fetchRecipe() {
    try {
      setLoading(true);
      setErrorMsg("");

      const { data } = await axios.get(
        `https://dummyjson.com/recipes/${id}`
      );

      setRecipe(data);

      // Reset checklist when recipe changes
      setPreparedIngredients([]);
      setCompletedSteps([]);

    } catch (error) {
      setErrorMsg(
        "Could not load recipe details. Please try again, or this recipe is not available."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  // Toggle Ingredient
  function toggleIngredient(index) {
    setPreparedIngredients(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  }

  // Toggle Instruction
  function toggleStep(index) {
    setCompletedSteps(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  }

  // Check All Ingredients
  function toggleAllIngredients() {
    if (preparedIngredients.length === recipe.ingredients?.length) {
      setPreparedIngredients([]);
    } else {
      setPreparedIngredients(
        recipe.ingredients?.map((_, index) => index) || []
      );
    }
  }

  // Progress Calculation
  const totalSteps = recipe.instructions?.length || 0;

  const progress = totalSteps
    ? Math.round((completedSteps.length / totalSteps) * 100)
    : 0;

  const totalTime =
    (recipe.prepTimeMinutes || 0) +
    (recipe.cookTimeMinutes || 0);

  const allIngredientsChecked =
    recipe.ingredients?.length > 0 &&
    preparedIngredients.length === recipe.ingredients.length;

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-[#030719]">
        <img
          src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
          alt="Loading..."
          className="w-16 h-16"
        />
      </div>
    );
  }

  // Error
  if (errorMsg) {
    return (
      <main className="min-h-screen bg-[#030719] px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:underline mb-6"
          >
            ← Back to Home
          </Link>

          <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold mb-3">
              Recipe Not Found
            </h2>
            <p className="text-slate-400">{errorMsg}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030719] text-slate-100 px-4 sm:px-6 py-8">

      <div className="max-w-[1250px] mx-auto">

        {/* Back Button */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-purple-400 hover:underline mb-6"
        >
          ← Back to Recipes
        </Link>


        {/* RECIPE OVERVIEW */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">

          {/* LEFT SIDE */}

          <div className="flex flex-col justify-center order-2 lg:order-1">

            <div className="flex items-center gap-2 mb-4 flex-wrap">

              <span className="text-xs font-bold uppercase tracking-[2px] text-purple-400">
                Recipe Details
              </span>

              <span className="bg-[#20143e] text-purple-300 px-3 py-1 rounded-full text-xs">
                {recipe.difficulty}
              </span>

            </div>


            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-4">
              {recipe.name}
            </h1>


            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-7">

              <span>{recipe.cuisine}</span>

              <span>•</span>

              <span>
                ⭐ {recipe.rating} ({recipe.reviewCount} reviews)
              </span>

            </div>


            {/* INFORMATION CARDS */}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">

              <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Prep Time
                </p>

                <p className="font-serif text-xl font-bold">
                  {recipe.prepTimeMinutes} <span className="text-xs font-normal">mins</span>
                </p>
              </div>


              <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Cook Time
                </p>

                <p className="font-serif text-xl font-bold">
                  {recipe.cookTimeMinutes} <span className="text-xs font-normal">mins</span>
                </p>
              </div>


              <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Total Time
                </p>

                <p className="font-serif text-xl font-bold">
                  {totalTime} <span className="text-xs font-normal">mins</span>
                </p>
              </div>


              <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Servings
                </p>

                <p className="font-serif text-xl font-bold">
                  {recipe.servings} <span className="text-xs font-normal">portions</span>
                </p>
              </div>


              <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-4 shadow-sm col-span-2">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">
                  Energy
                </p>

                <p className="font-serif text-xl font-bold">
                  {recipe.caloriesPerServing} <span className="text-xs font-normal">kcal / serving</span>
                </p>
              </div>

            </div>


            {/* TAGS */}

            <div className="flex flex-wrap items-center gap-2 mt-3">

              <span className="text-xs font-bold text-slate-400 uppercase mr-2">
                Tags:
              </span>

              {recipe.tags?.map((tag, index) => (

                <span
                  key={index}
                  className="border border-purple-500/40 rounded-full px-3 py-1 text-xs font-medium text-purple-400"
                >
                  #{tag}
                </span>

              ))}

            </div>

            {/* MEAL TYPE */}

            <p className="text-xs text-slate-400 mt-4">
              Meal Type: {recipe.mealType?.join(", ")}
            </p>

          </div>


          {/* RIGHT SIDE IMAGE */}

          <div className="order-1 lg:order-2">

            <div className="bg-[#101a30] rounded-2xl border border-[#26344d] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.35)]">

              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-[280px] sm:h-[380px] lg:h-[440px] object-cover"
              />

              <div className="flex justify-between items-center gap-2 px-4 py-3 text-[10px] text-slate-400 italic">

                <span>Artisanal food photograph - DummyJSON collection</span>

                <span className="text-purple-400 font-bold uppercase not-italic">
                  {recipe.cuisine}
                </span>

              </div>

            </div>

          </div>

        </section>



        {/* INGREDIENTS & INSTRUCTIONS */}

        <section className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-8">


          {/* INGREDIENTS */}

          <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.25)] h-fit">

            {/* HEADER */}

            <div className="flex justify-between items-center gap-2 mb-2">

              <div>
                <p className="text-[9px] font-bold tracking-[2px] text-slate-400 uppercase mb-1">
                  Mise en Place
                </p>

                <h2 className="font-serif text-2xl font-bold">
                  Ingredients
                </h2>
              </div>


              <button
                onClick={toggleAllIngredients}
                className="text-[10px] font-bold uppercase text-purple-400 hover:underline"
              >
                {allIngredientsChecked ? "Uncheck All" : "Check All"}
              </button>

            </div>


            <div className="border-b border-[#26344d] mb-4"></div>


            {/* INGREDIENT PROGRESS */}

            <div className="flex justify-between items-center mb-4 text-[11px]">

              <span className="text-slate-400">
                {preparedIngredients.length} of {recipe.ingredients?.length || 0} ingredients prepared
              </span>

              <span className="text-purple-400 font-semibold">
                {allIngredientsChecked ? "All Ready!" : "Gather Items"}
              </span>

            </div>


            {/* INGREDIENT LIST */}

            <div className="space-y-2">

              {recipe.ingredients?.map((item, index) => {

                const checked = preparedIngredients.includes(index);

                return (

                  <label
                    key={index}
                    className={`flex items-center gap-3 border rounded-xl px-3 py-3 cursor-pointer transition-all duration-200
                    ${checked
                        ? "bg-[#1b1740] border-purple-500/40"
                        : "bg-[#101a30] border-[#26344d] hover:border-purple-500"
                      }`}
                  >

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleIngredient(index)}
                      className="w-4 h-4 accent-purple-500 cursor-pointer"
                    />

                    <span
                      className={`text-xs sm:text-sm transition-all
                      ${checked
                          ? "line-through text-slate-500"
                          : "text-slate-200"
                        }`}
                    >
                      {item}
                    </span>

                  </label>

                );

              })}

            </div>

          </div>



          {/* INSTRUCTIONS */}

          <div className="bg-[#101a30] border border-[#26344d] rounded-xl p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.25)]">

            {/* HEADER */}

            <div className="flex justify-between items-center gap-3 mb-2 flex-wrap">

              <div>
                <p className="text-[9px] font-bold tracking-[2px] text-slate-400 uppercase mb-1">
                  Method & Technique
                </p>

                <h2 className="font-serif text-2xl font-bold">
                  Instructions
                </h2>
              </div>


              <span className="text-[10px] font-bold text-slate-400">
                PROGRESS: {completedSteps.length} OF {totalSteps} STEPS ({progress}%)
              </span>

            </div>


            <div className="border-b border-[#26344d] mb-5"></div>


            {/* PROGRESS BAR */}

            <div className="w-full h-1.5 bg-[#26344d] rounded-full mb-6 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>

            </div>


            {/* INSTRUCTION LIST */}

            <div className="space-y-3">

              {recipe.instructions?.map((step, index) => {

                const completed = completedSteps.includes(index);

                return (

                  <div
                    key={index}
                    className={`border rounded-xl p-3 sm:p-4 transition-all duration-200
                    ${completed
                        ? "bg-[#1b1740] border-purple-500/40"
                        : "bg-[#101a30] border-[#26344d]"
                      }`}
                  >

                    <div className="flex gap-3 items-start">

                      {/* STEP NUMBER */}

                      <span className="shrink-0 w-8 h-8 rounded-full border border-purple-500/40 text-purple-400 flex justify-center items-center text-xs font-bold">

                        {String(index + 1).padStart(2, "0")}

                      </span>


                      {/* STEP CONTENT */}

                      <div className="flex-1 min-w-0">

                        <p
                          className={`text-xs sm:text-sm leading-6 mb-3
                          ${completed
                              ? "text-slate-500 line-through"
                              : "text-slate-200"
                            }`}
                        >
                          {step}
                        </p>


                        <button
                          onClick={() => toggleStep(index)}
                          className={`border rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all
                          ${completed
                              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white border-purple-500"
                              : "bg-[#101a30] text-slate-400 border-[#26344d] hover:border-purple-500 hover:text-purple-400"
                            }`}
                        >

                          {completed ? "✓ Completed" : "✓ Mark as Done"}

                        </button>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>


            {/* ALL STEPS COMPLETED */}

            {progress === 100 && totalSteps > 0 && (

              <div className="mt-5 bg-[#1b1740] border border-purple-500/40 rounded-xl p-4 text-center">

                <p className="font-serif text-lg font-bold text-purple-400">
                  Recipe Completed!
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Great job! You have completed all cooking steps.
                </p>

              </div>

            )}

          </div>

        </section>

      </div>

    </main>
  );
}

export default RecipeDetail;
