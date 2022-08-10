import { Component, FC, ReactNode } from 'react'

import { AlertModel } from './alert'
import {
    InnerAttrs,
    Options,
    PositionsString,
    Transitions,
    TransitionsString,
    WrapperAttrs,
} from './options'

interface TemplateProps extends AlertModel {}

interface ProviderProps {
    children?: ReactNode
    options?: Options
    template: FC<AlertModel> | typeof Component
}

interface AlertTransitionProps {
    children?: ReactNode
    type: Transitions | TransitionsString
    get_attrs?: InnerAttrs
}

interface WrapperProps {
    children: ReactNode[]
    position: PositionsString
    get_attrs?: WrapperAttrs
}

export { ProviderProps, AlertTransitionProps, TemplateProps, WrapperProps }
