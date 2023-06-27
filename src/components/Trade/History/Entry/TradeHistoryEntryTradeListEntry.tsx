import {displayString, formatNumberForDisplay, sanitizeText} from "../../../../services/data/FormattingService";
import {BsArrowDownRightCircleFill, BsArrowUpRightCircleFill} from "react-icons/bs";
import {formatDate} from "../../../../services/datetime/DateTimeService";
import {CoreConstants} from "../../../../constants/CoreConstants";

/**
 * Component that renders a trade in a list of trades for a trade session
 *
 * @param index trade #
 * @param openTime trade open time
 * @param closeTime trade close time
 * @param entryPrice trade entry price
 * @param exitPrice trade exit price
 * @param tradeType trade type
 * @param symbol trade product / ticker
 * @param size trade size (aka lot size)
 * @param tradeId trade id
 * @param netProfit net profit (or loss) of trade
 * @param pips net points (raw gain or loss)
 * @param key trade key
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEntryTradeListEntry(
    {
        index = -1,
        openTime = '',
        closeTime = '',
        entryPrice = -1,
        exitPrice = -1,
        tradeType = '',
        symbol = '',
        size = -1,
        tradeId = '',
        netProfit = -1,
        pips = -1,
        key = -1,
    }: {
        index: number,
        openTime: string,
        closeTime: string,
        entryPrice: number,
        exitPrice: number,
        tradeType: string,
        symbol: string,
        size: number,
        tradeId: string,
        netProfit: number,
        pips: number,
        key: number,
    }) {


    //  GENERAL FUNCTIONS

    function getTradeTypeClass() {
        return displayString(tradeType).toLowerCase()
    }


    //  RENDER

    return (
        <tr className="hide-lines">
            <td className="has-text-centered is-vcentered">
                {index + 1}
            </td>
            <td className="has-text-centered is-vcentered">
                <div className={'test'}>
                    <span className={"icon " + (getTradeTypeClass())}>
                    {
                        tradeType === 'BUY' ?
                            <BsArrowUpRightCircleFill/>
                            :
                            <BsArrowDownRightCircleFill/>
                    }
                    </span>
                </div>
            </td>
            <td className="has-text-centered is-vcentered">
                {formatDate(openTime, CoreConstants.DateTime.ISOShortTimeFormat)}
            </td>
            <td className="has-text-centered is-vcentered">
                {formatNumberForDisplay(entryPrice)}
            </td>
            <td className="has-text-centered is-vcentered">
                {formatDate(closeTime, CoreConstants.DateTime.ISOShortTimeFormat)}
            </td>
            <td className="has-text-centered is-vcentered">
                {formatNumberForDisplay(exitPrice)}
            </td>
            <td className="has-text-centered is-vcentered">
                {sanitizeText(symbol)}
            </td>
            <td className="has-text-centered is-vcentered">
                {formatNumberForDisplay(size)}
            </td>
            <td className="has-text-centered is-vcentered">
                {formatNumberForDisplay(netProfit)}
            </td>
            <td className="has-text-centered is-vcentered">
                {
                    netProfit < 0 ?
                        '(' + formatNumberForDisplay(pips) + ')'
                        :
                        formatNumberForDisplay(pips)
                }
            </td>
        </tr>
    )
}

export default TradeHistoryEntryTradeListEntry;