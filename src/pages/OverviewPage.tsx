import BaseCard from "../components/Cards/BaseCard";
import UserBar from "../components/User/UserBar";
import get from "../services/client/ClientService";
import {CoreConstants} from "../constants/CoreConstants";
import {useEffect, useState} from "react";
import {PeriodType, StandardJsonResponse} from "../types/types";
import hasData from "../services/data/DataIntegrityService";
import Overview from "../components/Account/Overview";
import EquityCurveCard from "../components/Cards/Account/EquityCurveCard";

/**
 * The overview page, acts as the home page / main dashboard
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [accountOverview, setAccountOverview] = useState<any>(null)

    useEffect(() => {
        getUserInfo()
        getAccountOverview()
    }, [])


    //  API FUNCTIONS

    /**
     * Obtains the user info for use with the overview page
     */
    function getUserInfo() {

        setIsLoading(true);

        const d = get(CoreConstants.ApiUrls.User.Current)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setUserInfo(response.data)
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }

    /**
     * Obtains the account overview for use with the overview page
     */
    function getAccountOverview() {

        setIsLoading(true);

        const d = get(CoreConstants.ApiUrls.Account.Overview)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setAccountOverview(response.data)
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER
    const subtitle = `${accountOverview?.account?.broker ?? ''}\u00A0-\u00A0${accountOverview?.account?.accountNumber ?? ''}`
    return (
        <div className="columns is-multiline is-mobile">
            <div className="column is-12">
                <BaseCard loading={isLoading} hasBorder={false} content={[<UserBar key={0} userInfo={userInfo ?? {}}/>]}/>
            </div>
            <div className="column is-12">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <BaseCard loading={isLoading} title={'Overview & Rank'} subtitle={subtitle} hasBorder={true} content={[<Overview key={0} accountOverview={accountOverview ?? {}} />]} />
                    </div>
                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                        <EquityCurveCard period={6} periodType={PeriodType.MONTHS} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewPage;