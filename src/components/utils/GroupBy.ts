import { AlertModel, Positions, PositionsString } from '../../types'

// type PosGroupObj = { [pos in PositionsString]: AlertModel[] }
type PosGroupObj = Record<PositionsString, AlertModel[]>

type TGP = (alerts: AlertModel[]) => PosGroupObj
const GroupByPos: TGP = alerts => {
    let groups: PosGroupObj = {} as PosGroupObj

    Object.values(Positions).forEach(pos => (groups[pos] = []))

    alerts.forEach(alert => {
        const pos = alert.options.position
        groups[pos].push(alert)
    })

    return groups
}

export { GroupByPos }
