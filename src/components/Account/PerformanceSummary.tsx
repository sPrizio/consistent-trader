import {PerformanceSummaryInfo} from "../../types/api-types";
import {formatNumberForDisplay} from "../../services/data/FormattingService";

/**
 * Component for the performance summary information, meant to show basic performance data like points earned, net profit, etc.
 *
 * @props performanceSummary performance summary type
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceSummary({performanceSummary = {}} : {performanceSummary : PerformanceSummaryInfo}) {


    //  RENDER

    return (
        <div className="ct-performance-summary">
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-performance-summary__title">Trades</p>
                        <p className="ct-performance-summary__value">{performanceSummary?.statistics?.numberOfTrades ?? 0}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-performance-summary__title">Trading Rate</p>
                        <p className="ct-performance-summary__value">{performanceSummary?.statistics?.tradingRate ?? 0}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-performance-summary__title">Win %</p>
                        <p className="ct-performance-summary__value">{performanceSummary?.statistics?.winPercentage ?? 0}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-performance-summary__title">P & L</p>
                        <p className="ct-performance-summary__value">{formatNumberForDisplay(performanceSummary?.statistics?.netProfit ?? 0)}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="ct-performance-summary__title">Points</p>
                        <p className="ct-performance-summary__value">{formatNumberForDisplay(performanceSummary?.statistics?.netPips ?? 0)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PerformanceSummary;