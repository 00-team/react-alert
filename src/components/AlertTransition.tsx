import React, { CSSProperties, FC, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { AlertTransitionProps, Transitions } from '../types'

const duration = 250

type DefStyle = Record<Transitions, CSSProperties>

const defaultStyle: DefStyle = {
    [Transitions.FADE]: {
        transition: `opacity ${duration}ms ease`,
        opacity: 0,
    },
    [Transitions.SCALE]: {
        transform: 'scale(1)',
        transition: `all ${duration}ms ease-in-out`,
    },
}

type TransStyle = Record<
    Transitions,
    Partial<Record<TransitionStatus, CSSProperties>>
>

const transitionStyles: TransStyle = {
    [Transitions.FADE]: {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exited: { opacity: 1 },
    },
    [Transitions.SCALE]: {
        entering: { transform: 'scale(0)' },
        entered: { transform: 'scale(1)' },
        exiting: { transform: 'scale(0)' },
        exited: { transform: 'scale(1)' },
    },
}

const AlertTransition: FC<AlertTransitionProps> = ({ children, type }) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <Transition nodeRef={ref} timeout={duration}>
            {state => (
                <div
                    ref={ref}
                    style={{
                        ...defaultStyle[type],
                        ...transitionStyles[type][state],
                    }}
                >
                    {state} - {children}
                </div>
            )}
        </Transition>
    )
}

export { AlertTransition }
