import React, { CSSProperties, FC, useMemo } from 'react'

import { Positions, PositionsString, WrapperProps } from '../types'

const DefaultStyles: CSSProperties = {
    left: 0,
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    pointerEvents: 'none',
    zIndex: 1000,
}

type PS = Record<PositionsString, CSSProperties>
const PosStyles: PS = {
    [Positions.TOP_LEFT]: {
        top: 0,
        alignItems: 'flex-start',
    },
    [Positions.TOP_CENTER]: {
        top: 0,
    },
    [Positions.TOP_RIGHT]: {
        top: 0,
        alignItems: 'flex-end',
    },
    [Positions.MIDDLE_LEFT]: {
        top: '50%',
        alignItems: 'flex-start',
    },
    [Positions.MIDDLE_CENTER]: {
        top: '50%',
    },
    [Positions.MIDDLE_RIGHT]: {
        top: '50%',
        alignItems: 'flex-end',
    },
    [Positions.BOTTOM_LEFT]: {
        bottom: 0,
        alignItems: 'flex-start',
    },
    [Positions.BOTTOM_CENTER]: {
        bottom: 0,
    },
    [Positions.BOTTOM_RIGHT]: {
        bottom: 0,
        alignItems: 'flex-end',
    },
}

const Wrapper: FC<WrapperProps> = props => {
    const { children, position, get_attrs } = props
    const PosStyle = useMemo(() => PosStyles[position], [position])
    const opts = get_attrs ? get_attrs(position) : {}
    const { style, ...attrs } = opts

    if (children.length < 1) return <></>

    return (
        <div
            {...attrs}
            style={{
                ...DefaultStyles,
                ...PosStyle,
                ...style,
            }}
        >
            {children}
        </div>
    )
}

export { Wrapper }
