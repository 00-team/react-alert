import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TransitionGroup } from 'react-transition-group'

import { AlertTransition, GetUniqueID, GroupByPos, Wrapper } from 'components'
import { DefaultContext } from 'context'

import {
    AlertContextModel,
    AlertFunc,
    AlertModel,
    AlertTypes,
    Positions,
    ProviderProps,
    ShowFunc,
    Transitions,
} from './types'

const Provider: FC<ProviderProps> = props => {
    const { children, template: Template, options = {} } = props
    const { containerStyle = {}, timeout: BaseTimeOut = 0 } = options
    const { context: Context = DefaultContext } = options
    const { position: BasePosition = Positions.TOP_CENTER } = options
    const { type: BaseType = AlertTypes.INFO } = options
    const { transition = Transitions.FADE, wrapper } = options

    const root = useRef<HTMLDivElement>()
    const ContextValue = useRef<AlertContextModel>()
    const timers = useRef<NodeJS.Timeout[]>([])
    const [alerts, setAlerts] = useState<AlertModel[]>([])

    useEffect(() => {
        root.current = document.createElement('div')
        root.current.id = '__00_react_alert__'
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

            {root.current &&
                createPortal(
                    Object.entries(GroupByPos(alerts)).map(
                        ([position, Galerts], idx0) => {
                            return (
                                <TransitionGroup
                                    {...wrapper}
                                    appear
                                    key={idx0}
                                    component={Wrapper}
                                    {...{ position, containerStyle }}
                                >
                                    {Galerts.map((alert, idx1) => (
                                        <AlertTransition
                                            key={idx1}
                                            type={transition}
                                        >
                                            <Template {...alert} />
                                        </AlertTransition>
                                    ))}
                                </TransitionGroup>
                            )
                        }
                    ),
                    root.current
                )}
        </Context.Provider>
    )
}

export { Provider }
