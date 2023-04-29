import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate} from "../../../services/datetime/DateTimeService";

/**
 * Component representing an entry in a trade log list
 *
 * @param format date format
 * @param date date
 * @param trades number of trades
 * @param winPercentage win percentage
 * @param netProfit P&L
 * @param netPips net points
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeLongEntry(
    {
        format = '',
        date = '',
        trades = 0,
        winPercentage = 0,
        netProfit = 0,
        netPips = 0
    }
        : {
        format: string,
        date: string,
        trades: number,
        winPercentage: number,
        netProfit: number,
        netPips: number,
    }
) {


    //  GENERAL FUNCTIONS

    /**
     * Defines a custom date format to display
     */
    function dateDisplay() {
        let dateDisplay = <span className="ct-trade-log__entry__value__date">{formatDate(date, format)}</span>
        if (format === 'MMMM Do') {
            const day = formatDate(date, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
            dateDisplay =
                <div className="ct-trade-log__entry__value__date">
                    <span className="month">{formatDate(date, CoreConstants.DateTime.ISOMonthFormat)}</span>
                    <br/>
                    <span className="day">
                        {day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>
                    </span>
                </div>
        }

        return dateDisplay;
    }

    return (
        <tr className="ct-trade-log__entry">
            <td className="ct-trade-log__entry__value has-text-left">
                {dateDisplay()}
            </td>
            <td className="ct-trade-log__entry__value has-text-centered is-vcentered">{trades}</td>
            <td className="ct-trade-log__entry__value has-text-centered is-vcentered">{winPercentage}</td>
            <td className="ct-trade-log__entry__value has-text-centered is-vcentered">
                <div>
                    {formatNumberForDisplay(netProfit)}
                </div>
            </td>
            <td className="ct-trade-log__entry__value has-text-centered is-vcentered">
                {formatNumberForDisplay(netPips)}
            </td>
        </tr>
    )
}

export default TradeLongEntry;