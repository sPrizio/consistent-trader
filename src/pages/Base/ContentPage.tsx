import DesktopSideNav from "../../components/Navigation/DesktopSideNav";
import {useEffect, useState} from "react";
import OverviewPage from "../Overview/OverviewPage";
import ProfilePage from "../Profile/ProfilePage";
import AboutPage from "../Content/AboutPage";
import ContactPage from "../Content/ContactPage";
import TradeHistoryPage from "../Trade/TradeHistoryPage";
import ReportIssuePage from "../Content/ReportIssuePage";
import AnalysisPage from "../Account/AnalysisPage";
import RetrospectivesPage from "../Retrospective/RetrospectivesPage";
import HelpPage from "../Content/Help/HelpPage";
import MobileSideNav from "../../components/Navigation/MobileSideNav";
import BaseCard from "../../components/Cards/BaseCard";
import UserBar from "../../components/User/UserBar";
import {getUser} from "../../services/user/userService";
import AdminPage from "../Admin/AdminPage";
import NewsPage from "../News/NewsPage";

/**
 * General content page, a page that displays user content and UI components
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ContentPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState('overview')
    const [selectedTab, setSelectedTab] = useState('overview')
    const [mobileMenuActive, setMobileMenuActive] = useState(false)
    const [userInfo, setUserInfo] = useState<any>(null)

    useEffect(() => {
        getUserInfo()
    }, [])


    //  HANDLERS

    /**
     * Sets the appropriate page based on the given value
     *
     * @param val page id
     */
    function selectPage(val: string) {
        setPage(val);
        setSelectedTab(val)
        setMobileMenuActive(false)
    }

    function toggleMobileMenu() {
        setMobileMenuActive(!mobileMenuActive)
    }


    //  GENERAL FUNCTIONS

    /**
     * Resolves the page to show for the selected side menu tab
     */
    function resolvePage() {
        switch (page) {
            case "overview":
                return <OverviewPage pageHandler={selectPage} userInfo={userInfo} />
            case "profile":
                return <ProfilePage />
            case "about":
                return <AboutPage />
            case "contact":
                return <ContactPage />
            case "history":
                return <TradeHistoryPage />
            case "report":
                return <ReportIssuePage />
            case "analysis":
                return <AnalysisPage />
            case "retrospectives":
                return <RetrospectivesPage />
            case "help":
                return <HelpPage />
            case "dashboard":
                return <AdminPage />
            case "news":
                return <NewsPage />
            default:
                return null;
        }
    }

    /**
     * Obtains the user info for use with the overview page
     */
    async function getUserInfo() {
        setIsLoading(true);
        const user = await getUser()
        setUserInfo(user)
        setIsLoading(false)
        return {}
    }


    //  RENDER

    return (
        <div className="columns is-multiline is-mobile is-gapless">
            <div className="column is-narrow-desktop is-narrow-tablet is-12-mobile">
                <DesktopSideNav pageHandler={selectPage} selectedTab={selectedTab} />
                <MobileSideNav pageHandler={selectPage} selectedTab={selectedTab} active={mobileMenuActive} />
            </div>
            <div className="column is-12-mobile">
                <div className="ct-content-page">
                    <div className="page-container">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-12">
                                <BaseCard
                                    loading={isLoading}
                                    hasBorder={false}
                                    content={[<UserBar key={0} userInfo={userInfo ?? {}} pageHandler={selectPage} mobileHandler={toggleMobileMenu} />]}
                                    hasOverflow={false}
                                />
                            </div>
                        </div>
                        {resolvePage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentPage;