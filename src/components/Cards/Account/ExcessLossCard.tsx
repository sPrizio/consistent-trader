import BaseCard from "../BaseCard";
import ExcessLoss from "../../Account/ExcessLoss";
import {useEffect, useState} from "react";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData, {emptyObject} from "../../../services/data/DataIntegrityService";
import {formatDate} from "../../../services/datetime/DateTimeService";

/**
 * Card representing the excess loss information
 *
 * @param start start date
 * @param end end date
 * @author Stephen Prizio
 * @version 1.0
 */
function ExcessLossCard({start = '', end = ''} : {start: string, end: string}) {

    const [isLoading, setIsLoading] = useState(false)
    const [lossInfo, setLossInfo] = useState({})

    useEffect(() => {
        getLossInfoData()
    }, [start, end])


    //  GENERAL FUNCTIONS

    /**
     * Obtains the loss info
     */
    function getLossInfoData() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.Account.LossInfo
                    .replace('{start}', start)
                    .replace('{end}', end)
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setLossInfo(response.data)
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
                title={'Loss Quality'}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[<ExcessLoss key={0} lossInfo={lossInfo}/>]}
                hasError={emptyObject(lossInfo)}
            />
        </>
    )
}

export default ExcessLossCard;