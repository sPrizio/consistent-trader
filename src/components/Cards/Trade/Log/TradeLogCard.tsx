import BaseCard from "../../BaseCard";
import {useEffect, useState} from "react";
import TradeLog from "../../../Trade/Log/TradeLog";
import get from "../../../../services/client/ClientService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData, {emptyObject} from "../../../../services/data/DataIntegrityService";

/**
 * Card representing a trade log, recent history of trades
 *
 * @param count number of trades to show
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeLogCard({count = 0}: {count: number}) {

    const [isLoading, setIsLoading] = useState(false)
    const [records, setRecords] = useState([])

    useEffect(() => {
        getTradeRecordInfo()
    }, [])


    //  GENERAL FUNCTIONS

    async function getTradeRecordInfo() {

        setIsLoading(true);

        const d =
            await get(
                CoreConstants.ApiUrls.TradeRecord.RecentHistory
                    .replace('{count}', count.toString())
                    .replace('{aggregateInterval}', 'DAILY')
                    .replace('{sortOrder}', 'desc')
            )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setRecords(response.data)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Trade Log'}
                subtitle={'Last ' + count + ' sessions'}
                hasBorder={false}
                content={[<TradeLog key={0} records={records} />]}
                hasError={emptyObject(records)}
            />
        </>
    )
}

export default TradeLogCard;