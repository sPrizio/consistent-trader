import {NewsEntrySlotInfo, NewsInfo} from "../../types/api-types";
import {CoreConstants} from "../../constants/CoreConstants";
import NewsHeader from "./NewsHeader";
import {formatDate, formatDateMoment, now} from "../../services/datetime/DateTimeService";
import {getFlagForCode} from "../../services/locale/LocaleService";
import {VscWarning} from "react-icons/vsc";
import {RiErrorWarningLine} from "react-icons/ri";
import {AiOutlineLine, AiOutlineRight} from "react-icons/ai";

/**
 * Component that renders news info
 *
 * @param newsInfo news info
 * @param minimizeEntries if false, show extra information
 * @author Stephen Prizio
 * @version 1.0
 */
function News({newsInfo = {}, minimizeEntries = true}: {newsInfo: NewsInfo, minimizeEntries?: boolean}) {


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
    /*function computeClass() {

        if (!minimizeEntries) {
            return active ? ' is-active' : ''
        }

        if (oldNews) {
            return ' old-news '
        } else if (active) {
            return ' is-active '
        } else {
            return ' future-news '
        }
    }*/

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
     * @param key array index
     */
    function formatTime(item: NewsEntrySlotInfo) {

        if (item && item.entries && (item?.entries[0]?.severity ?? '') === 'Holiday') {
            return <>All Day</>
        }

        return <>{formatDate(formatDateMoment(now(), CoreConstants.DateTime.ISODateFormat) + ' ' + item.time, CoreConstants.DateTime.ISOShortTimeFormat)}</>
    }


    //  RENDER

    //  TODO: old news should be nearly invisible
    //  TODO: add headers when flag is true

    return (
        <div className="ct-news">

            <div className="table-container">
                <table className="table is-fullwidth ct-news__table">
                    {/*<thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Country</th>
                        <th>Impact</th>
                        <th>Event</th>
                    </tr>
                    </thead>*/}
                    <tbody>
                    {
                        newsInfo && newsInfo?.news?.map((info, key) => {
                            return (
                                <tr className="ct-news__table__row">
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
                                                info.slots?.filter(slot => slot.entries && slot.entries.length > 0)?.map((slot, key) => {
                                                    return (
                                                        <tr className="ct-news__table__slot-table__row">
                                                            <td className={"ct-news__table__slot-table__entry__column time-cell" + (slot.active ? ' active ' : '')} width={"25%"}>
                                                                <span className="icon-text">
                                                                    <span className="icon"><AiOutlineRight/></span>
                                                                    <span>{formatTime(slot ?? '')}</span>
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {
                                                                        slot.entries?.map((entry, key) => {
                                                                            return (
                                                                                <div className="ct-news__table__slot-table__entry">
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
                                                                        })
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>




            {minimizeEntries ? null : <NewsHeader />}
            {/*{
                newsInfo && newsInfo?.news?.map((item, key) => {
                    return (
                        <div className="entry-column">
                            <div className="column is-12" key={item.date}>
                                <NewsEntry
                                    active={getDate(item.date ?? '').startOf('day').isSame(now().startOf('day'))}
                                    oldNews={getDate(item.date ?? '').startOf('day').isBefore(now().startOf('day'))}
                                    date={item.date ?? ''}
                                    slots={item.slots ?? []}
                                    minimizeEntries={minimizeEntries}
                                />
                            </div>
                            <hr className="is-primary" />
                        </div>

                    )
                })
            }*/}
        </div>
    )
}

export default News;