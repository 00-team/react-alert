import { createContext } from 'react'

import { AlertContextModel } from '../types'

const DefaultContext = createContext<AlertContextModel>({} as AlertContextModel)

export { DefaultContext }
