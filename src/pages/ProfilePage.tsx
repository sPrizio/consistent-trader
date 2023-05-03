import {useEffect, useState} from "react";
import ProfileBanner from "../components/Account/Profile/ProfileBanner";
import {getUser} from "../services/user/userService";
import EquityCurveCard from "../components/Cards/Account/EquityCurveCard";
import ProfileContent from "../components/Account/Profile/ProfileContent";
import BalanceHistoryCard from "../components/Cards/Account/BalanceHistoryCard";

/**
 * Page that displays a user's profile
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfilePage() {

    const [isLoading, setIsLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('account')
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getUserInfo()
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
     * Determines which tab is active
     *
     * @param val selected tab
     */
    function computeActiveTab(val: string) {
        return (activeTab === val) ? ' is-active ' : '';
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


    //  RENDER

    return (
        <div className="ct-profile-page">
            <div className="container">
                <ProfileBanner profileInfo={userInfo} />
                <div className="columns is-multiline is-mobile columns-gap">
                    <div className="column is-12">
                        <div className="tabs is-boxed is-centered">
                            <ul>
                                <li className={computeActiveTab('account')}>
                                    <a onClick={() => handleTabChange('account')}>Account</a>
                                </li>
                                <li className={computeActiveTab('skillRank')}>
                                    <a onClick={() => handleTabChange('skillRank')}>Skill & Rank</a>
                                </li>
                            </ul>
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
                                            {/*<AccountOverview overview={this.state.overview}/>*/}
                                        </div>
                                        <div className="column is-12">
                                            {/*<SkillProgress overview={this.state.overview}/>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                    <div className="columns is-multiline is-mobile">
                                        <div className="column is-12">
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