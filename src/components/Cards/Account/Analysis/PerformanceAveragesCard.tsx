import BaseCard from "../../BaseCard";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {useEffect, useState} from "react";
import get from "../../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData, {emptyObject} from "../../../../services/data/DataIntegrityService";
import PerformanceAverages from "../../../Account/Analysis/PerformanceAverages";

/**
 * Card that renders the performance averages component
 *
 * @param start start date
 * @param end end date
 * @param isWin should shows wins or losses
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceAveragesCard({start = '', end = '', isWin = false}: { start: string, end: string, isWin: boolean }) {

    const [isLoading, setIsLoading] = useState(false)
    const [average, setAverage] = useState({})

    useEffect(() => {
        getAverage()
    }, [start, end, isWin])


    //  GENERAL FUNCTIONS

    /**
     * API call to fetch average data
     */
    async function getAverage() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Analysis.Average
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{win}', isWin.toString())
                .replace('{count}', '-1')
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAverage(response.data)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={(isWin ? 'Win' : 'Loss') + ' Averages'}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<PerformanceAverages key={0} averages={average} isWin={isWin} />]}
                hasError={emptyObject(average)}
            />
        </>
    )
}

export default PerformanceAveragesCard;