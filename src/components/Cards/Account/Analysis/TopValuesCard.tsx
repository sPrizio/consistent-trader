import {useEffect, useState} from "react";
import BaseCard from "../../BaseCard";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import get from "../../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData, {emptyObject} from "../../../../services/data/DataIntegrityService";
import TopValues from "../../../Account/Analysis/TopValues";

/**
 * Card that renders the top values component
 *
 * @param count how many values to show
 * @param sortByLosses sort by largest values (positive or negative) a.k.a sort direction
 * @param start start date
 * @param end end date
 * @param title title
 * @param sort value to sort by
 * @param dataKey values to show
 * @author Stephen Prizio
 * @version 1.0
 */
function TopValuesCard(
    {
        count = 0,
        sortByLosses = false,
        start = '',
        end = '',
        title = '',
        sort = '',
        dataKey = ''
    } : {
        count: number,
        sortByLosses: boolean,
        start: string,
        end: string,
        title: string,
        sort: string,
        dataKey: string
    }
) {

    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState([])

    useEffect(() => {
        getValues()
    }, [start, end, dataKey])


    //  GENERAL FUNCTIONS

    /**
     * API call to fetch the top values
     */
    async function getValues() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Analysis.TopTrades
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{sort}', sort)
                .replace('{sortByLosses}', sortByLosses.toString())
                .replace('{count}', count.toString())
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setValues(response.data)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={title + (sortByLosses ? ' Lost' : ' Gained')}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<TopValues key={0} values={values} dataKey={dataKey} />]}
                hasError={emptyObject(values)}
            />
        </>
    )
}

export default TopValuesCard;