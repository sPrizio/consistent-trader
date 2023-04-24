import BaseCard from "../components/Cards/BaseCard";
import UserBarCard from "../components/Cards/User/UserBarCard";
import get from "../services/client/ClientService";
import {CoreConstants} from "../constants/CoreConstants";
import {useEffect, useState} from "react";
import {StandardJsonResponse} from "../types/types";
import hasData from "../services/data/DataIntegrityService";
import OverviewCard from "../components/Cards/Account/OverviewCard";

/**
 * The overview page, acts as the home page / main dashboard
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [accountOverview, setAccountOverview] = useState({})

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

    return (
        <div className="columns is-multiline is-mobile">
            <div className="column is-12">
                <BaseCard loading={isLoading} hasBorder={false} content={[<UserBarCard key={0} userInfo={userInfo}/>]}/>
            </div>
            <div className="column is-5">
                <BaseCard loading={isLoading} title={'Overview & Rank'} subtitle={'Test'} hasBorder={true} content={[<OverviewCard key={0} accountOverview={accountOverview} />]} />
            </div>
            <div className="column is-7">
                <BaseCard loading={isLoading} title={'Account Growth'} subtitle={'Last 6 months'} hasBorder={false} content={[]} />
            </div>
        </div>
    )
}

export default OverviewPage;