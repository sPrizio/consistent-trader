import {AccountOverview} from "../../../types/types";
import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import {TbTrendingDown, TbTrendingUp} from "react-icons/tb";
import AccountOverviewRank from "../../Rank/AccountOverviewRank";

/**
 * Component for displaying the account overview
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function OverviewCard({accountOverview = {}}: { accountOverview: AccountOverview }) {


    //  GENERAL FUNCTIONS

    function computeClass() {
        if (accountOverview?.dailyEarnings ?? -1 > 0) {
            return ' positive '
        } else if (accountOverview?.dailyEarnings ?? -1 < 0) {
            return ' negative '
        }

        return ''
    }


    //  RENDER

    let earnings = null
    if (accountOverview && accountOverview.dailyEarnings !== 0) {
        earnings =
            <span className="icon-text ct-account-overview__net">
                    <span className={"icon is-size-5 " + (computeClass())}>
                        {
                            accountOverview?.dailyEarnings ?? -1 >= 0 ?
                                <TbTrendingUp/> :
                                <TbTrendingDown/>
                        }
                    </span>
                    <span className={computeClass()}>
                        {formatNumberForDisplay(accountOverview?.dailyEarnings ?? -1)}
                    </span>
                </span>
    }

    return (
        <>
            <div className="ct-account-overview">
                <div className="columns is-multiline is-mobile is-vcentered is-gapless">
                    <div className="column is-6">
                        <div className="columns is-multiline is-mobile is-gapless">
                            <div className="column is-12">
                                <h4 className="ct-account-overview__balance">
                                    {formatNumberForDisplay(accountOverview?.balance ?? -1)}
                                    <small>{accountOverview?.account?.currency?.isoCode ?? ''}</small>
                                </h4>
                                {earnings}
                            </div>
                            <div className="column is-12">
                                <p className={"ct-account-overview__target" + (accountOverview?.nextTarget ?? -1 > 0 ? '' : ' no-show ')}>
                                    Next Target: {formatNumberForDisplay(accountOverview?.nextTarget ?? -1)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="column is-6 has-text-centered">
                        <AccountOverviewRank showPrevNextRanks={false} rankInfo={accountOverview?.rank ?? undefined} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewCard;