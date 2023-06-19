import {useEffect, useState} from "react";
import BaseCard from "../../BaseCard";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {Bar, CartesianGrid, Cell, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {displayString, formatNumberForDisplay} from "../../../../services/data/FormattingService";
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
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-8">
                                <h5 className="ct-chart-tooltip__header">Day of Week:</h5>
                            </div>
                            <div className="column is-4 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{displayString(payload[0].payload.dayOfWeek)}</h5>
                            </div>
                            <div className="column is-8">
                                <h5 className="ct-chart-tooltip__header">Points:</h5>
                            </div>
                            <div className="column is-4 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.total.pips)}</h5>
                            </div>
                            <div className="column is-8">
                                <h5 className="ct-chart-tooltip__header">Avg Points:</h5>
                            </div>
                            <div className="column is-4 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.total.averagePips)}</h5>
                            </div>
                            <div className="column is-8">
                                <h5 className="ct-chart-tooltip__header">P&L:</h5>
                            </div>
                            <div className="column is-4 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.total.netProfit)}</h5>
                            </div>
                            <div className="column is-8">
                                <h5 className="ct-chart-tooltip__header">Avg P&L:</h5>
                            </div>
                            <div className="column is-4 has-text-right">
                                <h5 className="ct-chart-tooltip__value">{formatNumberForDisplay(payload[0].payload.total.averageProfit)}</h5>
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
 * Card that renders weekday performance
 *
 * @param start start date
 * @param end end date
 * @author Stephen Prizio
 * @version 1.0
 */
function WeekdayPerformanceCard({start = '', end = ''}: { start: string, end: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const [performance, setPerformance] = useState([])

    useEffect(() => {
        getPerformance()
    }, [start, end])


    //  GENERAL FUNCTIONS

    /**
     * Computes the fill of the bar depending on its value
     *
     * @param val value
     */
    function computeFill(val: any) {
        if (val.value > 0) {
            return CoreConstants.CssConstants.GreenBarColor
        } else if (val.value < 0) {
            return CoreConstants.CssConstants.RedBarColor
        }

        return CoreConstants.CssConstants.NeutralBarColor
    }

    /**
     * Api call to fetch performance data
     */
    async function getPerformance() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Analysis.WeekdayPerformance
                .replace('{start}', start)
                .replace('{end}', end)
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            const filtered = []

            for (const element of response.data) {
                for (let prop in element) {
                    filtered.push({
                        dayOfWeek: prop,
                        value: element[prop].averagePips,
                        total: element[prop]
                    })
                }
            }

            // @ts-ignore
            setPerformance(filtered)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    // @ts-ignore
    let tooltip = <Tooltip content={CustomTooltip}/>

    let content =
        <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={performance}>
                <CartesianGrid horizontal={false} vertical={false}/>
                <XAxis dataKey="dayOfWeek" tickFormatter={(value) => displayString(value)}/>
                <YAxis dataKey="value"/>
                {tooltip}
                <Bar dataKey="value" stackId="1">
                    {
                        performance.map((entry, index) => (
                            <Cell fill={computeFill(entry)} key={`cell-${index}`}/>
                        ))
                    }
                </Bar>
            </ComposedChart>
        </ResponsiveContainer>


    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Weekday Performance'}
                subtitle={formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                hasBorder={true}
                content={[content]}
                hasError={emptyObject(performance)}
            />
        </>
    )
}

export default WeekdayPerformanceCard;