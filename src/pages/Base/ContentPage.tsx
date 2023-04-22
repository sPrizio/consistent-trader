import DesktopSideNav from "../../components/Navigation/DesktopSideNav";
import {useState} from "react";
import OverviewPage from "../OverviewPage";

/**
 * General content page, a page that displays user content and UI components
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ContentPage() {

    const [page, setPage] = useState('overview')


    //  HANDLERS

    /**
     * Sets the appropriate page based on the given value
     *
     * @param val page id
     */
    function selectPage(val: string) {
        setPage(val);
    }


    //  GENERAL FUNCTIONS

    /**
     * Resolves the page to show for the selected side menu tab
     */
    function resolvePage() {
        switch (page) {
            case "overview":
                return <OverviewPage />
            default:
                return null;
        }
    }


    //  RENDER

    return (
        <div className="columns is-multiline is-mobile is-gapless">
            <div className="column is-narrow-desktop is-narrow-tablet is-12-mobile">
                <DesktopSideNav pageHandler={selectPage} />
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