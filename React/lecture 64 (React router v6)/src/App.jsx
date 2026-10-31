import { useState } from 'react'
import { Routes, Route, Outlet, Link, useParams } from "react-router" // <-- Yahan 'Link' bhi likhna zaroori hai
import './App.css';
import NotFoundPage from './components/NotFoundPage'
import Login from './components/Login'
import Dashboard from './components/Dashboard' // <-- Yeh line add karein


const product = [
  {
    id: 1,
    anime: "dragon ball",
  },

  {
    id: 2,
    anime: "goku",
  }

]


function Home() {
  return <h1>Home</h1>
}

function ProductPage() {
  const { id } = useParams();

  const data = product.find((p => p.id === Number(id)))

  console.log(data)

  return (
    <div>
      <h1>Product Page</h1>
      <p>{data.anime}</p>
    </div>
  )
}


function AboutUs() {
  return <h1>About Us</h1>
}



//jo bhi Route mein hoga woo outlet mein dikh jayega
function NavBar() {
  return (
    <>
      <ul>
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={"/product-page"}>Product Page</Link>
        <br />
        <Link to={"/login"}>Login</Link>
        <br />
        <Link to={"/about-us"}>About us</Link>
        <br />
        <Link to="/dashboard">Dashboard</Link>
      </ul>
      <Outlet />
    </>
  )


  // { page == "home" && <Home /> }
  // { page == "productPage" && <ProductPage /> }
  // { page == "aboutus" && <AboutPage /> }

}



// iske * yeh lagaya yeh means jab koi page found naa ho tho yeh dikha dena Page Not Found
function App() {
  const [page, setPage] = useState("Home")

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-page/:id/:anime" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/contact-us" element={<h1>Contact us page</h1>} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes >
  )
}

export default App