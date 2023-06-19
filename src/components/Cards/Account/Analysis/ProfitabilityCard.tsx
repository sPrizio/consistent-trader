import BaseCard from "../../BaseCard";
import {formatDateMoment, getDateForFormat} from "../../../../services/datetime/DateTimeService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {useEffect, useState} from "react";
import {formatNumberForDisplay} from "../../../../services/data/FormattingService";
import {Bar, CartesianGrid, Cell, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import get from "../../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData, {emptyObject} from "../../../../services/data/DataIntegrityService";

/**
 * Defines a custom tooltip for use with the chart
 *
 * @param active is active
 * @param payload data
 * @param label label
 */
const CustomTooltip = ({active, payload, label}: { active: boolean, payload: any, label: string }) => {
    if (active && payload && payload.length && payload.length > 0) {
        return (
            <div className="ct-chart-tooltip">
                <div className="card" style={{minWidth: "200px"}}>
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-gapless">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">Time:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">
                                    {formatDateMoment(getDateForFormat(payload[0].payload.start, CoreConstants.DateTime.ISOTimeFormat), CoreConstants.DateTime.ISOShortTimeFormat)}
                                    -
                                    {formatDateMoment(getDateForFormat(payload[0].payload.end, CoreConstants.DateTime.ISOTimeFormat), CoreConstants.DateTime.ISOShortTimeFormat)}
                                </h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">Win&nbsp;%:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{payload[0].payload.winPercentage}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">Wins:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{payload[0].payload.winningTrades}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">Losses:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{payload[0].payload.losingTrades}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">Points:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.pips)}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-chart-tooltip__header">P&L:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.netProfit)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

/**
 * Card that renders the profitability based on the dates and per unit of time
 *
 * @param start start date
 * @param end end date
 * @param code unit of time
 * @author Stephen Prizio
 * @version 1.0
 */
function ProfitabilityCard({start = '', end = '', code = ''}: { start: string, end: string, code: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const [bucket, setBucket] = useState([])

    useEffect(() => {
        getBucket()
    }, [start, end, code])


    //  GENERAL FUNCTIONS

    /**
     * Computes the fill of the bar depending on the value
     *
     * @param val value
     * @param isLoser flag to compare loser or winner value
     */
    function computeFill(val: any, isLoser: boolean) {
        if (isLoser && val.pipsEarned > val.pipsLost) {
            return CoreConstants.CssConstants.FadedBarColor
        } else if (isLoser && val.pipsLost > val.pipsEarned) {
            return CoreConstants.CssConstants.RedBarColor
        }

        if (!isLoser && val.pipsEarned > val.pipsLost) {
            return CoreConstants.CssConstants.GreenBarColor
        } else if (!isLoser && val.pipsLost > val.pipsEarned) {
            return CoreConstants.CssConstants.FadedBarColor
        }

        return CoreConstants.CssConstants.NeutralBarColor
    }

    /**
     * API call to get data
     */
    async function getBucket() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Analysis.Bucket
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{bucket}', code)
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setBucket(response.data)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    // @ts-ignore
    let tooltip = <Tooltip content={CustomTooltip}/>

    let content =
        <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={bucket}>
                <CartesianGrid horizontal={false} vertical={false}/>
                <XAxis dataKey="start"
                       tickFormatter={(value) => formatDateMoment(getDateForFormat(value, CoreConstants.DateTime.ISOShortHourFormat), CoreConstants.DateTime.ISOShortTimeFormat)}/>
                <YAxis/>
                {tooltip}
                <Bar dataKey="pipsEarned" stackId="1">
                    {
                        bucket.map((entry, index) => (
                            <Cell fill={computeFill(entry, false)} key={`cell-${index}`}/>
                        ))
                    }
                </Bar>
                <Bar dataKey="pipsLost" stackId="1">
                    {
                        bucket.map((entry, index) => (
                            <Cell fill={computeFill(entry, true)} key={`cell-${index}`}/>
                        ))
                    }
                </Bar>
            </ComposedChart>
        </ResponsiveContainer>

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Profitability'}
                subtitle={'5-minute Intervals'}
                hasBorder={true}
                content={[content]}
                hasError={emptyObject(bucket)}
            />
        </>
    )
}

export default ProfitabilityCard;