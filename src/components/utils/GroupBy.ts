import { AlertModel, PositionsString } from '../../types'

interface PosGroup {
    position: PositionsString
    alerts: AlertModel[]
}

type PosGroupObj = { [pos in PositionsString]?: AlertModel[] }

type TGP = (alerts: AlertModel[]) => PosGroup[]
const GroupByPos: TGP = alerts => {
    let groups: PosGroupObj = {}

    alerts.forEach(alert => {
        const pos = alert.options.position
        if (groups[pos]) {
            groups[pos]?.push(alert)
        } else {
            groups[pos] = [alert]
        }
    })

    return Object.entries(groups).map(([key, value]) => ({
        position: key as PositionsString,
        alerts: value,
    }))
}

export { GroupByPos }
