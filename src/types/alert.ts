import { Context, ReactNode } from 'react'

import {
    AlertTypes,
    AlertTypesString,
    Positions,
    PositionsString,
} from './options'

type AT = AlertTypes | AlertTypesString
interface ReturnOptions<T extends AT = AT> {
    type: T
    timeout: number
    position: Positions | PositionsString
    onOpen?: () => void
    onClose?: () => void
    [K: string]: unknown
}

interface Alert<T extends AT = AT> {
    id: string
    message: ReactNode
    close: () => void
    options: ReturnOptions<T>
}

interface BaseOptions {
    timeout?: number
    position?: Positions | PositionsString
    onOpen?: () => void
    onClose?: () => void
    [K: string]: unknown
}

interface ShowOptions extends BaseOptions {
    type?: AlertTypes | AlertTypesString
}

type Show = (msg: ReactNode, options?: ShowOptions) => Alert
type Func = (msg: ReactNode, options?: BaseOptions) => Alert

export { Show as ShowFunc, Func as AlertFunc }
export { Alert as AlertModel }
export { AlertContext, AlertContextModel }

interface AlertContextModel {
    alerts: Alert[]
    remove: (a: Alert) => void
    removeAll: () => void
    show: Show
    info: Func
    success: Func
    error: Func
}

type AlertContext = Context<AlertContextModel>
