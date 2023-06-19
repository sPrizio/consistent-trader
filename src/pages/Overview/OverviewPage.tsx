import {CoreConstants} from "../../constants/CoreConstants";
import {useEffect, useState} from "react";
import EquityCurveCard from "../../components/Cards/Account/EquityCurveCard";
import PerformanceSummaryCard from "../../components/Cards/Account/Performance/PerformanceSummaryCard";
import ExcessLossCard from "../../components/Cards/Account/ExcessLossCard";
import {formatDateMoment, now} from "../../services/datetime/DateTimeService";
import PerformanceStatisticsCard from "../../components/Cards/Account/Performance/Statistics/PerformanceStatisticsCard";
import TradeLogCard from "../../components/Cards/Trade/Log/TradeLogCard";
import NewsCard from "../../components/Cards/News/NewsCard";
import OverviewCard from "../../components/Cards/Account/OverviewCard";
import {getAccountOverview} from "../../services/account/accountService";
import {Helmet} from "react-helmet";
import get from "../../services/client/ClientService";
import {StandardJsonResponse, UserInfo} from "../../types/api-types";
import hasData from "../../services/data/DataIntegrityService";
import NoteRetrospective from "../../components/Retrospective/NoteRetrospective";
import {Moment} from "moment";

/**
 * The overview page, acts as the home page / main dashboard
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewPage({pageHandler, userInfo = {}}: { pageHandler: Function, userInfo: UserInfo }) {

    const [isLoading, setIsLoading] = useState(false)
    const [overview, setOverview] = useState<any>(null)
    const [recentRetro, setRecentRetro] = useState({})

    useEffect(() => {
        getOverview()
        getRecentRetrospective()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Determines which days to show on the news card with a max lookahead of 3 days.
     * Will stop at the end of the current week.
     * Examples:
     *      Monday would show news for Mon-Wed
     *      Thursday would show news for Thur-Fri
     *      Friday would show news only for Fri
     */
    function computeBounds() {

        const date = now()
        if (!isWeekend(date)) {
            let test = date
            let lookahead = 1
            while (lookahead < 3 && !isWeekend(test)) {
                lookahead += 1
                test = test.add(1, 'days')
            }

            return {
                start: formatDateMoment(now().startOf('day'), CoreConstants.DateTime.ISODateFormat),
                end: formatDateMoment(now().startOf('day').add(lookahead, 'days'), CoreConstants.DateTime.ISODateFormat)
            }
        }

        if (date.weekday() === 0) {
            return {
                start: formatDateMoment(now().startOf('day').add(1, 'days'), CoreConstants.DateTime.ISODateFormat),
                end: formatDateMoment(now().startOf('day').add(4, 'days'), CoreConstants.DateTime.ISODateFormat)
            }
        }

        return {
            start: formatDateMoment(now().startOf('week').add(1, 'weeks').add(1, 'days'), CoreConstants.DateTime.ISODateFormat),
            end: formatDateMoment(now().startOf('week').add(1, 'weeks').add(4, 'days'), CoreConstants.DateTime.ISODateFormat)
        }
    }

    /**
     * Returns true if the given date is a weekend
     *
     * @param date date to test
     */
    function isWeekend(date: Moment) {
        return date.weekday() === 0 || date.weekday() === 6
    }


    //  API FUNCTIONS

    /**
     * Obtains the account overview
     */
    async function getOverview() {
        setIsLoading(true);
        setOverview(await getAccountOverview())
        setIsLoading(false)
        return {}
    }

    /**
     * Obtains the most recent retrospective
     */
    async function getRecentRetrospective() {

        setIsLoading(true);

        const d = await get(
            CoreConstants.ApiUrls.Retrospective.MostRecent
                .replace('{interval}', 'WEEKLY')
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setRecentRetro(response.data)
        }

        setIsLoading(false)
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Overview</title>
            </Helmet>
            <div className="columns is-multiline is-mobile">
                <div className="column is-12">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <div className="columns is-multiline is-mobile">
                                <div className="column is-12">
                                    <OverviewCard accountOverview={overview} isLoading={isLoading}/>
                                </div>
                                <div className="column is-12">
                                    <NewsCard
                                        start={computeBounds()['start']}
                                        end={computeBounds()['end']}
                                        locales={userInfo?.userLocale?.currencies ?? []}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column is-6-desktop is-12-tablet is-12-mobile">
                            <div className="columns is-multiline is-mobile">
                                <div className="column is-12">
                                    <EquityCurveCard/>
                                </div>
                                <div className="column is-12">
                                    <PerformanceSummaryCard/>
                                </div>
                                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                    <ExcessLossCard
                                        start={formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat)}
                                        end={formatDateMoment(now().startOf('month').add(1, 'months'), CoreConstants.DateTime.ISODateFormat)}
                                    />
                                </div>
                                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                    <PerformanceStatisticsCard
                                        start={formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat)}
                                        end={formatDateMoment(now().startOf('month').add(1, 'months'), CoreConstants.DateTime.ISODateFormat)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column is-7-desktop is-12-tablet is-12-mobile">
                            <NoteRetrospective
                                interval={'WEEKLY'}
                                showTotals={false}
                                isLoading={isLoading}
                                retro={recentRetro}
                                editHandler={() => undefined}
                                deleteHandler={() => undefined}
                                showCrud={false}
                            />
                        </div>
                        <div className="column is-5-desktop is-12-tablet is-12-mobile">
                            <TradeLogCard count={5}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewPage;