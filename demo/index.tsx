import React, { FC, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './style.scss'

import { Options, Positions, Provider, TemplateProps, useAlert } from '../lib/'

const BasicTemplate: FC<TemplateProps> = ({ message, id }) => {
    return (
        <div style={{ color: '#fff', margin: '10px' }}>
            BasicTemplate {message} - {id}
        </div>
    )
}

const ProviderOpts: Options = {
    position: Positions.TOP_RIGHT,
    // transition: 'fade',
    timeout: 5e3,
    wrapper: {
        className: 'Wrapper',
    },
}

const App: FC = ({}) => {
    const alert = useAlert()

    return (
        <StrictMode>
            <div className='app'>
                APP
                <button
                    onClick={() => {
                        // console.log(alert)
                        alert.success('GG EZ Alert')
                    }}
                >
                    Show Alert
                </button>
            </div>
        </StrictMode>
    )
}

const Root: FC = () => (
    <StrictMode>
        <Provider options={ProviderOpts} template={BasicTemplate}>
            <App />
        </Provider>
    </StrictMode>
)

const root = createRoot(document.getElementById('root')!)
root.render(<Root />)
