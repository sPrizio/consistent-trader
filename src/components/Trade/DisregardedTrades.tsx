import {DisregardedTradesInfo} from "../../types/api-types";
import {formatNumberForDisplay} from "../../services/data/FormattingService";

/**
 * Component that renders disregarded trades, trades that were marked as irrelevant from the account
 *
 * @param disregardedTrades disregarded trades info
 * @author Stephen Prizio
 * @version 1.0
 */
function DisregardedTrades({disregardedTrades = {}}: {disregardedTrades: DisregardedTradesInfo}) {


    //  RENDER

    return (
        <div className="ct-disregarded-trades">
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-6">
                    <h5 className="header">Trades</h5>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="value">{disregardedTrades.current?.totalTrades ?? 0}</span>
                    <h6 className="sub-header">{disregardedTrades.current?.winningTrades ?? 0} wins ({disregardedTrades.current?.winPercentage ?? 0}%)</h6>
                </div>
                <div className="column is-6">
                    <h5 className="header">P&L</h5>
                    <h6 className="sub-header">Previous Month:</h6>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="value">{formatNumberForDisplay(disregardedTrades.current?.netProfit ?? 0)}</span>
                    <h6 className="sub-header">
                        {formatNumberForDisplay(disregardedTrades.previous?.netProfit ?? 0)}
                    </h6>
                </div>
                <div className="column is-6">
                    <h5 className="header">Points</h5>
                    <h6 className="sub-header">Previous Month:</h6>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="value">{formatNumberForDisplay(disregardedTrades.current?.netPoints ?? 0)}</span>
                    <h6 className="sub-header">
                        {formatNumberForDisplay(disregardedTrades.previous?.netPoints ?? 0)} pts
                    </h6>
                </div>
            </div>
        </div>
    )
}

export default DisregardedTrades;