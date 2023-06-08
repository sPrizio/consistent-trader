import BaseCard from "../BaseCard";
import Overview from "../../Account/Overview";
import {AccountOverviewInfo, UserInfo} from "../../../types/api-types";
import {emptyObject} from "../../../services/data/DataIntegrityService";

/**
 * Card component representing an account overview
 *
 * @param accountOverview user info
 * @param isLoading loading flag
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewCard({accountOverview = {}, isLoading = false}: {accountOverview: AccountOverviewInfo, isLoading: boolean}) {


    //  RENDER

    const subtitle = `${accountOverview?.account?.broker ?? ''}\u00A0-\u00A0${accountOverview?.account?.accountNumber ?? ''}`
    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Overview & Rank'}
                subtitle={subtitle}
                hasBorder={true}
                content={[<Overview key={0} accountOverview={accountOverview ?? {}} />]}
                hasError={emptyObject(accountOverview)}
            />
        </>
    )
}

export default OverviewCard;