import BaseCard from "../components/Cards/BaseCard";
import UserBar from "../components/Cards/User/UserBar";
import get from "../services/client/ClientService";
import {CoreConstants} from "../constants/CoreConstants";
import {useEffect, useState} from "react";
import {StandardJsonResponse} from "../types/types";
import hasData from "../services/data/DataIntegrityService";

/**
 * The overview page, acts as the home page / main dashboard
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getAccountOverview()
    })


    //  API FUNCTIONS

    /**
     * Obtains the account info for use with the overview page
     */
    function getAccountOverview() {

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


    //  RENDER

    return (
        <div className="columns is-multiline is-mobile">
            <div className="column is-12">
                <BaseCard loading={isLoading} content={[<UserBar key={0} userInfo={userInfo} />]}/>
            </div>
        </div>
    )
}

export default OverviewPage;