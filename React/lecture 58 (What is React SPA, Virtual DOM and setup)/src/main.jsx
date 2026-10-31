import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  //yaha se css connect hai
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// aur

//yeh `root` yeh its just a id , yaha kuch bhi likh sakte hai jese anime
// createRoot(document.getElementById('root')).render(<app/> ) //creat means <app/> ke ander jo bhi hai usko render karwa do 

