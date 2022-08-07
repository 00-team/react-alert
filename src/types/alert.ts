import { ReactNode } from 'react'

import { Positions, PositionsString } from './options'
import { AlertTypes, AlertTypesString } from './options'

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
    type?: AlertTypes | AlertTypesString
    timeout?: number
    position?: Positions | PositionsString
    onOpen?: () => void
    onClose?: () => void
    [K: string]: unknown
}

type OmitedOptions = Omit<BaseOptions, 'type'>

type Show = (msg: ReactNode, options?: BaseOptions) => Alert
type Func = (msg: ReactNode, options?: OmitedOptions) => Alert

export { Show as ShowFunc, Func as AlertFunc }

interface AlertContextModel {
    alerts: Alert[]
    remove: (a: Alert) => void
    removeAll: () => void
    show: Show
    info: Func
    success: Func
    error: Func
}

export { AlertContextModel, Alert as AlertModel }
