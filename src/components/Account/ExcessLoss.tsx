import {formatNumberForDisplay} from "../../services/data/FormattingService";
import {ExcessLossInfo} from "../../types/api-types";

/**
 * Component representing excess losses, looking at the amount of losses taken
 * that were not part of the plan
 *
 * @param lossInfo excess loss info
 * @author Stephen Prizio
 * @version 1.0
 */
function ExcessLoss({lossInfo = {}}: {lossInfo: ExcessLossInfo}) {


    //  GENERAL FUNCTIONS

    /**
     * Adjusts the display unit depending on incoming data
     *
     * @param val unit
     */
    function computeUnit(val: string) {
        if (val === 'PIPS') {
            return 'points'
        }

        return ''
    }


    //  RENDER

    return (
        <div className="ct-excess-loss">
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-6 has-text-left">
                    <h5 className="ct-excess-loss__header">Daily Limit</h5>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="ct-excess-loss__value">{lossInfo.limit}</span>
                    &nbsp;<span className="ct-excess-loss__unit">{computeUnit(lossInfo.type ?? '')}</span>
                </div>
                <div className="column is-6 has-text-left">
                    <h5 className="ct-excess-loss__header">Excess</h5>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="ct-excess-loss__value">{formatNumberForDisplay(lossInfo.excess ?? 0)}</span>
                    &nbsp;<span className="ct-excess-loss__unit">{computeUnit(lossInfo.type ?? '')}</span>
                </div>
                <div className="column is-6 has-text-left">
                    <h5 className="ct-excess-loss__header">Count</h5>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="ct-excess-loss__value">{lossInfo.occurrences}</span>
                    &nbsp;<span className="ct-excess-loss__unit">days</span>
                </div>
                <div className="column is-6 has-text-left">
                    <h5 className="ct-excess-loss__header">Adjusted Performance</h5>
                </div>
                <div className="column is-6 has-text-right">
                    <span className="ct-excess-loss__value">{formatNumberForDisplay(lossInfo.adjusted ?? 0)}</span>
                    &nbsp;<span className="ct-excess-loss__unit">{computeUnit(lossInfo.type ?? '')}</span>
                </div>
            </div>
        </div>
    )
}

export default ExcessLoss;