// import { StrictMode } from 'react'
console.log(1)
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

//strict mode means doo baar check hoti hai chije
// createRoot(document.getElementById('root')).render(
//   // <StrictMode> 
//     <App />
//   // </StrictMode>,
// )



createRoot(document.getElementById('root')).render(
    <App />
)
