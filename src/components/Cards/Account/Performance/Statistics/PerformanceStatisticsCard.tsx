import BaseCard from "../../../BaseCard";
import {useEffect, useState} from "react";
import {CoreConstants} from "../../../../../constants/CoreConstants";
import {formatDate} from "../../../../../services/datetime/DateTimeService";
import PerformanceStatistics from "../../../../Account/Performance/Statistics/PerformanceStatistics";
import get from "../../../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../../../types/api-types";
import hasData, {emptyObject} from "../../../../../services/data/DataIntegrityService";

/**
 * Card that shows performance statistics for a given period
 *
 * @param start start date
 * @param end end date
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceStatisticsCard({start = '', end = ''} : {start: string, end: string}) {

    const [isLoading, setIsLoading] = useState(false)
    const [statsInfo, setStatsInfo] = useState({})

    useEffect(() => {
        getStatsInfo()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Obtains the statistics
     */
    function getStatsInfo() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.TradeRecord.RecentHistory
                    .replace('{count}', '1')
                    .replace('{aggregateInterval}', 'MONTHLY')
                    .replace('{sortOrder}', 'DESC')
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setStatsInfo(response.data[0].statistics)
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Statistics'}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<PerformanceStatistics key={0} statisticsInfo={statsInfo} />]}
                hasError={emptyObject(statsInfo)}
            />
        </>
    )
}

export default PerformanceStatisticsCard;