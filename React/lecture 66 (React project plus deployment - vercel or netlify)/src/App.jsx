import { Route, Routes } from 'react-router'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RecipeDetail from './pages/RecipeDetail';


//isme yeh :id likha hai kiyuki agar akeli id likhte tho yeh ek fix id ho jati (means id ka hi id hai example:- id hai anime) / tho jab hum id ke saath : yeh coln lga dete hai yeh tho id kuch bhi ho sakti hai
function App() {
  return (


    <div className="min-h-screen bg-background text-text font-sans">
 
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes >

    </div>



  )
}

export default App;