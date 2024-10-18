import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Cursor } from './cursor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Cursor />
    <App />
  </StrictMode>,
)
