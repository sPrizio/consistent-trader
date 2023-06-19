import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData, {emptyObject} from "../../../services/data/DataIntegrityService";
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
    async function getPromotionalPayments() {

        setIsLoading(true);

        const d = await get(CoreConstants.ApiUrls.Account.PromoPayments)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setPromoPayments(
                response.data
            )
        }

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
                hasError={emptyObject(promoPayments)}
            />
        </>
    )
}

export default PromotionalPaymentsCard;