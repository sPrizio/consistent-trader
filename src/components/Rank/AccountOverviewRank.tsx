import {CurrentRankInfo} from "../../types/api-types";
import {displayRankName, formatNumberForDisplay, normalize} from "../../services/data/FormattingService";

/**
 * Component for displaying an accounts base rank
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function AccountOverviewRank({showPrevNextRanks = false, rankInfo = {}}: {
    showPrevNextRanks?: boolean,
    rankInfo?: CurrentRankInfo
}) {

    //  GENERAL FUNCTIONS

    function handleImagePath(val: string) {
        if (val === 'prev') {
            if (rankInfo && rankInfo.previousRank && rankInfo.previousRank.imageUrl && rankInfo.previousRank.imageUrl.length > 0) {
                return require(`../../assets/images${rankInfo.previousRank.imageUrl}`)
            }
        } else if (val === 'curr') {
            if (rankInfo && rankInfo.imageUrl && rankInfo.imageUrl.length > 0) {
                return require(`../../assets/images${rankInfo.imageUrl}`)
            }
        } else {
            if (rankInfo && rankInfo.nextRank && rankInfo.nextRank.imageUrl && rankInfo.nextRank.imageUrl.length > 0) {
                return require(`../../assets/images${rankInfo.nextRank.imageUrl}`)
            }
        }

        return require(`../../assets/images/ranks/unranked/unranked_1.png`)
    }


    //  RENDER

    let previous = null
    if (showPrevNextRanks && rankInfo.previousRank) {
        previous =
            <img
                src={handleImagePath('prev')}
                alt={'Previous Rank'}
                height={50}
                width={50}
            />
    }

    let next = null
    if (showPrevNextRanks && rankInfo.nextRank) {
        next =
            <img
                src={handleImagePath('next')}
                alt={'Next Rank'}
                height={50}
                width={50}
            />
    }

    if (rankInfo.name === 'Empty') {
        return (
            <h6 className="sub-header">
                In order to see rank information, please set up a Trading Plan!
            </h6>
        )
    }

    return (
        <div className="ct-account-overview__rank">
            <div className="columns is-multiline is-mobile is-gapless">
                <div className="column is-12">
                    <div className="ct-account-overview__rank__image-container">
                        <img
                            src={handleImagePath('curr')}
                            alt={'Current Rank'}
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
                <div className="column is-12 has-text-right">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <span className="ct-account-overview__rank__bound">
                                    {rankInfo.className?.length !== 0 ? formatNumberForDisplay(rankInfo.start ?? -1, 0) : null}
                                </span>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <span className="ct-account-overview__rank__bound">
                                    {rankInfo.className?.length !== 0 ? formatNumberForDisplay(rankInfo.end ?? -1, 0) : null}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <progress
                        className={"progress is-primary rank " + rankInfo.className}
                        value={normalize(rankInfo.start ?? -1, rankInfo.end ?? -1, rankInfo.current ?? -1)}
                        max={100}
                    />
                </div>
                <div className="column is-12 has-text-right">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <span className={"ct-account-overview__rank__value has-text-weight-bold " + rankInfo.className}>
                                    {displayRankName(rankInfo.name ?? '')}
                                </span>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <span className={"ct-account-overview__rank__value has-text-weight-bold " + rankInfo.className}>
                                    {rankInfo.className?.length !== 0 ? formatNumberForDisplay(rankInfo.current ?? -1, 0) : null}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountOverviewRank;