import {TradeRecordStatisticsInfo} from "../../../../types/api-types";
import PerformanceStatisticsEntry from "./PerformanceStatisticsEntry";

/**
 * Component representing performance statistics for a given time period
 *
 * @param statisticsInfo stats info
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceStatistics({statisticsInfo = {}}: { statisticsInfo: TradeRecordStatisticsInfo }) {


    //  RENDER

    return (
        <div className="ct-performance-statistics">
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-12">
                    <PerformanceStatisticsEntry
                        label={'Biggest Win'}
                        delta={statisticsInfo.largestWinDelta ?? 0}
                        value={statisticsInfo.largestWinAmount ?? 0}
                        valuePercentage={statisticsInfo.largestWinSize ?? 0}
                        sentiment={"positive"}
                    />
                </div>
                <div className="column is-12">
                    <PerformanceStatisticsEntry
                        label={'Average Win'}
                        delta={statisticsInfo.averageWinDelta ?? 0}
                        value={statisticsInfo.averageWinAmount ?? 0}
                        valuePercentage={statisticsInfo.averageWinSize ?? 0}
                        sentiment={"positive"}
                    />
                </div>
                <div className="column is-12">
                    <PerformanceStatisticsEntry
                        label={'Biggest Loss'}
                        delta={statisticsInfo.largestLossDelta ?? 0}
                        value={statisticsInfo.largestLossAmount ?? 0}
                        valuePercentage={statisticsInfo.largestLossSize ?? 0}
                        sentiment={"negative"}
                    />
                </div>
                <div className="column is-12">
                    <PerformanceStatisticsEntry
                        label={'Average Loss'}
                        delta={statisticsInfo.averageLossDelta ?? 0}
                        value={statisticsInfo.averageLossAmount ?? 0}
                        valuePercentage={statisticsInfo.averageLossSize ?? 0}
                        sentiment={"negative"}
                    />
                </div>
            </div>
        </div>
    )
}

export default PerformanceStatistics;