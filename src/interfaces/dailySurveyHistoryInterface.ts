export interface DailySurveyHistoryInterface {
    history: {
        answer?: number,
        dt?: string
    }[],
    pgNo: number,
    pgNum: number,
    pgSttDate: string,
    pgTitle: string,
    pgType: string,
    userNo: number,
    week: number
}