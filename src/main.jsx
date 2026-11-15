import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setConsoleFunction } from 'three'
import App from './App.jsx'
import './index.css'

// @react-three/fiber 9 still creates a THREE.Clock internally, which three.js
// r183+ reports as deprecated on every canvas. Nothing in this app can change
// that, so drop just that one message and pass everything else through.
setConsoleFunction((type, message, ...params) => {
  if (type === 'warn' && typeof message === 'string' && message.startsWith('THREE.Clock: This module has been deprecated')) return
  // Mirror three.js's default handling of shader stack traces.
  if (params[0]?.isStackTrace) console[type](params[0].getError(message))
  else console[type](message, ...params)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
