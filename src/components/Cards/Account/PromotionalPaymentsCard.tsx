import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData from "../../../services/data/DataIntegrityService";
import PromotionalPayments from "../../Account/PromotionalPayments";

/**
 * Card that renders the promotional payments component
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function PromotionalPaymentsCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [promoPayments, setPromoPayments] = useState({})

    useEffect(() => {
        getPromotionalPayments()
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Api call to obtain promotion payment information
     */
    function getPromotionalPayments() {

        setIsLoading(true);

        const d =
            get(CoreConstants.ApiUrls.Account.PromoPayments)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setPromoPayments(
                    response.data
                )
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }

    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Promotional Payments'}
                subtitle={'Remember the Journey'}
                hasBorder={true}
                content={[<PromotionalPayments key={0} promoPayments={promoPayments} />]}
            />
        </>
    )
}

export default PromotionalPaymentsCard;