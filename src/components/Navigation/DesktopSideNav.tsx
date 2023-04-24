import {
    AiOutlineClose,
    AiOutlineKey,
    AiOutlineRight,
    AiOutlineLineChart,
    AiOutlineQuestionCircle
} from "react-icons/ai";
import brand from '../../assets/images/brand/brand_white-removebg.png'
import {useState} from "react";

/**
 * Component representing a side navigation bar. Handles all logic associated
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function DesktopSideNav({ pageHandler } : { pageHandler: Function }) {

    const [isOpen, setIsOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState('overview');


    //  HANDLER FUNCTIONS

    /**
     * Handles selecting a new tab to mark it as 'active'
     *
     * @param val selected tab
     */
    function selectTab(val: string) {
        setSelectedTab(val)
        pageHandler(val);
    }

    /**
     * Toggles the side nav as active or inactive
     */
    function toggleMenu() {
        setIsOpen(!isOpen)
    }


    //  RENDER FUNCTIONS

    /**
     * Renders a menu link based on the give val
     *
     * @param val link value
     * @param key loop key
     */
    function renderLink(val: string, key: any) {
        return (
            <div
                key={key}
                className={"ct-side-nav__links__link" + (selectedTab === val.toLowerCase() ? ' active ' : '')}
                onClick={() => selectTab(val.toLowerCase())}
            >
                <span className="val">{val}</span>
            </div>
        )
    }

    const tradingLinks = [
        renderLink('overview', 'overview'),
        renderLink('history', 'history'),
        renderLink('analysis', 'analysis'),
        renderLink('retrospectives', 'retrospectives'),
    ]

    const supportLinks = [
        renderLink('about', 'about'),
        renderLink('contact', 'contact'),
        renderLink('help', 'help'),
        renderLink('report an issue', 'report an issue'),
    ]

    const adminLinks = [
        renderLink('dashboard', 'dashboard'),
    ]

    //  TODO: the column that handles the nav and content should be set to 12 when hidden and 8-9 when active

    //  RENDER

    return (
        <div className={"ct-side-nav" + (isOpen ? "" : " minimized ")}>
            <div className="ct-side-nav__content">
                <div className="ct-side-nav__logo content-entry">
                    <div className="ct-side-nav__logo__container">
                        <img src={brand} alt="Primary Brand"/>
                        <div className="ct-side-nav__logo__control">
                            <div className="control-icon" onClick={toggleMenu}>
                                <span className="icon">
                                    {
                                        isOpen ? <AiOutlineClose/> : <AiOutlineRight/>
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ct-side-nav__links content-entry">
                    <div className="ct-side-nav__links__title">
                        <span className="icon-text">
                            <span className="icon is-size-5">
                                <AiOutlineLineChart/>
                            </span>
                            <span className="text">Trading</span>
                        </span>
                    </div>
                    {
                        tradingLinks.map((item, i) => {
                            return item
                        })
                    }
                    <div className="ct-side-nav__links__title">
                        <span className="icon-text">
                            <span className="icon is-size-5">
                                <AiOutlineQuestionCircle/>
                            </span>
                            <span className="text">Support</span>
                        </span>
                    </div>
                    {
                        supportLinks.map((item, i) => {
                            return item
                        })
                    }
                    <div className="ct-side-nav__links__title">
                        <span className="icon-text">
                            <span className="icon is-size-5">
                                <AiOutlineKey/>
                            </span>
                            <span className="text">Admin</span>
                        </span>
                    </div>
                    {
                        adminLinks.map((item, i) => {
                            return item
                        })
                    }
                </div>
                <div className="ct-side-nav__footer content-entry">
                    <div className="ct-side-nav__footer__content">
                        <p>CTrader &copy; Version 0.1</p>
                        <p>2023 All Rights Reserved</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopSideNav;