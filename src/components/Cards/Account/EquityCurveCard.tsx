import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import {PeriodType, ProfitCurveInfo, StandardJsonResponse} from "../../../types/types";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import hasData from "../../../services/data/DataIntegrityService";
import moment from "moment";
import EquityCurve from "../../Account/EquityCurve";

/**
 * Card to display the account's profit curve, equity change over time
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function EquityCurveCard({period = 6, periodType = PeriodType.MONTHS} : {period: number, periodType: any}) {

    const [isLoading, setIsLoading] = useState(false)
    const [profitCurveInfo, setProfitCurveInfo] = useState<ProfitCurveInfo>({})

    useEffect(() => {
        getProfitCurveData()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Obtains the account overview for use with the overview page
     */
    function getProfitCurveData() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.Account.EquityCurve
                    .replace('{start}', moment().subtract((period - 1), periodType.unit.toLowerCase()).startOf(periodType.unit.toLowerCase()).format(CoreConstants.DateTime.ISODateFormat))
                    .replace('{end}', moment().add(1, periodType.unit.toLowerCase()).startOf(periodType.unit.toLowerCase()).add(1, 'days').format(CoreConstants.DateTime.ISODateFormat))
                    .replace('{interval}', periodType.key.toUpperCase())
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setProfitCurveInfo({
                    points: response.data
                })
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
                title={'Account Growth'}
                subtitle={'Last ' + period + ' ' + periodType.label}
                hasBorder={false}
                content={[<EquityCurve key={0} profitCurveInfo={profitCurveInfo} aggregateInterval={periodType} />]}
            />
        </>
    )
}

export default EquityCurveCard;