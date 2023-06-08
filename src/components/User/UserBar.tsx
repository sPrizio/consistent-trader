import {UserInfo} from "../../types/api-types";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiOutlineClose, AiOutlineSwap, AiOutlineUser} from "react-icons/ai";
import {HiUpload} from "react-icons/hi";
import {RiLogoutCircleLine} from "react-icons/ri";
import {useState} from "react";
import {now} from "../../services/datetime/DateTimeService";
import temp from '../../assets/icons/locales/round/canada.png'
import AccountSwitchModal from "../Modals/Account/AccountSwitchModal";
import TradesImportModal from "../Modals/Trade/TradesImportModal";
import {emptyObject} from "../../services/data/DataIntegrityService";


/**
 * Component for displaying basic user info
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function UserBar({userInfo = {}, pageHandler, mobileHandler}: { userInfo?: UserInfo, pageHandler: Function, mobileHandler: Function }) {

    //  TODO: add locale selector

    const [menuActive, setMenuActive] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [selectedModal, setSelectedModal] = useState('')


    //  HANDLERS

    /**
     * Toggle user menu
     */
    function toggleMenu() {
        setMenuActive(!menuActive)
    }

    /**
     * Toggles a modal
     *
     * @param val modal type
     */
    function toggleModal(val: string) {
        setModalActive(!modalActive)
        setSelectedModal(val)
        if (menuActive) {
            setMenuActive(false)
        }
    }


    //  GENERAL FUNCTIONS

    /**
     * Obtains decorative display text as a function of the time of day
     */
    function getDisplayText() {

        const date = now();
        let string;
        if (date.hour() > 17) {
            string = 'Good Evening'
        } else if (date.hour() > 11) {
            string = 'Good Afternoon'
        } else {
            string = 'Good Morning'
        }

        return <h6>{string}, <span className="highlight-name">{userInfo.firstName}</span></h6>;
    }


    //  RENDER

    return (
        <div className="ct-user-bar">
            {
                emptyObject(userInfo) ?
                    <div className="has-text-centered">
                        <p>There was an error fetching the required data. Please try again later.</p>
                    </div>
                    :
                    <>
                        <div className="level is-mobile is-vcentered">
                            <div className="level-left">
                                <div className="level-item ct-mobile-side-nav-trigger ct-user-bar__user-menu">
                        <span className="icon is-size-3" onClick={() => mobileHandler()}>
                            <RxHamburgerMenu />
                        </span>
                                </div>
                                <div className="level-item">
                                    {getDisplayText()}
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <div className="ct-user-bar__skill-text">
                                        Level
                                    </div>
                                    <div className="ct-user-bar__skill-icon">
                                        <div className="ct-user-bar__skill-icon__text">
                                            {userInfo.account?.skill.level}
                                        </div>
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div className="ct-user-bar__locale">
                                        {/*TODO: dropdown for locales, need to be selectable. Language should come from the backend*/}
                                        <img src={temp} alt={'User Locale'} />
                                    </div>
                                </div>
                                <div className="level-item">
                                    <div className="ct-user-bar__user-menu">
                            <span className="icon is-size-3" onClick={toggleMenu}>
                                {
                                    menuActive ? <AiOutlineClose/> : <RxHamburgerMenu />
                                }
                            </span>
                                        <div className={"ct-user-bar__user-menu__content" + (menuActive ? " is-active " : "")}>
                                            <div className="ct-user-bar__user-menu__content__container">
                                                <div className="ct-user-bar__user-menu__content__container__link" onClick={() => pageHandler('profile')}>
                                        <span className="icon-text">                                            <span className="icon"><AiOutlineUser/></span>
                                            <span>My Account</span>
                                        </span>
                                                </div>
                                                <div className="ct-user-bar__user-menu__content__container__link" onClick={() => toggleModal('importTrades')}>
                                        <span className="icon-text">
                                            <span className="icon"><HiUpload/></span>
                                            <span>Import Trades</span>
                                        </span>
                                                </div>
                                                <div className="ct-user-bar__user-menu__content__container__link" onClick={() => toggleModal('accountSwitch')}>
                                        <span className="icon-text">
                                            <span className="icon"><AiOutlineSwap/></span>
                                            <span>Switch Accounts</span>
                                        </span>
                                                </div>
                                                <hr className="dropdown-divider" />
                                                <div className="ct-user-bar__user-menu__content__container__link">
                                        <span className="icon-text">
                                            <span className="icon"><RiLogoutCircleLine/></span>
                                            <span>Logout</span>
                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <TradesImportModal active={modalActive && selectedModal === 'importTrades'} closeHandler={() => toggleModal('')} />

                        <AccountSwitchModal
                            active={modalActive && selectedModal === 'accountSwitch'}
                            closeHandler={() => toggleModal('')}
                            accounts={userInfo.accounts ?? []}
                        />
                    </>
            }
        </div>
    )
}

export default UserBar;