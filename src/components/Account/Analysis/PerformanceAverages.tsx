import {PerformanceAveragesInfo} from "../../../types/api-types";
import {formatNumberForDisplay, tradeDuration} from "../../../services/data/FormattingService";

/**
 * Component that renders the performance averages
 *
 * @param averages average data
 * @param isWin refers to winners or losers
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceAverages({averages = {}, isWin = false}: { averages: PerformanceAveragesInfo, isWin: boolean }) {


    //  RENDER

    return (
        <div className="ct-performance-averages">
            <div className="columns is-multiline is-mobile">
                <div className="column is-12 performance-statistics-entry">
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-8">
                            <h5 className="ct-performance-averages__header">Average Points</h5>
                            <h6 className="ct-performance-averages__sub-header">Total
                                Points:&nbsp;{formatNumberForDisplay(averages.totalPips ?? 0)}</h6>
                        </div>
                        <div className="column is-4 has-text-right">
                            <h5 className="ct-performance-averages__value">
                                {formatNumberForDisplay(averages.averagePips ?? 0)}
                            </h5>
                            <h6 className="ct-performance-averages__sub-header">Average
                                Size:&nbsp;{formatNumberForDisplay(averages.averageLotSize ?? 0)}&nbsp;pts</h6>
                        </div>
                    </div>
                </div>
                <div className="column is-12 performance-statistics-entry">
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-8">
                            <h5 className="ct-performance-averages__header">
                                Average&nbsp;{isWin ? 'Win' : 'Loss'}&nbsp;Percentage
                            </h5>
                            <h6 className="ct-performance-averages__sub-header">
                                {formatNumberForDisplay(averages.tradingRate ?? 0)}&nbsp;{isWin ? 'wins' : 'losses'}&nbsp;per
                                day
                            </h6>
                        </div>
                        <div className="column is-4 has-text-right">
                            <h5 className="ct-performance-averages__value">
                                {averages.winLossPercentage}%
                            </h5>
                            <h6 className="ct-performance-averages__sub-header">
                                {averages.numberOfWinLosses} {isWin ? 'wins' : 'losses'}&nbsp;of {averages.totalTrades} trades
                            </h6>
                        </div>
                    </div>
                </div>
                {
                    isWin ?
                        <div className="column is-12 performance-statistics-entry">
                            <div className="columns is-multiline is-mobile is-vcentered">
                                <div className="column is-8">
                                    <h5 className="ct-performance-averages__header">Profitability</h5>
                                </div>
                                <div className="column is-4 has-text-right">
                                    <h5 className="ct-performance-averages__value">
                                        {formatNumberForDisplay(averages.profitability ?? 0)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        : null
                }
                <div className="column is-12 performance-statistics-entry">
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-8">
                            <h5 className="ct-performance-averages__header">Average Duration</h5>
                            <h6 className="ct-performance-averages__sub-header">Format [hours : minutes : seconds]</h6>
                        </div>
                        <div className="column is-4 has-text-right">
                            <h5 className="ct-performance-averages__value">
                                {tradeDuration(averages.averageTradeDuration ?? 0)}
                            </h5>
                            <h6 className="ct-performance-averages__sub-header">Average: {tradeDuration(averages.totalAverageDuration ?? 0)}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceAverages;