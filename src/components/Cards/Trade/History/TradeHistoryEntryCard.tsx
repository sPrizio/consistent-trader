import BaseCard from "../../BaseCard";
import {useState} from "react";
import TradeHistoryEntry from "../../../Trade/History/TradeHistoryEntry";
import {TradeRecordInfo} from "../../../../types/api-types";

function TradeHistoryEntryCard({tradeRecord = {}, index = -1, selectedEntryHandler, listId = -1, shouldAllowTradeList = false}: {tradeRecord: TradeRecordInfo, index: number, selectedEntryHandler: Function, listId: number, shouldAllowTradeList: boolean}) {

    const [isLoading, setIsLoading] = useState(false)


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                hasBorder={false}
                content={[<TradeHistoryEntry key={0} />]}
            />
        </>
    )
}

export default TradeHistoryEntryCard;