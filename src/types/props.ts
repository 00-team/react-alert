import { Component, FC, ReactNode } from 'react'

import { AlertModel } from './alert'
import { Options, Transitions, TransitionsString } from './options'

// import {}

interface TemplateProps extends AlertModel {}

interface ProviderProps {
    children?: ReactNode
    options?: Options
    template: FC<TemplateProps> | typeof Component<TemplateProps | {}>
}

interface AlertTransitionProps {
    children?: ReactNode
    type: Transitions | TransitionsString
}

export { ProviderProps, AlertTransitionProps, TemplateProps }
