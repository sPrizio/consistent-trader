import {useEffect, useState} from "react";
import ProfileBanner from "../components/Account/Profile/ProfileBanner";
import {getUser} from "../services/user/userService";
import EquityCurveCard from "../components/Cards/Account/EquityCurveCard";
import ProfileContent from "../components/Account/Profile/ProfileContent";
import BalanceHistoryCard from "../components/Cards/Account/BalanceHistoryCard";
import SimpleButton from "../components/Buttons/SimpleButton";
import OverviewCard from "../components/Cards/Account/OverviewCard";
import get from "../services/client/ClientService";
import {CoreConstants} from "../constants/CoreConstants";
import {StandardJsonResponse} from "../types/api-types";
import hasData from "../services/data/DataIntegrityService";
import SkillProgressCard from "../components/Cards/Skill/SkillProgressCard";
import PromotionalPaymentsCard from "../components/Cards/Account/PromotionalPaymentsCard";

/**
 * Page that displays a user's profile
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfilePage() {

    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('skillRank')
    const [userInfo, setUserInfo] = useState({})
    const [accountOverview, setAccountOverview] = useState<any>(null)

    useEffect(() => {
        getUserInfo()
        getAccountOverview()
    }, [])


    //  HANDLER FUNCTIONS

    /**
     * Selects a new tab
     *
     * @param val selected tab
     */
    function handleTabChange(val: string) {
        setActiveTab(val)
    }


    //  GENERAL FUNCTIONS

    /**
     * Returns true if the active equals the given val
     *
     * @param val test value
     */
    function isActiveTab(val: string) {
        return activeTab === val
    }

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
        <div className="ct-profile-page">
            <div className="container">
                <ProfileBanner profileInfo={userInfo} />
                <div className="columns is-multiline is-mobile columns-gap">
                    <div className="column is-12">
                        <div className="level ct-profile-page__tabs">
                            <div className="level-left" />
                            <div className="level-right">
                                <div className="level-item">
                                    <SimpleButton
                                        variant={"primary"}
                                        plain={!isActiveTab('account')}
                                        text={"Account"}
                                        handler={() => handleTabChange('account')}
                                    />
                                </div>
                                <div className="level-item">
                                    <SimpleButton
                                        variant={"primary"}
                                        plain={!isActiveTab('skillRank')}
                                        text={'Skill & Rank'}
                                        handler={() => handleTabChange('skillRank')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        activeTab === 'account' ?
                            <>
                                <div className="column is-5-desktop is-12-tablet is-12-mobile">
                                    <ProfileContent profileInfo={userInfo} />
                                </div>
                                <div className="column is-7-desktop is-12-tablet is-12-mobile">
                                    <div className="columns is-multiline is-mobile is-vcentered">
                                        <div className="column is-12">
                                            <EquityCurveCard />
                                        </div>
                                        <div className="column is-12">
                                            <BalanceHistoryCard />
                                        </div>
                                    </div>
                                </div>
                            </>
                            : null
                    }
                    {
                        activeTab === 'skillRank' ?
                            <>
                                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                    <div className="columns is-multiline is-mobile">
                                        <div className="column is-12">
                                            <OverviewCard accountOverview={accountOverview} isLoading={isLoading} />
                                        </div>
                                        <div className="column is-12">
                                            <SkillProgressCard userInfo={userInfo} isLoading={isLoading} />
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                    <div className="columns is-multiline is-mobile">
                                        <div className="column is-12">
                                            <PromotionalPaymentsCard/>
                                            {/*<AccountSupport />*/}
                                        </div>
                                        <div className="column is-12">
                                            {/*<IrrelevantTrades />*/}
                                        </div>
                                    </div>
                                </div>
                            </>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;