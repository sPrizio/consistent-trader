import {BalanceHistoryInfo} from "../../../types/api-types";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate} from "../../../services/datetime/DateTimeService";
import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import {FaCircle, FaSquare} from "react-icons/fa";
import {useState} from "react";
import BalanceHistoryEntryModal from "../../Modals/Account/History/BalanceHistoryEntryModal";

/**
*  Component that renders an entry of balance history
 *
 * @param balanceHistoryInfo balance history
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistoryEntry({balanceHistoryInfo = {}}: {balanceHistoryInfo: BalanceHistoryInfo}) {

    const [isModalActive, setIsModalActive] = useState(false)


    //  TODO: global error state, handle cases when API is down. Maybe using toasts?
    //  TODO: profile page components should show error state
    //  TODO: base card should show a default message if no data or content. Maybe can put the card in an error state with a prop?

    //  HANDLER FUNCTIONS

    /**
     * Toggles the modal active and inactive
     */
    function toggleModal() {
        setIsModalActive(!isModalActive)
    }

    //  GENERAL FUNCTIONS

    /**
     * Computes the class to show whether the update has been processed
     *
     * @param val value
     * @param processed true if processed
     */
    function computeValueClass(val: number, processed: boolean) {

        if (!processed) {
            return ' pending '
        }

        if (val >= 0) {
            return ' positive '
        }

        return ' negative '
    }


    //  RENDER

    return (
        <>
            <div className="ct-account-balance-history__entry hoverable" onClick={toggleModal}>
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-3">
                        <div className="vertically-align">
                            <h6 className="ct-account-balance-history__entry__sub-header">
                                {formatDate(balanceHistoryInfo.dateTime ?? '', CoreConstants.DateTime.ISOShortMonthDayYearFormat)}
                            </h6>
                        </div>
                    </div>
                    <div className="column is-6">
                        {
                            !balanceHistoryInfo.processed ?
                                <h6 className="ct-account-balance-history__entry__sub-header ct-account-balance-history__entry__pending">
                                    PENDING
                                </h6>
                                : null
                        }
                        <h5 className="ct-account-balance-history__entry__description">
                            {balanceHistoryInfo.description}
                        </h5>
                    </div>
                    <div className="column is-2 has-text-right">
                        <span className="ct-account-balance-history__entry__value">
                            {formatNumberForDisplay(balanceHistoryInfo.amount ?? 0)}
                        </span>
                    </div>
                    <div className="column is-1 has-text-right">
                        <span
                            className={"ct-account-balance-history__entry__amount-icon icon" + (computeValueClass(balanceHistoryInfo.amount ?? 0, balanceHistoryInfo.processed ?? false))}>
                            {
                                balanceHistoryInfo.processed ?
                                    <FaCircle/>
                                    :
                                    <FaSquare/>
                            }
                        </span>
                    </div>
                </div>
            </div>
            <BalanceHistoryEntryModal active={isModalActive} closeHandler={toggleModal} uid={balanceHistoryInfo.uid ?? ''} />
        </>
    )
}

export default BalanceHistoryEntry;