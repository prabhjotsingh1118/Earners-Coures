
// function GrandChild({username}) {
//   return (
//     <div style={{ backgroundColor: "palevioletred", padding: "20px" }}>
//       <h1>GrandChild - {username}</h1>
//     </div>
//   )
// }

// function Child({ username }) {
//   return (
//     <div style={{ backgroundColor: "purple", padding: "20px" }}>
//       <h1>child</h1>
//       <GrandChild username={username} />
//     </div>
//   )
// }

// function Parent({ username }) {
//   return (
//     <div style={{ backgroundColor: "violet", padding: "10px" }}>      <h1>Parent</h1>
//       <Child username={username} />
//     </div>
//   )
// }


// function App() {

//   let username = "anime "

//   return (
//     <div style={{ backgroundColor: "indigo", padding: "20px" }}>
//       <h1>App</h1>
//       <Parent username={username} />
//     </div>

//   )
// }

// export default App







import { useContext } from "react" // yeh useContext hook ko import kar raha hai jo ki React ka built-in hook hai aur hume context ke value ko access karne me help karta hai
import { UserContext } from "./main" //yeh UserContext ko import kar raha hai jo ki main.jsx me create kiya gaya tha aur hume context ke value ko access karne me help karta hai

function GrandChild() {
  const value = useContext(UserContext)
  return (
    <div style={{ backgroundColor: "palevioletred", padding: "20px" }}>
      <h1>GrandChild - {value}</h1>
    </div>
  )
}

function Child() {
  return (
    <div style={{ backgroundColor: "purple", padding: "20px" }}>
      <h1>child</h1>
      <GrandChild />
    </div>
  )
}

function Parent() {
  return (
    <div style={{ backgroundColor: "violet", padding: "10px" }}>      <h1>Parent</h1>
      <Child/>
    </div>
  )
}


function App() {


  return (
    <div style={{ backgroundColor: "indigo", padding: "20px" }}>
      <h1>App</h1>
      <Parent />
    </div>

  )
}

export default App
