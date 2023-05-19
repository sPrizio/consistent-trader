import {Helmet} from "react-helmet";
import {ChangeEvent, useEffect, useState} from "react";
import {formatDate, formatDateMoment, getDate, getDateForFormat, now} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import get from "../../services/client/ClientService";
import {StandardJsonResponse} from "../../types/api-types";
import hasData from "../../services/data/DataIntegrityService";
import ExcessLossCard from "../../components/Cards/Account/ExcessLossCard";
import SimpleButton from "../../components/Buttons/SimpleButton";
import WeekdayPerformanceCard from "../../components/Cards/Account/Analysis/WeekdayPerformanceCard";
import ProfitabilityCard from "../../components/Cards/Account/Analysis/ProfitabilityCard";

/**
 * Renders the account analysis page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function AnalysisPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [activeMonths, setActiveMonths] = useState([])
    const [activeYears, setActiveYears] = useState([])
    const [currentMonth, setCurrentMonth] = useState(formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat))
    const [currentYear, setCurrentYear] = useState(formatDateMoment(now().startOf('year'), CoreConstants.DateTime.ISODateFormat))
    const [start, setStart] = useState(formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat))
    const [end, setEnd] = useState(formatDateMoment(now().add(1, 'months').startOf('month'), CoreConstants.DateTime.ISODateFormat))

    useEffect(() => {
        getActiveYears()
        getActiveMonths()
    }, [currentYear])


    //  HANDLER FUNCTIONS

    /**
     * Handle month change
     *
     * @param e change event
     */
    function handleMonthChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentMonth(target.value)
    }

    /**
     * Handle year change
     *
     * @param e change event
     */
    function handleYearChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentYear(target.value)
    }

    /**
     * Handle submit
     */
    function handleSubmit() {
        setStart(formatDate(currentMonth, CoreConstants.DateTime.ISODateFormat))
        setEnd(formatDateMoment(getDate(currentMonth).add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
    }


    //  GENERAL FUNCTIONS

    /**
     * Obtains the months when trading sessions exist
     */
    async function getActiveMonths() {

        setIsLoading(true)

        const d =
            get(
                CoreConstants.ApiUrls.TradeRecord.ActiveMonths
                    .replace('{year}', formatDate(currentYear, CoreConstants.DateTime.ISOYearFormat))
                    .replace('{includeStarterMonth}', 'true')
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                const months = response.data
                const index = months.filter((x: { active: boolean; }) => x.active).reverse()[0]

                setActiveMonths(months)
                setCurrentMonth(
                    formatDateMoment(getDateForFormat(formatDate(currentYear, CoreConstants.DateTime.ISOYearFormat) + '-' + index.month.toLowerCase() + '-01', CoreConstants.DateTime.ISODateLongMonthFormat), CoreConstants.DateTime.ISODateFormat)
                )
            }
        })

        setIsLoading(false)

        return {}
    }

    /**
     * Obtains the years when trading sessions exist
     */
    async function getActiveYears() {

        setIsLoading(true)

        const d = get(CoreConstants.ApiUrls.TradeRecord.ActiveYears)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setActiveYears(response.data)
            }
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    if (activeMonths.length === 0 || activeYears.length === 0) {
        return (
            <>
                <Helmet>
                    <title>CTrader | Analysis</title>
                </Helmet>
                <div className="ct-analysis-page">
                    <div className="ct-analysis-page__disclaimer-container has-text-centered">
                        <div className="disclaimer">
                            This is the analysis page. Here you'll be able to view statistics and insights
                            into your trading performance to help you identify patterns and areas of improvement.
                            You'll be able to view your performance on a monthly basis.
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>CTrader | Account Analysis</title>
            </Helmet>
            <div className="ct-analysis-page">
                <div className="level">
                    <div className="level-left" />
                    <div className="level-right">
                        <div className="level-item">
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select value={currentYear} onChange={handleYearChange}>
                                        {
                                            activeYears && activeYears.map((item, key) => {
                                                const val = getDate(item)
                                                return (
                                                    <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                            key={key}>
                                                        {val.format(CoreConstants.DateTime.ISOYearFormat)}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="control is-expanded">
                                <div className="select is-fullwidth">
                                    <select value={currentMonth} onChange={handleMonthChange}>
                                        {
                                            activeMonths && activeMonths.map((item: any, key) => {
                                                const val = getDateForFormat(formatDate(currentYear, CoreConstants.DateTime.ISOYearFormat) + '-' + item.month.toLowerCase() + '-01', CoreConstants.DateTime.ISODateLongMonthFormat)
                                                return (
                                                    <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                            key={key} disabled={!item.active}>
                                                        {val.format(CoreConstants.DateTime.ISOMonthFormat)}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="level-item">
                            <div className="control">
                                <SimpleButton variant={'primary'} text={'Apply'} loading={isLoading} handler={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline is-mobile">
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <ExcessLossCard start={start} end={end} />
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <WeekdayPerformanceCard start={start} end={end} />
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <ProfitabilityCard start={start} end={end} code={'5m'} />
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        {/*<WinningBucket start={this.state.start} end={this.state.end} bucketSize={8} isLoser={false} />*/}
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        {/*<WinningBucket start={this.state.start} end={this.state.end} bucketSize={8} isLoser={true} />*/}
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        {/*<AverageValues isWin={true} start={this.state.start} end={this.state.end}/>*/}
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        {/*<AverageValues isWin={false} start={this.state.start} end={this.state.end}/>*/}
                    </div>
                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                        {/*<TopTrades count={5} sortByLosses={false}
                                   start={this.state.start} title={'Points'}
                                   sort={'PIPS'} end={this.state.end}
                                   dataKey={'pips'}
                        />*/}
                    </div>
                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                        {/*<TopTrades count={5} sortByLosses={true}
                                   start={this.state.start} title={'Points'}
                                   sort={'PIPS'} end={this.state.end}
                                   dataKey={'pips'}
                        />*/}
                    </div>
                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                        {/*<TopTrades count={5} sortByLosses={false}
                                   start={this.state.start} title={'P&L'}
                                   sort={'NET_PROFIT'} end={this.state.end}
                                   dataKey={'netProfit'}
                        />*/}
                    </div>
                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                        {/*<TopTrades count={5} sortByLosses={true}
                                   start={this.state.start} title={'P&L'}
                                   sort={'NET_PROFIT'} end={this.state.end}
                                   dataKey={'netProfit'}
                        />*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnalysisPage;