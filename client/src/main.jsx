import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { SearchProvider } from './context/sreachContext'
import { CartProvider } from './context/cartContext.jsx'
// import { ToastProvider } from './context/toastContext';


createRoot(document.getElementById('root')).render(
  // <ToastProvider>

  <AuthProvider>
      <CartProvider>
    <SearchProvider>
        <BrowserRouter>
          {/* <StrictMode> */}
          <App />
          {/* </StrictMode> */}
        </BrowserRouter>
    </SearchProvider>
      </CartProvider>
  </AuthProvider>
  // </ToastProvider>
)
