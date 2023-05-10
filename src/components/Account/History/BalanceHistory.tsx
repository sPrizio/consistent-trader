import {BalanceHistoryInfo} from "../../../types/api-types";
import BalanceHistoryEntry from "./BalanceHistoryEntry";
import {ChangeEvent, useState} from "react";
import {RiAddCircleFill} from "react-icons/ri";
import CreateBalanceHistoryEntryModal from "../../Modals/Account/History/CreateBalanceHistoryEntryModal";

/**
 * Component that display's the account's balance history
 *
 * @param balanceHistory balance history
 * @param historyHandler handler for selecting a new history option
 * @param filter currently active filter
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistory(
    {
        balanceHistory = [],
        historyHandler,
        filter = 'last-60'
    }: {
        balanceHistory: Array<BalanceHistoryInfo>,
        historyHandler: Function,
        filter: string,
    }) {

    const [isModalActive, setIsModalActive] = useState(false)
    const [filterHistory, setFilterHistory] = useState(filter)


    //  HANDLER FUNCTIONS

    /**
     * Toggles the modal active
     */
    function toggleModal() {
        setIsModalActive(!isModalActive)
    }

    /**
     * Handles select changes when interfacing with the modal
     *
     * @param e select even
     */
    function handleSelectChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement

        setFilterHistory(target.value ?? '')
        historyHandler(e)
    }


    //  RENDER

    let emptyText = null
    if (!balanceHistory || balanceHistory.length === 0) {
        emptyText =
            <div className="column is-12 has-text-centered">
                <h6 className="ct-account-balance-history__empty-text">
                    You don't have any account balance updates. Any withdrawals or deposits would
                    appear here.
                </h6>
            </div>

    }

    let selector =
        <div className="ct-account-balance-history__controls">
            <div className="level">
                <div className="level-left"/>
                <div className="level-right">
                    <div className="level-item ct-account-balance-history__controls__new-entry" onClick={toggleModal}>
                        <span className="icon is-size-4">
                            <RiAddCircleFill/>
                        </span>
                    </div>
                    <div className="level-item">
                        <div className="select is-normal">
                            <select value={filterHistory} onChange={(e) => handleSelectChange(e)}>
                                <option value={'last-30'}>Last 30 Days</option>
                                <option value={'last-60'}>Last 60 Days</option>
                                <option value={'last-90'}>Last 90 Days</option>
                                <option value={'ytd'}>Year to date</option>
                                <option value={'all-time'}>All-time</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    let header =
        <div className="column is-12 is-vcentered">
            <div className="ct-account-balance-history__entry header-row">
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-3">
                        <div className="header-row__header">Date</div>
                    </div>
                    <div className="column is-6">
                        <div className="header-row__header">Description</div>
                    </div>
                    <div className="column is-2 has-text-right">
                        <div className="header-row__header">Amount</div>
                    </div>
                    <div className="column is-1"/>
                </div>
            </div>
        </div>

    return (
        <>
            <div className="ct-account-balance-history">
                {selector}
                <div className="columns is-multiline is-mobile is-gapless">
                    {!emptyText && header}
                    {
                        balanceHistory && balanceHistory.map((item, key) => {
                            return (
                                <div className="column is-12" key={item.uid}>
                                    <BalanceHistoryEntry balanceHistoryInfo={item}/>
                                </div>
                            )
                        })
                    }
                    {emptyText}
                </div>
            </div>
            <CreateBalanceHistoryEntryModal active={isModalActive} closeHandler={toggleModal} />
        </>
    )
}

export default BalanceHistory;