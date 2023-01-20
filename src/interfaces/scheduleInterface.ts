export interface ScheduleInterface {
    date: string,
    round: number,
    type: string,
    startTime: string,
    endTime: string,
}

export interface NewScheduleInterface {
    date: string,
    pg: {
        type: string,
        round: number,
        startTime: string,
        endTime: string,
    }[]
}