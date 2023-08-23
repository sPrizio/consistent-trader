import {sanitizeText, tradeDuration} from "../../../services/data/FormattingService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {TopValueInfo} from "../../../types/api-types";
import {formatDate} from "../../../services/datetime/DateTimeService";

/**
 * Component that renders the top values
 *
 * @param values values info
 * @param dataKey type of data to show
 * @author Stephen Prizio
 * @version 1.0
 */
function TopValues({values = [], dataKey = ''}: {values: Array<TopValueInfo>, dataKey: string}) {


    //  RENDER

    return (
        <div className="ct-top-values">
            <div className="columns is-multiline is-mobile">
                {
                    values?.map((item, key) => {
                        // @ts-ignore
                        let dk = item[dataKey]
                        return (
                            <div className="column is-12 performance-statistics-entry" key={key}>
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-8">
                                        <h6 className="ct-top-values__sub-header">{formatDate(item.tradeCloseTime ?? '', CoreConstants.DateTime.ISOShortMonthFullDayFormat)}</h6>
                                        <h5 className="ct-top-values__header">{sanitizeText(item.product ?? '')}</h5>
                                        <h6 className="ct-top-values__sub-header">
                                            Duration: {tradeDuration(item.tradeDuration ?? 0)}
                                        </h6>
                                    </div>
                                    <div className="column is-4 has-text-right">
                                        <h5 className="ct-top-values__value">{dk}</h5>
                                        <h6 className="ct-top-values__sub-header">{item.lotSize}&nbsp;pts</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }) ?? null
                }
            </div>
        </div>
    )
}

export default TopValues;