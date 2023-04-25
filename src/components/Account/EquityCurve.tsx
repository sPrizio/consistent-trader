import {ProfitCurveInfo} from "../../types/types";
import {Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatNumberForDisplay} from "../../services/data/FormattingService";
import moment from "moment";

function EquityCurve({profitCurveInfo = {}}: { profitCurveInfo: ProfitCurveInfo }) {


    //  GENERAL FUNCTIONS

    /**
     * Formats the y-axis depending on the value
     *
     * @param value y-axis value (here it would be account balance / value)
     */
    function formatYAxisTicks(value: any) {
        if (value >= 1000) {
            return (value / 1000.0) + 'K'
        } else if (value >= 1000000) {
            return (value / 1000000.0) + 'M'
        }

        return value
    }


    //  RENDER

    let emptyText = null
    if (!profitCurveInfo || !profitCurveInfo.points || profitCurveInfo.points.length === 0) {
        return (
            <div className="ct-equity-curve">
                <p>At this moment, your account has not changed. Once you start trading, check back here!</p>
            </div>
        )
    }

    return (
        <div className="ct-equity-curve">
            {emptyText}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <ComposedChart data={profitCurveInfo.points}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="25%"
                                      stopColor={CoreConstants.CssConstants.ProfitCurvePrimary}
                                      stopOpacity={0.2}/>
                                <stop offset="95%" stopColor={CoreConstants.CssConstants.White}
                                      stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid horizontal={false} vertical={false}/>
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => moment(value).format(CoreConstants.DateTime.ISOShortMonthFormat)}
                        />
                        <YAxis tickFormatter={(value) => formatYAxisTicks(value)}/>
                        <Tooltip
                            labelFormatter={(value) => moment(value).format(CoreConstants.DateTime.ISOMonthYearFormat)}
                            formatter={(value) => formatNumberForDisplay(parseFloat(value.toString()))}
                        />
                        <Area type="monotone" name="Value" dataKey="value"
                              stroke={CoreConstants.CssConstants.ProfitCurvePrimary} fillOpacity={1}
                              fill="url(#colorUv)" strokeWidth={3}/>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default EquityCurve;