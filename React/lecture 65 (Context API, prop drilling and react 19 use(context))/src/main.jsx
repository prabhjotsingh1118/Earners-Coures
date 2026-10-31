import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Component/ThemContext.jsx'


export let UserContext = createContext(null)

let username = "dragonball goku"


//isme app ko wrap kiya geya hai , tho jo yeh app mein kar sake , jinta UserContext.Provider mein wrap hoga utna hise mein hi yeh work karega
createRoot(document.getElementById('root')).render(
  // <UserContext value={username}>
  //   <App />
  // </UserContext>,
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
