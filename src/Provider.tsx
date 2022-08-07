import React, { FC, useEffect, useRef } from 'react'
import { TransitionGroup } from 'react-transition-group'

import { ProviderProps } from '.'

const Provider: FC<ProviderProps> = ({ children, options = {} }) => {
    const { containerStyle = {} } = options

    const root = useRef<HTMLDivElement>()
    // const alertContext = useRef(null)
    const timersId = useRef([])
    // const [alerts, setAlerts] = useState([])

    useEffect(() => {
        // if (!root.current) return
        root.current = document.createElement('div')
        root.current.id = '__react-alert__'
        document.body.appendChild(root.current)
        const timersIdRef = timersId.current

        return () => {
            timersIdRef.forEach(clearTimeout)
            if (root.current) document.body.removeChild(root.current)
        }
    }, [])

    return (
        <div>
            {children}
            <TransitionGroup appear style={containerStyle}></TransitionGroup>
        </div>
    )
}

export { Provider }
