
import Navbar from "./components/Navbar"; //yeh Navbar wali file se connect hai
import { Footer as FooterUpdate} from "./components/footer"; //yeh as ke baad name update kiya geya hai
const user = {
  name:"prabhjot",
  isActive:true,
}

const Products = {

}

console.log(2)


// function NavBar(){

//   return (
//     <ul>
//       <li>Home</li>
//       <li>Shop</li>
//       <li>About us</li>
//       <li>Login</li>
//     </ul>
//   )
// } 


//yeh NavBar upar wale component se connect hai
//yeh NavBar likhne ke doo tarike hai
function App() {
  console.log(3)
 return (
 <div>
  {/* <Navbar></Navbar>  */}
    <Navbar/>
    <div style={{backgroundColor : "black", color:"purple"}}>
      <article>
        <p>anime's world </p>
      </article>
    </div>
   <h1>anime</h1>
   <FooterUpdate/> 
 </div>
 )
}

export default App //default export ek file mein ek hi baar kiya jaa sakta hai




