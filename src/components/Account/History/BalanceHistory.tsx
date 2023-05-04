import {BalanceHistoryInfo} from "../../../types/api-types";
import BalanceHistoryEntry from "./BalanceHistoryEntry";

/**
 * Component that display's the account's balance history
 *
 * @param balanceHistory balance history 
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistory({balanceHistory = []}: {balanceHistory: Array<BalanceHistoryInfo>}) {


    //  RENDER

    //  TODO: controls for adding new entries
    //  TODO: select for changing period

    let emptyText = null
    if (!balanceHistory || balanceHistory.length === 0) {
        emptyText =
            <div className="column is-12 has-text-centered">
                <h6 className="sub-header">
                    You don't have any account balance updates. Any withdrawals or deposits would
                    appear here.
                </h6>
            </div>

    }

    return (
        <div className="ct-account-balance-history">
            <div className="columns is-multiline is-mobile">
                {
                    balanceHistory && balanceHistory.map((item, key) => {
                        return (
                            <div className="column is-12" key={item.uid}>
                                <BalanceHistoryEntry balanceHistoryInfo={item} />
                            </div>
                        )
                    })
                }
                {emptyText}
            </div>
        </div>
    )
}

export default BalanceHistory;