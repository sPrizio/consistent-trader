import {TradeRecordInfo} from "../../../types/api-types";
import TradeLongEntry from "./TradeLongEntry";

/**
 * Component representing a table of trades
 *
 * @param records trade records to populate the table
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeLog({records = []}: { records: Array<TradeRecordInfo> }) {


    //  RENDER

    return (
        <div className="ct-trade-log">
            <div className="table-container">
                {
                    records.length <= 0 ?
                        <h6 className="ct-trade-log__disclaimer has-text-centered">
                            A log of your previous trading days would appear here.
                            At the moment you don't have any trading days. Check back here
                            once you begin trading!
                        </h6>
                        :
                        <table className="table is-fullwidth is-narrow ct-trade-log__table">
                            <thead>
                            <tr>
                                <th className="ct-trade-log__table__header has-text-left">Date</th>
                                <th className="ct-trade-log__table__header has-text-centered">Trades</th>
                                <th className="ct-trade-log__table__header has-text-centered">Win %</th>
                                <th className="ct-trade-log__table__header has-text-centered">P&L</th>
                                <th className="ct-trade-log__table__header has-text-centered">Points</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                records.map((item, key) => {
                                    return (
                                        <TradeLongEntry
                                            format={'MMMM Do'}
                                            date={item.startDate ?? ''}
                                            trades={item.statistics?.numberOfTrades ?? 0}
                                            winPercentage={item.statistics?.winPercentage ?? 0}
                                            netProfit={item.statistics?.netProfit ?? 0}
                                            netPips={item.statistics?.netPips ?? 0}
                                            key={item.startDate}
                                        />
                                    )
                                })
                            }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default TradeLog;