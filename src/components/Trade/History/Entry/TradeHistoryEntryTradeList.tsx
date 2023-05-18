import {PagedTradesInfo} from "../../../../types/api-types";
import TradeHistoryEntryTradeListEntry from "./TradeHistoryEntryTradeListEntry";
import TradeHistoryEntryTradeListPagination from "./TradeHistoryEntryTradeListPagination";

/**
 * Component that renders a list of trades
 *
 * @param tradeData trade record data
 * @param pageHandler pagination handler
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEntryTradeList({tradeData = {}, pageHandler}: { tradeData: PagedTradesInfo, pageHandler: Function }) {


    //  RENDER

    return (
        <div className="ct-trade-history-entry__trade-list">
            <div className="container">
                <div className="table-container" style={{minHeight: "450px"}}>
                    <table className="table is-fullwidth is-striped">
                        <thead>
                        <tr>
                            <th/>
                            <th className="has-text-centered is-vcentered">Open</th>
                            <th className="has-text-centered is-vcentered">Price (O)</th>
                            <th className="has-text-centered is-vcentered">Close</th>
                            <th className="has-text-centered is-vcentered">Price (C)</th>
                            <th className="has-text-centered is-vcentered">Product</th>
                            <th className="has-text-centered is-vcentered">Size</th>
                            <th className="has-text-centered is-vcentered">P&L</th>
                            <th className="has-text-centered is-vcentered">Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tradeData &&
                            tradeData.content &&
                            tradeData.content.map((item, key) => {
                                return (
                                    <TradeHistoryEntryTradeListEntry
                                        openTime={item.tradeOpenTime ?? ''}
                                        closeTime={item.tradeCloseTime ?? ''}
                                        entryPrice={item.openPrice ?? -1}
                                        exitPrice={item.closePrice ?? -1}
                                        tradeType={item.tradeType ?? ''}
                                        symbol={item.product ?? ''}
                                        size={item.lotSize ?? -1}
                                        tradeId={item.tradeId ?? ''}
                                        netProfit={item.netProfit ?? -1}
                                        pips={item.pips ?? -1}
                                        key={key}
                                    />
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <TradeHistoryEntryTradeListPagination
                    page={tradeData && tradeData.pageable ? tradeData.pageable?.pageNumber ?? -1 : 0}
                    pageSize={tradeData && tradeData.pageable ? tradeData.pageable?.pageSize ?? -1 : 0}
                    totalElements={tradeData.totalElements ?? -1}
                    totalPages={tradeData.totalPages ?? -1}
                    currentPage={tradeData.number ?? -1}
                    pageHandler={pageHandler}
                />
            </div>
        </div>
    )
}

export default TradeHistoryEntryTradeList;