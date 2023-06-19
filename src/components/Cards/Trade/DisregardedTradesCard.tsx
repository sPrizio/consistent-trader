import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import {formatDate, formatDateMoment, now} from "../../../services/datetime/DateTimeService";
import {CoreConstants} from "../../../constants/CoreConstants";
import get from "../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData, {emptyObject} from "../../../services/data/DataIntegrityService";
import DisregardedTrades from "../../Trade/DisregardedTrades";

/**
 * Card that displays the disregarded trades component
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function DisregardedTradesCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [start, setStart] = useState(formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISODateFormat))
    const [end, setEnd] = useState(formatDateMoment(now().startOf('month').add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
    const [disregardedTrades, setDisregardedTrades] = useState({})

    useEffect(() => {
        getDisregardedTrades()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * API call to get the disregarded trades content
     */
    async function getDisregardedTrades() {

        setIsLoading(true);

        const d =
            await get(CoreConstants.ApiUrls.Analysis.IrrelevantTrades
                .replace('{start}', start)
                .replace('{end}', end)
            )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setDisregardedTrades(
                response.data
            )
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Disregarded Trades'}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<DisregardedTrades key={0} disregardedTrades={disregardedTrades} />]}
                hasError={emptyObject(disregardedTrades)}
            />
        </>
    )
}

export default DisregardedTradesCard;