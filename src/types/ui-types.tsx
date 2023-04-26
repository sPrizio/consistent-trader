//  ENUMS

export const PeriodType = {
    DAYS: {ordinal: 1, label: 'Days', key: 'daily', unit: 'day'},
    WEEKS: {ordinal: 2, label: 'Weeks', key: 'weekly', unit: 'week'},
    MONTHS: {ordinal: 3, label: 'Months', key: 'monthly', unit: 'month'},
    YEARS: {ordinal: 4, label: 'Years', key: 'yearly', unit: 'year'},
}


//  TYPES

export type EquityChartTabValue = {
    period: number,
    periodType: any
}

export type EquityChartTabMap = Record<string, EquityChartTabValue>