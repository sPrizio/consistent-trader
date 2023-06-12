import BaseCard from "../../BaseCard";
import {useState} from "react";
import TradeHistoryEntry from "../../../Trade/History/Entry/TradeHistoryEntry";
import {TradeRecordInfo} from "../../../../types/api-types";
import {emptyObject} from "../../../../services/data/DataIntegrityService";

/**
 * Card that renders a trade history entry component
 *
 * @param tradeRecord trade record info
 * @param index session index
 * @param selectedEntryHandler select entry handler
 * @param listId list id
 * @param shouldAllowTradeList true if a trade list should be shown
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEntryCard(
    {
        tradeRecord = {},
        index = -1,
        selectedEntryHandler,
        listId = -1,
        shouldAllowTradeList = false
    }: {
        tradeRecord:
            TradeRecordInfo,
        index: number,
        selectedEntryHandler: Function,
        listId: number,
        shouldAllowTradeList: boolean
    }) {

    const [isLoading, setIsLoading] = useState(false)


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                hasBorder={false}
                content={[<TradeHistoryEntry key={0}
                                             tradeRecord={tradeRecord}
                                             shouldAllowTradeList={shouldAllowTradeList}
                                             selectEntryHandler={selectedEntryHandler}
                                             index={index}
                />]}
                hasError={emptyObject(tradeRecord)}
                hasOverflow={false}
            />
        </>
    )
}

export default TradeHistoryEntryCard;