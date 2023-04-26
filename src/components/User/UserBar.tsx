import {UserInfo} from "../../types/api-types";
import {RxHamburgerMenu} from "react-icons/rx";
import {AiOutlineClose, AiOutlineSwap, AiOutlineUser} from "react-icons/ai";
import {HiUpload} from "react-icons/hi";
import {RiLogoutCircleLine} from "react-icons/ri";
import {useState} from "react";
import {now} from "../../services/datetime/DateTimeService";
import BaseModal from "../Modals/BaseModal";


/**
 * Component for displaying basic user info
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function UserBar({userInfo = {}}: { userInfo?: UserInfo }) {

    const [menuActive, setMenuActive] = useState(false)
    const [modalActive, setModalActive] = useState(false)


    //  HANDLERS

    /**
     * Toggle user menu
     */
    function toggleMenu() {
        setMenuActive(!menuActive)
    }

    /**
     * Toggles a modal
     */
    function toggleModal() {
        setModalActive(!modalActive)
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
            <div className="level is-mobile is-vcentered">
                <div className="level-left">
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
                        <div className="ct-user-bar__user-menu">
                            <span className="icon is-size-3" onClick={toggleMenu}>
                                {
                                    menuActive ? <AiOutlineClose/> : <RxHamburgerMenu />
                                }
                            </span>
                            <div className={"ct-user-bar__user-menu__content" + (menuActive ? " is-active " : "")}>
                                <div className="ct-user-bar__user-menu__content__container">
                                    <div className="ct-user-bar__user-menu__content__container__link">
                                        <span className="icon-text">
                                            <span className="icon"><AiOutlineUser/></span>
                                            <span>My Account</span>
                                        </span>
                                    </div>
                                    <div className="ct-user-bar__user-menu__content__container__link" onClick={toggleModal}>
                                        <span className="icon-text">
                                            <span className="icon"><HiUpload/></span>
                                            <span>Upload Trades</span>
                                        </span>
                                    </div>
                                    <div className="ct-user-bar__user-menu__content__container__link">
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

            <BaseModal
                active={modalActive}
                title={'Upload / Import Trades'}
                closeHandler={toggleModal}
                content={[<div key={0}>Hello There, General Kenobi</div>]}
            />
        </div>
    )
}

export default UserBar;