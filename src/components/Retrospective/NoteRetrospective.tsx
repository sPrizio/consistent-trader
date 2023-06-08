import BaseCard from "../Cards/BaseCard";
import {RetrospectiveInfo} from "../../types/api-types";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatDate} from "../../services/datetime/DateTimeService";
import {AiFillRightCircle} from "react-icons/ai";
import {RiAlarmWarningLine} from "react-icons/ri";
import {formatNumberForDisplay} from "../../services/data/FormattingService";
import SimpleButton from "../Buttons/SimpleButton";
import {emptyObject} from "../../services/data/DataIntegrityService";

/**
 * Component that renders a written retrospective
 *
 * @param interval aggregate interval
 * @param showTotals show total values for period
 * @param isLoading is loading
 * @param retro retro data
 * @param editHandler edit handler
 * @param deleteHandler delete handler
 * @param showCrud show edit & delete controls
 * @author Stephen Prizio
 * @version 1.0
 */
function NoteRetrospective(
    {
        interval = '',
        showTotals = false,
        isLoading = false,
        retro = {},
        editHandler,
        deleteHandler,
        showCrud = false
    }
        : {
        interval: string,
        showTotals: boolean,
        isLoading: boolean,
        retro: RetrospectiveInfo,
        editHandler: Function,
        deleteHandler: Function,
        showCrud: boolean
    }
) {


    //  GENERAL FUNCTIONS

    /**
     * Gets the date display depending on the aggregate interval
     */
    function getDate() {
        if (retro && retro.startDate && retro.endDate) {
            if (interval === 'WEEKLY') {
                const day1 = formatDate(retro.startDate, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
                const day2 = formatDate(retro.endDate, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
                return (
                    <>
                        {formatDate(retro.startDate, CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day1 ? day1[1] : ''}<sup>{day1 ? day1[2] : ''}</sup>
                        &nbsp;-&nbsp;
                        {formatDate(retro.endDate, CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day2 ? day2[1] : ''}<sup>{day2 ? day2[2] : ''}</sup>
                    </>
                )
            } else if (interval === 'DAILY') {
                return formatDate(retro.startDate, CoreConstants.DateTime.ISOMonthDayFormat)
            } else if (interval === 'YEARLY') {
                return formatDate(retro.startDate, CoreConstants.DateTime.ISOYearFormat)
            } else {
                return formatDate(retro.startDate, CoreConstants.DateTime.ISOMonthYearFormat)
            }
        }


        return ''
    }


    //  RENDER

    let totals = null
    if (showTotals && retro && retro.totals && retro.totals.statistics) {
        totals =
            <div className="ct-note-retrospective__totals">
                <hr/>
                <div className="columns is-multiline is-mobile has-text-centered">
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Trades</p>
                            <p className="ct-note-retrospective__value">{retro.totals.statistics.numberOfTrades}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Trading Rate</p>
                            <p className="ct-note-retrospective__value">{formatNumberForDisplay(retro.totals?.statistics?.tradingRate ?? -1)}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Win %</p>
                            <p className="ct-note-retrospective__value">{retro.totals.statistics.winPercentage}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Net Profit</p>
                            <p className="ct-note-retrospective__value">{formatNumberForDisplay(retro.totals?.statistics?.netProfit ?? -1)}</p>
                        </div>
                    </div>

                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Wins</p>
                            <p className="ct-note-retrospective__value">{retro.totals.statistics.numberOfWinningTrades}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Average Win</p>
                            <p className="ct-note-retrospective__value">{formatNumberForDisplay(retro.totals?.statistics?.averageWinAmount ?? -1)}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Largest Win</p>
                            <p className="ct-note-retrospective__value">{retro.totals.statistics.largestWinAmount}</p>
                        </div>
                    </div>
                    <div className="column is-3">
                        <div>
                            <p className="ct-note-retrospective__header">Gross Gain</p>
                            <p className="ct-note-retrospective__value">{formatNumberForDisplay(retro.totals?.statistics?.grossWinAmount ?? -1)}</p>
                        </div>
                    </div>
                </div>
            </div>
    }

    let displayKeyPoints : Array<any> = []
    if (retro && retro.points) {
        retro.points.filter(p => p.keyPoint).forEach((item, key) => {
            displayKeyPoints.push(
                <p key={key} className="ct-note-retrospective__key-point">
                    <span className="icon-text">
                        <span className="icon">
                            <RiAlarmWarningLine/>
                        </span>
                    </span>
                    {item.entryText}
                </p>
            )
        })
    }

    let displayPoints : Array<any> = []
    if (retro && retro.points) {
        retro.points.filter(p => !p.keyPoint).forEach((item, key) => {
            displayPoints = []
            displayPoints.push(
                <div className="block" key={key}>
                    <span className="icon-text">
                        <span className="icon">
                            <AiFillRightCircle/>
                        </span>
                    </span>
                    {item.entryText}
                </div>
            )
        })
    }

    let content
    if (!retro) {
        content =
            <div className="container">
                <p>
                    Your most recent retrospective would appear here. Consider adding one later, once you've
                    begun trading!
                </p>
            </div>
    } else {
        content = <div className="ct-note-retrospective">
            <div className="container">
                <div className="block">
                    <div className="ct-message ct-message--primary message">
                        {
                            displayKeyPoints && displayKeyPoints.length > 0 ?
                                <div className="message-body">
                                    {displayKeyPoints}
                                </div>
                                : null
                        }
                    </div>
                </div>
                {displayPoints}
                {totals}
            </div>
        </div>
    }

    let controls : Array<any> = []
    if (showCrud) {
        controls =
            [
                <SimpleButton
                    loading={isLoading}
                    text={'Delete'}
                    variant={"tertiary"}
                    key={1}
                    handler={() => deleteHandler(retro.uid)}
                />,
                /*<SimpleButton
                    text={'Edit'}
                    key={0}
                    loading={false}
                />*/
            ]
    }

    return (
        <>
            <BaseCard
                loading={false}
                title={interval.toLowerCase() + ' Retrospective'}
                subtitle={getDate()}
                hasBorder={false}
                content={[content]}
                controls={controls}
                hasError={emptyObject(retro)}
            />
        </>
    )
}

export default NoteRetrospective;