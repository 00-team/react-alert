interface UID_DB {
    [prefix: string]: number
}

const DEFAULT_UID_PREFIX = '(00_DEFAULT_PREFIX)'
const UID_COUNTER: UID_DB = {}

const GetUniqueID = (prefix = DEFAULT_UID_PREFIX) => {
    if (!(prefix in UID_COUNTER)) {
        UID_COUNTER[prefix] = 0
    }

    const id = ++UID_COUNTER[prefix]

    if (prefix === DEFAULT_UID_PREFIX) return `${id}`

    return `${prefix}${id}`
}
export { GetUniqueID }
