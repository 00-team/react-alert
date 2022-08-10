import React, { CSSProperties, FC, useRef } from 'react'
import { Transition, TransitionStatus } from 'react-transition-group'

import { AlertTransitionProps, Transitions } from '../types'

const duration = 250

type DefStyle = Record<Transitions, CSSProperties>

type TransitionStatusStyle = Partial<Record<TransitionStatus, CSSProperties>>
type TransitionStyle = Record<Transitions, TransitionStatusStyle>

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

const transitionStyles: TransitionStyle = {
    [Transitions.FADE]: {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
    },
    [Transitions.SCALE]: {
        entering: { transform: 'scale(0)' },
        entered: { transform: 'scale(1)' },
        exiting: { transform: 'scale(0)' },
        exited: { transform: 'scale(1)' },
    },
}

const AlertTransition: FC<AlertTransitionProps> = props => {
    const { children, type, get_attrs, ...opts } = props
    const ref = useRef<HTMLDivElement>(null)

    const GetAttrs = (status: TransitionStatus) => {
        if (get_attrs) return get_attrs(type, status)
        return {}
    }

    return (
        <Transition nodeRef={ref} timeout={duration} {...opts}>
            {status => {
                const { style, ...attrs } = GetAttrs(status)
                return (
                    <div
                        {...attrs}
                        ref={ref}
                        style={{
                            ...defaultStyle[type],
                            ...transitionStyles[type][status],
                            ...style,
                        }}
                    >
                        {children}
                    </div>
                )
            }}
        </Transition>
    )
}

export { AlertTransition }
