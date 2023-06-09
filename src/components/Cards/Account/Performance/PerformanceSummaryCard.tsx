import {useEffect, useState} from "react";
import get from "../../../../services/client/ClientService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {StandardJsonResponse, TradeRecordInfo} from "../../../../types/api-types";
import hasData, {emptyObject} from "../../../../services/data/DataIntegrityService";
import BaseCard from "../../BaseCard";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import PerformanceSummary from "../../../Account/Performance/PerformanceSummary";

/**
 * Card displaying the monthly summary
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceSummaryCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [performanceSummary, setPerformanceSummary] = useState<TradeRecordInfo>({})

    useEffect(() => {
        getSummary()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Obtains the performance summary
     */
    async function getSummary() {
        setIsLoading(true);

        const d = await get(
            CoreConstants.ApiUrls.TradeRecord.RecentHistory
                .replace('{count}', '1')
                .replace('{aggregateInterval}', 'MONTHLY')
                .replace('{sortOrder}', 'desc')
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setPerformanceSummary(response.data[0])
        }

        setIsLoading(false)
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Summary'}
                subtitle={formatDate(performanceSummary?.startDate ?? '', CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<PerformanceSummary key={0} performanceSummary={performanceSummary} />]}
                hasError={emptyObject(performanceSummary)}
            />
        </>
    )
}

export default PerformanceSummaryCard;