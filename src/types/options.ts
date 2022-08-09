import { HTMLAttributes } from 'react'

import { AlertContext } from './alert'

type PositionsString =
    | 'top left'
    | 'top center'
    | 'top right'
    | 'middle left'
    | 'middle'
    | 'middle right'
    | 'bottom left'
    | 'bottom center'
    | 'bottom right'

enum Positions {
    TOP_LEFT = 'top left',
    TOP_CENTER = 'top center',
    TOP_RIGHT = 'top right',
    MIDDLE_LEFT = 'middle left',
    MIDDLE = 'middle',
    MIDDLE_RIGHT = 'middle right',
    BOTTOM_LEFT = 'bottom left',
    BOTTOM_CENTER = 'bottom center',
    BOTTOM_RIGHT = 'bottom right',
}

type AlertTypesString = 'info' | 'success' | 'error'

enum AlertTypes {
    INFO = 'info',
    SUCCESS = 'success',
    ERROR = 'error',
}

type TransitionsString = 'fade' | 'scale'
enum Transitions {
    FADE = 'fade',
    SCALE = 'scale',
}

export { Positions, PositionsString }
export { AlertTypes, AlertTypesString }
export { Transitions, TransitionsString }
export { Options }

interface Options {
    position?: Positions | PositionsString
    type?: AlertTypes | AlertTypesString
    transition?: Transitions | TransitionsString
    timeout?: number
    context?: AlertContext
    wrapper?: HTMLAttributes<HTMLDivElement>
}
