import DesktopSideNav from "../../components/Navigation/DesktopSideNav";
import {useState} from "react";
import OverviewPage from "../Overview/OverviewPage";
import ProfilePage from "../Profile/ProfilePage";
import AboutPage from "../Content/AboutPage";
import ContactPage from "../Content/ContactPage";
import TradeHistoryPage from "../Trade/TradeHistoryPage";
import ReportIssuePage from "../Content/ReportIssuePage";

/**
 * General content page, a page that displays user content and UI components
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ContentPage() {

    const [page, setPage] = useState('overview')
    const [selectedTab, setSelectedTab] = useState('overview')


    //  HANDLERS

    /**
     * Sets the appropriate page based on the given value
     *
     * @param val page id
     */
    function selectPage(val: string) {
        setPage(val);
        setSelectedTab(val)
    }


    //  GENERAL FUNCTIONS

    /**
     * Resolves the page to show for the selected side menu tab
     */
    function resolvePage() {
        switch (page) {
            case "overview":
                return <OverviewPage pageHandler={selectPage} />
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
            default:
                return null;
        }
    }


    //  RENDER

    return (
        <div className="columns is-multiline is-mobile is-gapless">
            <div className="column is-narrow-desktop is-narrow-tablet is-12-mobile">
                <DesktopSideNav pageHandler={selectPage} selectedTab={selectedTab} />
            </div>
            <div className="column is-12-mobile">
                <div className="ct-content-page">
                    <div className="page-container">
                        {resolvePage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentPage;