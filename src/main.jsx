import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import "bulma/css/bulma.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
