import BaseCard from "../../components/Cards/BaseCard";
import UserBar from "../../components/User/UserBar";
import {CoreConstants} from "../../constants/CoreConstants";
import {useEffect, useState} from "react";
import EquityCurveCard from "../../components/Cards/Account/EquityCurveCard";
import PerformanceSummaryCard from "../../components/Cards/Account/Performance/PerformanceSummaryCard";
import ExcessLossCard from "../../components/Cards/Account/ExcessLossCard";
import {formatDateMoment, now} from "../../services/datetime/DateTimeService";
import PerformanceStatisticsCard from "../../components/Cards/Account/Performance/Statistics/PerformanceStatisticsCard";
import TradeLogCard from "../../components/Cards/Trade/Log/TradeLogCard";
import NewsCard from "../../components/Cards/News/NewsCard";
import {getUser} from "../../services/user/userService";
import OverviewCard from "../../components/Cards/Account/OverviewCard";
import {getAccountOverview} from "../../services/account/accountService";

/**
 * The overview page, acts as the home page / main dashboard
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewPage({ pageHandler } : { pageHandler: Function }) {

    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [overview, setOverview] = useState<any>(null)

    useEffect(() => {
        getUserInfo()
        getOverview()
    }, [])


    //  API FUNCTIONS

    /**
     * Obtains the user info for use with the overview page
     */
    async function getUserInfo() {
        setIsLoading(true);
        setUserInfo(await getUser())
        setIsLoading(false)
        return {}
    }

    /**
     * Obtains the account overview
     */
    async function getOverview() {
        setIsLoading(true);
        setOverview(await getAccountOverview())
        setIsLoading(false)
        return {}
    }


    //  RENDER

    return (
        <div className="columns is-multiline is-mobile">
            <div className="column is-12">
                <BaseCard loading={isLoading} hasBorder={false} content={[<UserBar key={0} userInfo={userInfo ?? {}} pageHandler={pageHandler}/>]}/>
            </div>
            <div className="column is-12">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-12">
                                <OverviewCard accountOverview={overview} isLoading={isLoading} />
                            </div>
                            <div className="column is-12">
                                <NewsCard
                                    start={formatDateMoment(now().startOf('week').add(1, 'days'), CoreConstants.DateTime.ISODateFormat)}
                                    end={formatDateMoment(now().startOf('week').add(6, 'days'), CoreConstants.DateTime.ISODateFormat)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-12">
                                <EquityCurveCard />
                            </div>
                            <div className="column is-12">
                                <PerformanceSummaryCard />
                            </div>
                            <div className="column is-6">
                                <ExcessLossCard
                                    start={formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat)}
                                    end={formatDateMoment(now().startOf('month').add(1, 'months'), CoreConstants.DateTime.ISODateFormat)}
                                />
                            </div>
                            <div className="column is-6">
                                <PerformanceStatisticsCard
                                    start={formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat)}
                                    end={formatDateMoment(now().startOf('month').add(1, 'months'), CoreConstants.DateTime.ISODateFormat)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-7-desktop is-12-tablet is-12-mobile">
                        Recent Retro
                    </div>
                    <div className="column is-5-desktop is-12-tablet is-12-mobile">
                        <TradeLogCard count={5} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewPage;