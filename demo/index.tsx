import React, { FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './style.scss'

import { Provider } from '../lib'

const App: FC = () => {
    return (
        <StrictMode>
            <div className='app'>
                APP
                <Provider options={{ position: 'bottom center' }}>
                    <span>GG EZ</span>
                </Provider>
            </div>
        </StrictMode>
    )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
