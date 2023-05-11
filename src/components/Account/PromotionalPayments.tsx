import {formatDate} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatNumberForDisplay} from "../../services/data/FormattingService";
import {PromotionalPaymentsInfo} from "../../types/api-types";

/**
 * Component that renders promotional payments, payments meant to write-off losses
 *
 * @param promoPayments promo payment data
 * @author Stephen Prizio
 * @version 1.0
 */
function PromotionalPayments({promoPayments = {}}: {promoPayments: PromotionalPaymentsInfo}) {


    //  GENERAL FUNCTIONS

    /**
     * Computes the date to display with a special format
     *
     * @param val date string
     */
    function dateDisplay(val: string) {
        if (!val || val.length === 0) {
            return 'Nothing recent'
        }

        const day = formatDate(val, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
        return (
            <span>
                {formatDate(val, CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>, {formatDate(val, CoreConstants.DateTime.ISOYearFormat)}
            </span>
        )
    }


    //  RENDER

    return (
        <div className="ct-promotional-payments">
            <div className="container">
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-6">
                        Promo Payments
                    </div>
                    <div className="column is-6 has-text-right">
                        <span className="ct-promotional-payments__value">
                            {formatNumberForDisplay(promoPayments.total ?? 0)}
                        </span>
                        <h6 className="ct-promotional-payments__sub-header">
                            {promoPayments.numberOfPayments} payments
                        </h6>
                    </div>
                    <div className="column is-6">
                        Last Payment Date
                    </div>
                    <div className="column is-6 has-text-right">
                        {dateDisplay(promoPayments.lastPaymentDate ?? '')}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionalPayments;