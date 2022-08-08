import { useContext, useMemo } from 'react'

import { DefaultContext } from 'context'

import { AlertContext } from '../types'

const useAlert = (context?: AlertContext) => {
    const AlertContext = useContext(context || DefaultContext)
    return useMemo(() => AlertContext, [AlertContext])
}

export { useAlert }
