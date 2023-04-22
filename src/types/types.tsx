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