//  ENUMS

export const PeriodType = {
    DAYS: {ordinal: 1, label: 'Days', key: 'daily', unit: 'day'},
    WEEKS: {ordinal: 2, label: 'Weeks', key: 'weekly', unit: 'week'},
    MONTHS: {ordinal: 3, label: 'Months', key: 'monthly', unit: 'month'},
    YEARS: {ordinal: 4, label: 'Years', key: 'yearly', unit: 'year'},
}

export const RetrospectiveType = {
    AUDIO: {code: 'audio'},
    NOTE: {code: 'note'},
}


//  TYPES

export type EquityChartTabValue = {
    period: number,
    periodType: any
}

export type EquityChartTabMap = Record<string, EquityChartTabValue>

export type CreateRetrospectiveForm = {
    startDate?: string,
    endDate?: string,
    intervalFrequency?: string,
    points?: Array<any>
}