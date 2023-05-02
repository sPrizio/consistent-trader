import {UserInfo} from "../../../types/api-types";
import {MdAccountBalance, MdAccountTree} from "react-icons/md";
import {FaBalanceScale, FaExchangeAlt, FaRegCalendarAlt} from "react-icons/fa";
import {BsCurrencyExchange} from "react-icons/bs";
import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate} from "../../../services/datetime/DateTimeService";

/**
 * Component that displays overview trading information
 *
 * @param profileInfo profile info
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfileOverview({profileInfo = {}}: { profileInfo: UserInfo }) {


    //  GENERAL FUNCTIONS

    /**
     * Displays the date for the given val
     *
     * @param val date to display
     */
    function dateDisplay(val: string) {
        if (val && val.length > 0) {
            const day = formatDate(val, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
            return (
                <span>
                    {formatDate(val, CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day ? day[1] : ''}<>{day ? day[2]: ''}</>, {formatDate(val, CoreConstants.DateTime.ISOYearFormat)}
                </span>
            )
        }

        return 'No recent trades'
    }


    //  RENDER

    return (
        <div content="ct-profile-content__overview">
            <span className="ct-profile-content__section-header">Overview</span>
            <div className="ct-profile-content__section-content">
                <div className="columns is-multiline is-mobile is-gapless is-vcentered">
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <MdAccountBalance/>
                                </span>
                                <span>
                                    <strong>Broker:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.account?.broker ?? ''}</span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <FaExchangeAlt/>
                                </span>
                                <span>
                                    <strong>Account:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.account?.accountNumber ?? ''}</span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <MdAccountTree/>
                                </span>
                                <span>
                                    <strong>Type:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.account?.accountType ?? ''}</span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <FaBalanceScale/>
                                </span>
                                <span>
                                    <strong>Balance:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>${formatNumberForDisplay(profileInfo.account?.balance ?? 0)}</span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <BsCurrencyExchange/>
                                </span>
                                <span>
                                    <strong>Currency:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        <span>{profileInfo.account?.currency?.isoCode ?? ''} ({profileInfo.account?.currency?.label ?? ''})</span>
                    </div>
                    <div className="column is-4">
                            <span className="icon-text">
                                <span className="icon">
                                    <FaRegCalendarAlt/>
                                </span>
                                <span>
                                    <strong>Last Traded:</strong>
                                </span>
                            </span>
                    </div>
                    <div className="column is-8">
                        {dateDisplay(profileInfo.account?.lastTraded ?? '')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileOverview;