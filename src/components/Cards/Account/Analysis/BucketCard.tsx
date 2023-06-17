import {useEffect, useState} from "react";
import BaseCard from "../../BaseCard";
import {Bar, CartesianGrid, ComposedChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CoreConstants} from "../../../../constants/CoreConstants";
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
const CustomTooltip = ({active, payload, label}: { active: boolean, payload: any, label: string }, isLoser: boolean) => {
    if (active && payload && payload.length && payload.length > 0) {
        return (
            <div className="ct-chart-tooltip">
                <div className="card">
                    <div className="card-content">
                        <div className="columns is-multiline is-mobile is-gapless">
                            <div className="column is-12 has-text-centered">
                                <h5 className="ct-chart-tooltip__header">
                                    {
                                        isLoser ?
                                            (payload[0].payload.end * -1) + ' - ' + (payload[0].payload.start * -1)
                                            :
                                            payload[0].payload.start + ' - ' + payload[0].payload.end
                                    }&nbsp;points
                                </h5>
                            </div>
                            <div className="column is-12 has-text-centered">
                                <h5 className="ct-chart-tooltip__value">
                                    {
                                        payload[0].payload.count === 1 ?
                                            payload[0].payload.count + ' Day' :
                                            payload[0].payload.count + ' Days'
                                    }
                                </h5>
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
 * Card that renders a bucket graph
 *
 * @param start start date
 * @param end end date
 * @param bucketSize bucket size
 * @param isLoser should consider losers or winners
 * @author Stephen Prizio
 * @version 1.0
 */
function BucketCard({start = '', end = '', bucketSize = -1, isLoser = false}: { start: string, end: string, bucketSize: number, isLoser: boolean }) {

    const [isLoading, setIsLoading] = useState(false)
    const [buckets, setBuckets] = useState([])
    const [statistics, setStatistics] = useState<any>({})

    useEffect(() => {
        getBuckets()
    }, [start, end, bucketSize])


    //  GENERAL FUNCTIONS

    function removeHyphen(val: string) {
        return val.replaceAll(/-(?=\d)/g, '').trim()
    }

    function xAxisTickFormatter(value: number) {
        if (isLoser) {
            if ((value + bucketSize) >= 0) {
                return 0 + '-' + (bucketSize - (value + bucketSize))
            } else {
                return removeHyphen((value + bucketSize) + '-' + (value))
            }
        } else {
            return (value - bucketSize) + '-' + value
        }
    }

    async function getBuckets() {

        setIsLoading(true)

        const d = get(
            CoreConstants.ApiUrls.Analysis.WinningBuckets
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{bucketSize}', bucketSize.toString())
                .replace('{isLoser}', isLoser.toString())
        )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setBuckets(response.data.buckets)
                setStatistics(response.data.statistics)
            }
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    // @ts-ignore
    let tooltip = <Tooltip content={(val) => CustomTooltip(val, isLoser)}/>

    let content =
        <div>
            <div className="level is-mobile ct-header-level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-header-level__header">{isLoser ? 'Losing' : 'Winning'}&nbsp;Days</p>
                        <p className="ct-header-level__value">{statistics.count}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-header-level__header">Average</p>
                        <p className="ct-header-level__value">{statistics.average}</p>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={buckets}>
                    <CartesianGrid horizontal={false} vertical={false}/>
                    <XAxis dataKey={isLoser ? "start" : "end"} tickFormatter={(value) => xAxisTickFormatter(value)}/>
                    <YAxis dataKey="count"/>
                    {tooltip}
                    <Bar dataKey="count" stackId="1" fill={CoreConstants.CssConstants.BucketBarColor}/>
                    <ReferenceLine
                        x={statistics.average}
                        fill={CoreConstants.CssConstants.RedCandleColor}
                        stroke={CoreConstants.CssConstants.RedCandleColor}
                        strokeWidth={2}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>


    let title = (isLoser ? 'Losing' : 'Winning') + ' Days Breakdown'
    let subtitle = bucketSize + '-point gaps'

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={title}
                subtitle={subtitle}
                hasBorder={true}
                content={[content]}
                hasError={emptyObject(statistics)}
            />
        </>
    )
}

export default BucketCard;