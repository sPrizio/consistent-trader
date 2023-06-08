import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import {ProfitCurveInfo, StandardJsonResponse} from "../../../types/api-types";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import hasData, {emptyObject} from "../../../services/data/DataIntegrityService";
import EquityCurve from "../../Account/EquityCurve";
import {PeriodType} from "../../../types/ui-types";

/**
 * Card to display the account's profit curve, equity change over time
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function EquityCurveCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [profitCurveInfo, setProfitCurveInfo] = useState<ProfitCurveInfo>({})
    const [period, setPeriod] = useState(5)
    const [periodType, setPeriodType] = useState(PeriodType.DAYS)

    useEffect(() => {
        getProfitCurveData()
    }, [period, periodType])


    //  HANDLER FUNCTIONS

    /**
     * Handles selecting a new tab
     *
     * @param period period amount
     * @param periodType type of period
     */
    function changeTab(period: number, periodType: any) {
        setPeriod(period)
        setPeriodType(periodType)
    }


    //  GENERAL FUNCTIONS

    /**
     * Obtains the account overview for use with the overview page
     */
    function getProfitCurveData() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.Account.EquityCurve
                    .replace('{interval}', periodType.key.toUpperCase())
                    .replace('{count}', period.toString())
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setProfitCurveInfo({
                    points: response.data.reverse()
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
                title={'Equity'}
                subtitle={'Last ' + period + ' ' + periodType.label}
                hasBorder={true}
                content={[<EquityCurve key={0} profitCurveInfo={profitCurveInfo} aggregateInterval={periodType} fetchHandler={changeTab} />]}
                hasError={emptyObject(profitCurveInfo)}
            />
        </>
    )
}

export default EquityCurveCard;