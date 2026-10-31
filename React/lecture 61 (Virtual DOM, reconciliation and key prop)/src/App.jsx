import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1>
      Anime
    </h1>
  )
}



// console.log(<h1 id='1'>
//   <p>Anime</p> <p>world</p>
// </h1>) //yeh iske h1 ke 3 children hoge kiyu ki two p tags and space bhi array mein space bhi count hoti hai

console.log( 
  <h1 id='1'>
    <p className='red'>Anime</p>
    <p>World</p>
  </h1>,
)

export default App
  