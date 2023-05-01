import {
    getAccountDomain,
    getAnalysisDomain,
    getNewsDomain,
    getRankDomain,
    getRetrospectiveDomain,
    getSystemDomain,
    getTradeDomain,
    getTradeRecordDomain,
    getUserDomain
} from "../services/configuration/ConfigurationService";

export const CoreConstants = {

    ApiUrls: {
        Account: {
            BalanceHistory: getAccountDomain() + '/balance-history?start={start}&end={end}',
            CreateBalanceModification: getAccountDomain() + '/create-modification',
            DeleteBalanceModification: getAccountDomain() + '/delete-modification?uid={uid}',
            EquityCurve: getAccountDomain() + '/equity-curve?interval={interval}&count={count}',
            LossInfo: getAccountDomain() + '/loss-info?start={start}&end={end}',
            Overview: getAccountDomain() + '/overview',
            PromoPayments: getAccountDomain() + '/promo-payments',
            Switch: getAccountDomain() + '/switch-account?accountNumber={accountNumber}'
        },
        Analysis: {
            Average: getAnalysisDomain() + '/average?start={start}&end={end}&win={win}&count={count}',
            Bucket: getAnalysisDomain() + '/bucket?start={start}&end={end}&bucket={bucket}',
            IrrelevantTrades: getAnalysisDomain() + '/irrelevant-trades?start={start}&end={end}',
            TopTrades: getAnalysisDomain() + '/top-trades?start={start}&end={end}&sort={sort}&sortByLosses={sortByLosses}&count={count}',
            WeekdayPerformance: getAnalysisDomain() + '/weekday-performance?start={start}&end={end}',
            WinningBuckets: getAnalysisDomain() + '/winning-buckets?start={start}&end={end}&bucketSize={bucketSize}&isLoser={isLoser}'
        },
        News: {
            Create: getNewsDomain() + '/create',
            ForInterval: getNewsDomain() + '/for-interval?start={start}&end={end}'
        },
        Rank: {
            BaseRanks: getRankDomain() + '/base-ranks',
        },
        Retrospective: {
            ActiveMonths: getRetrospectiveDomain() + '/active-months?year={year}',
            ActiveYears: getRetrospectiveDomain() + '/active-years',
            Create: getRetrospectiveDomain() + '/create',
            Delete: getRetrospectiveDomain() + '/delete?uid={uid}',
            Edit: getRetrospectiveDomain() + '/update?uid={uid}',
            Get: getRetrospectiveDomain() + '/uid?uid={uid}',
            MostRecent: getRetrospectiveDomain() + '/most-recent?interval={interval}',
            List: getRetrospectiveDomain() + '/timespan?start={start}&end={end}&interval={interval}',
            ListAudio: getRetrospectiveDomain() + '/get-audio-retros?start={start}&end={end}&interval={interval}',
            UploadAudio: getRetrospectiveDomain() + '/upload-audio?start={start}&end={end}&name={name}&interval={interval}',
        },
        System: {
            Contact: getSystemDomain() + '/contact',
            EntryTags: getSystemDomain() + '/entry-tags',
            Report: getSystemDomain() + '/report',
            ResultTags: getSystemDomain() + '/result-tags'
        },
        Trade: {
            Disregard: getTradeDomain() + '/disregard',
            List: getTradeDomain() + '/for-interval?start={start}&end={end}&includeNonRelevant={includeNonRelevant}',
            ListPaged: getTradeDomain() + '/for-interval-paged?start={start}&end={end}&includeNonRelevant={includeNonRelevant}&page={page}&pageSize={pageSize}',
            Recap: getTradeDomain() + '/recap?tradeId={tradeId}',
            Upload: getTradeDomain() + '/import-trades?delimiter={delimiter}&tradePlatform={tradePlatform}'
        },
        TradeRecord: {
            ActiveMonths: getTradeRecordDomain() + '/active-months?year={year}',
            ActiveYears: getTradeRecordDomain() + '/active-years',
            History: getTradeRecordDomain() + '/history?start={start}&end={end}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
            RecentHistory: getTradeRecordDomain() + '/log?count={count}&aggregateInterval={aggregateInterval}&sortOrder={sortOrder}',
        },
        User: {
            Current: getUserDomain() + '/current-user',
        }
    },

    CssConstants: {
        ColorBlack: '#000000',
        ColorWhite: '#FFFFFF',
        ColorFontTitle: 'rgb(86, 106, 127)',
        ColorFontSubtitle: 'rgb(161, 172, 184)',
        ColorPrimary: '#137DC5',

        FontPrimary: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },

    DateTime: {
        DatePickerDateFormat: 'dd/MM/yyyy',
        ISODateFormat: 'YYYY-MM-DD',
        ISODateLongMonthFormat: 'YYYY-MMMM-DD',
        ISODateTimeFormat: 'YYYY-MM-DDTHH:mm:ss',
        ISODayFormat: 'Do',
        ISOLongMonthDayYearFormat: 'MMMM Do[,] YYYY',
        ISOMonthDayFormat: 'MMMM Do',
        ISOMonthFormat: 'MMMM',
        ISOYearFormat: 'YYYY',
        ISOMonthYearFormat: 'MMMM YYYY',
        ISOShortMonthFormat: 'MMM',
        ISOShortMonthDayFormat: 'MMM D',
        ISOShortestMonthFormat: 'MM',
        ISOShortMonthDayYearFormat: 'MMM Do[,] YYYY',
        ISOShortTimeFormat: 'HH:mm',
        ISOWeekdayFormat: 'dddd'
    }
}