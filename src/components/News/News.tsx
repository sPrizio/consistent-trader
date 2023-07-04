import {NewsEntrySlotInfo, NewsInfo} from "../../types/api-types";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatDate, formatDateMoment, now} from "../../services/datetime/DateTimeService";
import {getFlagForCode} from "../../services/locale/LocaleService";
import {VscWarning} from "react-icons/vsc";
import {RiErrorWarningLine} from "react-icons/ri";
import {AiOutlineLine, AiOutlineRight} from "react-icons/ai";

/**
 * Component that renders news info
 *
 * @param newsInfo news info
 * @param oldDays flag to show passed days during the week
 * @author Stephen Prizio
 * @version 1.0
 */
function News({newsInfo = {}, oldDays = true}: {newsInfo: NewsInfo, oldDays?: boolean}) {


    //  FUNCTIONS

    /**
     * Generates the date display for the given value
     *
     * @param val date
     */
    function dateDisplay(val: string) {
        const day = formatDate(val, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
        return (
            <>
                {formatDate(val, CoreConstants.DateTime.ISOShortMonthFormat)}&nbsp;{day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>
            </>
        )
    }

    /**
     * Computes the given class depending on the time of the week
     */
    function computeClass(past: boolean, future: boolean) {
        if (past) {
            return ' old-news '
        } else if (!past && !future) {
            return ' is-active '
        } else {
            return ' future-news '
        }
    }

    /**
     * Computes the icon to show depending on the severity level
     *
     * @param val severity level
     */
    function computeIcon(val: number) {
        switch (val) {
            case 1:
                return <RiErrorWarningLine/>
            case 2:
                return <VscWarning/>
            case 3:
                return <AiOutlineLine/>
            default:
                return ''
        }
    }

    /**
     * Determines the severity class to display based on severity level
     *
     * @param val severity level
     */
    function getMaxSeverity(val: number) {
        switch (val) {
            case 1:
                return 'severe'
            case 2:
                return 'moderate'
            case 3:
                return 'low'
            default:
                return ''
        }
    }

    /**
     * Formats the time display for each news entry
     *
     * @param item news entry slot
     */
    function formatTime(item: NewsEntrySlotInfo) {

        if (item?.entries && (item?.entries[0]?.severity ?? '') === 'Holiday') {
            return <>All Day</>
        }

        return <>{formatDate(formatDateMoment(now(), CoreConstants.DateTime.ISODateFormat) + ' ' + item.time, CoreConstants.DateTime.ISOShortTimeFormat)}</>
    }


    //  RENDER

    return (
        <div className={"ct-news" + (!oldDays ? ' no-old ' : '')}>
            <div className="table-container">
                <table className="table is-fullwidth ct-news__table">
                    <tbody>
                    {
                        newsInfo?.news?.map((info, key) => {
                            return (
                                <tr key={key} className={"ct-news__table__row" + (computeClass(info.past ?? false, info.future ?? false))}>
                                    <td className={"ct-news__table__row__column date-column" + (info.active ? ' is-active ' : '')} width={"25%"}>
                                        <h6 className="date-header">
                                            {formatDate(info.date ?? '', CoreConstants.DateTime.ISOWeekdayFormat)}
                                        </h6>
                                        <h6 className="date-value">
                                            {dateDisplay(info.date ?? '')}
                                        </h6>
                                    </td>
                                    <td className="ct-news__table__row__column">
                                        <table className="table is-fullwidth ct-news__table__slot-table">
                                            <tbody>
                                            {
                                                info?.slots?.filter(slot => slot.entries && slot.entries.length > 0)?.map((slot, key) => {
                                                    return (
                                                        <tr key={key} className="ct-news__table__slot-table__row">
                                                            <td className={"ct-news__table__slot-table__entry__column time-cell" + (slot.active ? ' active ' : '')} width={"25%"}>
                                                                <span className="icon-text">
                                                                    <span className="icon"><AiOutlineRight/></span>
                                                                    <span>{formatTime(slot ?? '')}</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {
                                                                        slot?.entries?.map((entry, key) => {
                                                                            return (
                                                                                <div key={key} className="ct-news__table__slot-table__entry">
                                                                                    <div className="ct-news__table__slot-table__entry__column icon-column">
                                                                                        <div className="icon-wrapper">
                                                                                            {getFlagForCode(entry.country ?? '')}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ct-news__table__slot-table__entry__column icon-column">
                                                                                        <div className="icon-wrapper">
                                                                                            <div className={"impact-icon "  + (getMaxSeverity(entry.severityLevel ?? 0))}>
                                                                                                {computeIcon(entry.severityLevel ?? -1)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ct-news__table__slot-table__entry__column text-cell">
                                                                                        {entry.content}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }) ?? null
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) ?? null
                                            }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )
                        }) ?? null
                    }
                    {
                        (newsInfo?.news?.length ?? -1) === 0 ?
                            <tr>
                                <td className="has-text-centered">
                                    {
                                        (now().day() === 6 || now().day() === 0) ?
                                            <p>News will be updated end of day Sunday. Enjoy the weekend!</p>
                                            :
                                            <p>No upcoming news.</p>
                                    }
                                </td>
                            </tr>
                            : null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default News;