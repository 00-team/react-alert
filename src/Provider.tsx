import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { TransitionGroup } from 'react-transition-group'

import {
    AlertContextModel,
    AlertFunc,
    AlertModel,
    AlertTypes,
    Positions,
    ProviderProps,
    ShowFunc,
} from '.'
import { GetUniqueID } from 'components/utils'
import { DefaultContext } from 'context'

const Provider: FC<ProviderProps> = ({ children, options = {} }) => {
    const { containerStyle = {}, timeout: BaseTimeOut = 0 } = options
    const { context: Context = DefaultContext } = options
    const { position: BasePosition = Positions.TOP_CENTER } = options
    const { type: BaseType = AlertTypes.INFO } = options

    const root = useRef<HTMLDivElement>()
    const ContextValue = useRef<AlertContextModel>()
    const timers = useRef<NodeJS.Timeout[]>([])
    const [alerts, setAlerts] = useState<AlertModel[]>([])

    useEffect(() => {
        root.current = document.createElement('div')
        root.current.id = '__react-alert__'
        document.body.appendChild(root.current)

        return () => {
            timers.current.forEach(clearTimeout)
            if (root.current) document.body.removeChild(root.current)
        }
    }, [])

    const remove = useCallback((alert: AlertModel) => {
        setAlerts(currentAlerts => {
            const lengthBeforeRemove = currentAlerts.length
            const filteredAlerts = currentAlerts.filter(a => a.id !== alert.id)

            if (
                lengthBeforeRemove > filteredAlerts.length &&
                alert.options.onClose
            ) {
                alert.options.onClose()
            }

            return filteredAlerts
        })
    }, [])

    const removeAll = useCallback(() => {
        if (ContextValue.current) ContextValue.current.alerts.forEach(remove)
    }, [remove])

    const show: ShowFunc = useCallback(
        (message, options = {}) => {
            const id = GetUniqueID('00_react_alert_')

            const {
                type = BaseType,
                position = BasePosition,
                timeout = BaseTimeOut,
            } = options

            const alertOptions = {
                position,
                timeout,
                type,
                ...options,
            }

            const alert: AlertModel<typeof type> = {
                id,
                message,
                options: alertOptions,
                close: () => {},
            }

            alert.close = () => remove(alert)

            if (timeout) {
                const timer = setTimeout(() => {
                    remove(alert)

                    timers.current.splice(timers.current.indexOf(timer), 1)
                }, timeout)

                timers.current.push(timer)
            }

            setAlerts(state => state.concat(alert))
            if (alert.options.onOpen) alert.options.onOpen()

            return alert
        },
        [BasePosition, remove, BaseTimeOut, BaseType]
    )

    const success: AlertFunc = useCallback(
        (message, options = {}) => {
            options.type = AlertTypes.SUCCESS
            return show(message, options)
        },
        [show]
    )

    const error: AlertFunc = useCallback(
        (message, options = {}) => {
            options.type = AlertTypes.ERROR
            return show(message, options)
        },
        [show]
    )

    const info: AlertFunc = useCallback(
        (message, options = {}) => {
            options.type = AlertTypes.INFO
            return show(message, options)
        },
        [show]
    )

    ContextValue.current = {
        alerts,
        remove,
        removeAll,
        show,
        info,
        error,
        success,
    }

    return (
        <Context.Provider value={ContextValue.current}>
            {children}
            <TransitionGroup appear style={containerStyle}></TransitionGroup>
        </Context.Provider>
    )
}

export { Provider }
