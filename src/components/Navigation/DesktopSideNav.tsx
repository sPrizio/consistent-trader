import {
    AiOutlineClose,
    AiOutlineKey,
    AiOutlineLineChart,
    AiOutlineQuestionCircle,
    AiOutlineRight
} from "react-icons/ai";
import brand from '../../assets/images/brand/brand_white-removebg.png'
import {useState} from "react";
import {CoreConstants} from "../../constants/CoreConstants";
import {Link} from "react-router-dom";

/**
 * Component representing a side navigation bar. Handles all logic associated
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function DesktopSideNav({ pageHandler, selectedTab } : { pageHandler: Function, selectedTab: string }) {

    const [isOpen, setIsOpen] = useState(true);


    //  HANDLER FUNCTIONS

    /**
     * Handles selecting a new tab to mark it as 'active'
     *
     * @param val selected tab
     */
    function selectTab(val: string) {
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
            <Link to={'/' + key.toLowerCase()}>
                <div
                    key={key}
                    className={"ct-side-nav__links__link" + (selectedTab === key.toLowerCase() ? ' active ' : '')}
                    onClick={() => selectTab(key.toLowerCase())}
                >
                    <span className="val">{val}</span>
                </div>
            </Link>
        )
    }

    const tradingLinks = CoreConstants.MenuLinks.TradingLinks.map((item) => {
        return renderLink(item.name, item.code)
    })

    const supportLinks = CoreConstants.MenuLinks.SupportLinks.map((item) => {
        return renderLink(item.name, item.code)
    })

    const adminLinks = CoreConstants.MenuLinks.AdminLinks.map((item) => {
        return renderLink(item.name, item.code)
    })


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