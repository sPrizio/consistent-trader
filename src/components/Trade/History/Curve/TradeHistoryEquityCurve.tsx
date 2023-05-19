import {CoreConstants} from "../../../../constants/CoreConstants";
import {formatNumberForDisplay} from "../../../../services/data/FormattingService";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import {Area, CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

/**
 * Defines a custom tooltip for use with the equity curve
 *
 * @param active is active
 * @param payload data
 * @param label label
 */
const CustomTooltip = ({active, payload, label}: { active: boolean, payload: any, label: string }) => {
    if (active && payload && payload.length && payload.length > 0) {
        return (
            <div className="ct-equity-curve__tooltip">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-equity-curve__tooltip__header">Time:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-equity-curve__tooltip__value">{formatDate(payload[0].payload.x, CoreConstants.DateTime.ISOShortTimeFormat)}</h5>
                            </div>
                        </div>
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-6">
                                <h5 className="ct-equity-curve__tooltip__header">Points:</h5>
                            </div>
                            <div className="column is-6 has-text-right">
                                <h5 className="ct-equity-curve__tooltip__value">{formatNumberForDisplay(payload[0].payload.y)}</h5>
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
 * Component that renders an equity curve for trade history throughout a session
 *
 * @param points data points
 * @param index list index
 * @param height chart height
 * @param showXAxis should show x-axis
 * @param showYAxis should show y-axis
 * @param showTooltip should show tooltip
 * @author Stephen Prizio
 * @version 1.0
 */
export function TradeHistoryEquityCurve(
    {
        points = [],
        index = -1,
        height = 125,
        showXAxis = false,
        showYAxis = false,
        showTooltip = false,
    }: {
        points: Array<any>,
        index: number,
        height: number,
        showXAxis: boolean,
        showYAxis: boolean,
        showTooltip: boolean,
    }) {


    //  GENERAL FUNCTION

    /**
     * Utility function to compute the dynamic gradient depending on the values being below or above 0
     */
    function computeGradientOffset() {
        const tempPoints = points
        const min = Math.min(...tempPoints.map(i => i.y))
        const max = Math.max(...tempPoints.map(i => i.y))
        const ratio = Math.round((max / (Math.abs(min) + max)) * 100.0)

        return ratio + '%'
    }

    /**
     * Computes a dynamic x-axis label depending on the value (formats to ISO Time)
     *
     * @param value datetime value
     */
    function computeXAxisLabel(value: string) {
        return formatDate(value, CoreConstants.DateTime.ISOShortTimeFormat);
    }


    //  RENDER

    let tooltip = null
    if (showTooltip) {
        // @ts-ignore
        tooltip = <Tooltip content={CustomTooltip} />
    }

    return (
        <>
            <div className="ct-equity-curve">
                <ResponsiveContainer width="100%" height={height}>
                    <ComposedChart data={points}>
                        <defs>
                            <linearGradient id={"split_" + index} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={CoreConstants.CssConstants.EquityCurveGreen} stopOpacity={0.75} />
                                <stop offset={computeGradientOffset()} stopColor={CoreConstants.CssConstants.White} stopOpacity={0.75} />
                                <stop offset="100%" stopColor={CoreConstants.CssConstants.EquityCurveRed} stopOpacity={0.75} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} vertical={false}/>
                        <XAxis hide={!showXAxis} dataKey="x" tickLine={true} tickFormatter={computeXAxisLabel} />
                        <YAxis hide={!showYAxis} tickLine={true} label={{ value: 'Points', angle: -90, position: 'insideLeft' }} />
                        <ReferenceLine
                            y={0}
                            stroke={"rgba(215, 215, 215, 0.5)"}
                            /*label={{position: 'insideTopRight', value: 'Break-even', fill: 'red', fontSize: 10}}*/
                        />
                        {tooltip}
                        <Area
                            type="monotone"
                            name="Net"
                            dataKey="y"
                            stroke="rgba(105, 108, 255, 0.35)"
                            fillOpacity={1.0}
                            fill={"url(#split_" + index + ")"}
                            strokeWidth={2}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default TradeHistoryEquityCurve;