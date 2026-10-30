import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async'

// Each page is a separately named chunk. After a deploy the names change and the old files are gone, so a tab opened before
// the deploy asks for a chunk that no longer exists when its visitor clicks a link; Vite reports that as 'vite:preloadError'.
// Reload once (per URL, per tab) so the browser fetches the new page and its chunks instead of leaving a dead click.
window.addEventListener('vite:preloadError', () => {
    const key = 'reloaded-for-' + window.location.href
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
)
