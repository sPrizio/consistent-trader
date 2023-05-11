//  CLIENT

export type StandardJsonResponse = {
    success?: boolean,
    data?: any,
    message?: string,
    internalMessage?: string,
}


//  ACCOUNT & USER

export type CurrencyInfo = {
    isoCode?: string,
    label?: string,
}

export type RankInfo = {
    className?: string,
    empty?: boolean,
    imageUrl?: string,
    level?: number,
    name?: string,
    uid?: string,
}

export type CurrentRankInfo = {
    className?: string,
    current?: number,
    end?: number,
    imageUrl?: string,
    name?: string,
    nextRank?: CurrentRankInfo,
    previousRank?: CurrentRankInfo,
    start?: number,
    uid?: number,
}

export type SkillInfo = {
    delta?: number,
    empty?: boolean,
    lastUpdated?: string,
    level?: number,
    points?: number,
    remaining?: number,
    stepIncrement?: number,
    uid?: string,
}

export type AccountInfo = {
    accountNumber?: number,
    accountOpenTime?: string,
    accountType?: string,
    active?: boolean,
    balance?: number,
    broker?: string,
    currency?: CurrencyInfo,
    dailyStopLimit: number,
    dailyStopLimitType: string,
    defaultAccount: boolean,
    empty: boolean,
    lastTraded: string,
    name: string,
    rank: RankInfo,
    skill: SkillInfo,
    uid: string,
}

export type PhoneNumberInfo = {
    countryCode?: number,
    display?: string,
    empty?: boolean,
    phoneType?: string,
    telephoneNumber?: number,
    uid?: string,
}

export type UserLocaleInfo = {
    country?: string,
    empty?: boolean,
    languages?: Array<string>,
    timeZoneOffset?: string,
    townCity?: string,
    uid?: string,
}

export type UserInfo = {
    account?: AccountInfo,
    accounts?: Array<AccountInfo>,
    email?: string,
    empty?: boolean,
    firstName?: string,
    lastName?: string,
    phoneNumber?: PhoneNumberInfo,
    roles?: Array<string>,
    uid?: string,
    userLocale?: UserLocaleInfo,
    username?: string,
}

export type AccountOverviewInfo = {
    account?: AccountInfo,
    balance?: number,
    dailyEarnings?: number,
    dateTime?: string,
    monthlyEarnings?: number,
    nextTarget?: number,
    rank?: CurrentRankInfo,
}

export type ProfitCurvePoint = {
    date: string,
    value: number,
}

export type ProfitCurveInfo = {
    points?: Array<ProfitCurvePoint>
}

export type BalanceHistoryInfo = {
    amount?: number,
    dateTime?: string,
    description?: string,
    empty?: boolean,
    modificationType?: string,
    processed?: boolean,
    uid?: string,
}


//  TRADE & TRADE RECORD

export type EquityChartPoint = {
    x?: string,
    y?: number,
}

export type TradeRecordStatisticsInfo = {
    averageLossAmount?: number,
    averageLossDelta?: number,
    averageLossSize?: number,
    averageWinAmount?: number,
    averageWinDelta?: number,
    averageWinSize?: number,
    empty?: boolean,
    grossLossAmount?: number,
    grossWinAmount?: number,
    largestLossAmount?: number,
    largestLossDelta?: number,
    largestLossSize?: number,
    largestWinAmount?: number,
    largestWinDelta?: number,
    largestWinSize?: number,
    netPips?: number,
    netProfit?: number,
    numberOfLosingTrades?: number,
    numberOfTrades?: number,
    numberOfWinningTrades?: number,
    percentageProfit?: number,
    pipsEarned?: number,
    pipsLost?: number,
    points?: Array<EquityChartPoint>,
    profitability?: number,
    tradeSessions?: number,
    tradingRate?: number,
    uid?: string,
    winPercentage?: number,
}

export type TradeRecordInfo = {
    startDate?: string,
    statistics?: TradeRecordStatisticsInfo,
}

export type PerformanceSummaryInfo = {
    account?: AccountInfo,
    aggregateInterval?: string,
    balance?: number,
    empty?: boolean,
    endDate?: string,
    startDate?: string,
    statistics?: TradeRecordStatisticsInfo,
    uid?: string,
}

export type ExcessLossInfo = {
    adjusted?: number,
    excess?: number,
    limit?: number,
    occurrences?: number,
    type?: string,
}

export type PromotionalPaymentsInfo = {
    lastPaymentDate?: string,
    numberOfPayments?: number,
    total?: number,
}

export type DisregardedEntryInfo = {
    losingTrades?: number,
    netPoints?: number,
    netProfit?: number,
    totalTrades?: number,
    winPercentage?: number,
    winningTrades?: number,
}

export type DisregardedTradesInfo = {
    current?: DisregardedEntryInfo,
    previous?: DisregardedEntryInfo,
}


//  NEWS

export type NewsEntrySlotEntryInfo = {
    content?: string,
    empty?: boolean,
    severity?: string,
    severityLevel?: number,
    uid?: string,
}

export type NewsEntrySlotInfo = {
    empty?: boolean,
    entries?: Array<NewsEntrySlotEntryInfo>,
    time?: string,
    uid?: string,
}

export type NewsPieceInfo = {
    active?: boolean,
    date?: string,
    empty?: boolean,
    future?: boolean,
    past?: boolean,
    slots?: Array<NewsEntrySlotInfo>,
    uid?: string,
}

export type NewsInfo = {
    news?: Array<NewsPieceInfo>
}