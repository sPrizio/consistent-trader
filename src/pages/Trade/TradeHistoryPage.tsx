import {CoreConstants} from "../../constants/CoreConstants";
import {formatDate, formatDateMoment, getDateForFormat, now} from "../../services/datetime/DateTimeService";
import {ChangeEvent, useEffect, useState} from "react";
import get from "../../services/client/ClientService";
import {ActiveMonthInfo, ActiveYearInfo, StandardJsonResponse} from "../../types/api-types";
import hasData from "../../services/data/DataIntegrityService";
import {Helmet} from "react-helmet";
import {displayString} from "../../services/data/FormattingService";
import {AiOutlineArrowLeft} from "react-icons/ai";
import SimpleButton from "../../components/Buttons/SimpleButton";
import TradeHistoryEntryCard from "../../components/Cards/Trade/History/TradeHistoryEntryCard";
import {BsArrowLeftShort} from "react-icons/bs";

/**
 * The trade history page, showing each session for the given interval of time
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [start, setStart] = useState(formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat))
    const [end, setEnd] = useState(formatDateMoment(now().add(1, 'months').startOf('month').add(1, 'days'), CoreConstants.DateTime.ISODateFormat))
    const [interval, setInterval] = useState('DAILY')
    const [trades, setTrades] = useState([])
    const [activeMonths, setActiveMonths] = useState<Array<ActiveMonthInfo>>([])
    const [activeYears, setActiveYears] = useState<Array<ActiveYearInfo>>([])
    const [currentMonth, setCurrentMonth] = useState(formatDateMoment(now(), CoreConstants.DateTime.ISOMonthFormat).toUpperCase())
    const [currentYear, setCurrentYear] = useState(formatDateMoment(now(), CoreConstants.DateTime.ISOYearFormat))

    useEffect(() => {
        getTradeLog()
        getActiveMonths()
    }, [interval, start, end, currentYear, currentMonth])


    //  HANDLER FUNCTIONS

    /**
     * Handles applying the selected filters
     *
     * @param value date
     */
    function handleButtonClick(value: string) {

        let val, st, en;
        if (value === 'DAILY') {
            val = 'MONTHLY'
            st = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year'), CoreConstants.DateTime.ISODateFormat)
            en = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('year').add(1, 'years').add(1, 'days'), CoreConstants.DateTime.ISODateFormat)
        } else if (value === 'MONTHLY') {
            val = 'YEARLY'
            st = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).subtract(100, 'years'), CoreConstants.DateTime.ISODateFormat)
            en = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).add(2, 'years').add(1, 'days'), CoreConstants.DateTime.ISODateFormat)
        } else {
            val = 'DAILY'
            st = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month'), CoreConstants.DateTime.ISODateFormat)
            en = formatDateMoment(getDateForFormat(currentYear + '-' + currentMonth + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month').add(1, 'month'), CoreConstants.DateTime.ISODateFormat)
        }

        setInterval(val)
        setStart(st)
        setEnd(en)
        setCurrentMonth(st)
        setCurrentYear(st)
    }

    /**
     * Handles exploding a trade log entry
     *
     * @param value trade uid
     * @param start start date
     * @param end end date
     */
    function handleEntrySelect(value: string, start: string, end: string) {

        let val;
        if (value === 'MONTHLY') {
            val = 'DAILY'
        } else {
            val = 'MONTHLY'
        }

        setInterval(val)
        setStart(start)
        setEnd(end)
        setCurrentYear(formatDate(start, CoreConstants.DateTime.ISOYearFormat))
        setCurrentMonth(formatDate(start, CoreConstants.DateTime.ISOMonthFormat).toUpperCase())
    }

    /**
     * Handles selecting a different month
     *
     * @param e select event
     */
    function handleMonthChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        const d = getDateForFormat(currentYear + '-' + target.value + '-01', CoreConstants.DateTime.ISODateLongMonthFormat).startOf('month')

        setCurrentMonth(target.value)
        setStart(formatDateMoment(d, CoreConstants.DateTime.ISODateFormat))
        setEnd(formatDateMoment(d.add(1, 'months').add(1, 'days'), CoreConstants.DateTime.ISODateFormat))
    }


    //  GENERAL FUNCTIONS

    /**
     * Obtains the active months via api call
     */
    async function getActiveMonths() {

        setIsLoading(true)

        const d =
            get(
                CoreConstants.ApiUrls.TradeRecord.ActiveMonths
                    .replace('{year}', currentYear)
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setActiveMonths(response.data)
            }
        })

        setIsLoading(false)

        return {}
    }

    /**
     * Performs an api call to obtain the trade log
     */
    async function getTradeLog() {

        setIsLoading(true)

        const d =
            get(
                CoreConstants.ApiUrls.TradeRecord.History
                    .replace('{start}', start)
                    .replace('{end}', end)
                    .replace('{aggregateInterval}', interval)
                    .replace('{sortOrder}', 'desc')
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setTrades(response.data)
            }
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    let button
    if (interval === 'DAILY') {
        button =
            <SimpleButton
                text={currentYear}
                iconPosition={'left'}
                icon={<BsArrowLeftShort/>}
                handler={() => handleButtonClick('DAILY')}
                variant={'primary'}
                inverted={true}
                loading={isLoading}
            />
    } else if (interval === 'MONTHLY') {
        button =
            <SimpleButton
                text={'All-time'}
                iconPosition={'left'}
                icon={<BsArrowLeftShort/>}
                handler={() => handleButtonClick('MONTHLY')}
                variant={'primary'}
                inverted={true}
                loading={isLoading}
            />
    } else {
        button = null
    }

    let select = null
    if (interval === 'DAILY') {
        select =
            <div className="select">
                <select value={currentMonth} onChange={handleMonthChange}>
                    {
                        activeMonths.map((item, key) => {
                            return (
                                <option key={key} disabled={!item.active} value={item.month}>
                                    {displayString(item.month ?? '')}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
    }

    if (trades.length === 0) {
        return (
            <>
                <Helmet>
                    <title>TraderBuddy | Trade History</title>
                </Helmet>
                <div className="ct-trade-history-page">
                    <div className="ct-trade-history-page__disclaimer-container has-text-centered">
                        <div className="ct-trade-history-page__disclaimer-container__disclaimer">
                            Your trade history would appear here, organized initially by each trading day of the
                            current month. You'll be able to view your performance breakdown
                            as well as chart your intra-day (month & year) progress. Additionally, expanding the view
                            into a trading day will allow you to view your trade log.
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>CTrader | Trade History</title>
            </Helmet>
            <div className="ct-trade-history-page">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            {button}
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            {select}
                        </div>
                    </div>
                </div>
                <div className={"columns is-multiline is-mobile"}>
                    {
                        trades && trades.map((item, key) => {
                            return (
                                <div className="column is-12" key={key}>
                                    <TradeHistoryEntryCard
                                        tradeRecord={item}
                                        index={key}
                                        selectedEntryHandler={handleEntrySelect}
                                        listId={key}
                                        shouldAllowTradeList={interval === 'DAILY'}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TradeHistoryPage;