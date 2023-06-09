import {CoreConstants} from "../../constants/CoreConstants";
import moment from "moment";
import {NewsEntrySlotEntryInfo, NewsEntrySlotInfo} from "../../types/api-types";
import {VscWarning} from "react-icons/vsc";
import {RiErrorWarningLine} from "react-icons/ri";
import {formatDate, formatDateMoment, now} from "../../services/datetime/DateTimeService";
import {AiOutlineLine, AiOutlineRight} from "react-icons/ai";
import {getFlagForCode} from "../../services/locale/LocaleService";

/**
 * Component representing a day of market news
 *
 * @param active true if the date is today
 * @param oldNews true if date is in the past
 * @param date date
 * @param slots new slots
 * @param minimizeEntries if false, show extra information
 * @param minimizeEntries if false, show extra information
 * @author Stephen Prizio
 * @version 1.0
 */
function NewsEntry({active = false, oldNews = false, date = '', slots = [], minimizeEntries = true}: {
    active: boolean,
    oldNews: boolean,
    date: string,
    slots: Array<NewsEntrySlotInfo>,
    minimizeEntries?: boolean,
}) {


    //  GENERAL FUNCTIONS

    /**
     * Generates the date display for the given value
     *
     * @param val date
     */
    function dateDisplay(val: string) {
        const day = moment(val).format(CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
        return (
            <>
                {moment(val).format(CoreConstants.DateTime.ISOShortMonthFormat)}&nbsp;{day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>
            </>
        )
    }

    /**
     * Computes whether the entry is the first
     *
     * @param val entry id
     */
    function isFirst(val: number) {
        const values: any = []
        const bools: any = []

        for (let i = 0; i < slots.length; i++) {
            if (slots[i].time === '12:34:00' || values.includes(slots[i].time)) {
                bools[i] = false
            } else {
                bools[i] = true
                values.push(slots[i].time)
            }
        }

        return bools[val]
    }

    /**
     * Computes the given class depending on the time of the week
     */
    function computeClass() {

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
     * @param key array index
     */
    function formatTime(item: NewsEntrySlotInfo, key: number) {

        if (!isFirst(key)) {
            return null;
        }

        if (item && item.entries && (item?.entries[0]?.severity ?? '') === 'Holiday') {
            return <>All Day</>
        }

        return <>{formatDate(formatDateMoment(now(), CoreConstants.DateTime.ISODateFormat) + ' ' + item.time, CoreConstants.DateTime.ISOShortTimeFormat)}</>
    }


    //  RENDER

    let minimized = (item: NewsEntrySlotEntryInfo, key: number) =>
        <div className="columns is-multiline is-gapless is-mobile is-vcentered ct-news__entry__columns" key={key}>
            <div className="column">
                <span className="icon">
                    {getFlagForCode(item.country ?? '')}
                </span>
            </div>
            <div className="column">
                <span className={"ct-news__entry__content icon is-size-5 " + getMaxSeverity(item.severityLevel ?? 0)}>
                    {computeIcon(item.severityLevel ?? -1)}
                </span>
            </div>
            <div
                className="column is-three-quarters-desktop is-half-tablet is-half-mobile ct-news__entry__content-text">
                {item.content}
            </div>
        </div>

    let maximized = (item: NewsEntrySlotEntryInfo, key: number) =>
        <div className="columns is-multiline is-gapless is-mobile is-vcentered ct-news__entry__columns" key={key}>
            <div className="column is-2 has-text-centered">
                <span className="icon">
                    {getFlagForCode(item.country ?? '')}
                </span>
            </div>
            <div className="column is-2 has-text-centered">
                <span className={"ct-news__entry__content icon is-size-5 " + getMaxSeverity(item.severityLevel ?? 0)}>
                    {computeIcon(item.severityLevel ?? -1)}
                </span>
            </div>
            <div className="column is-4 is-half-tablet is-half-mobile ct-news__entry__content-text">
                {item.content}
            </div>
            <div className="column is-2 ct-news__entry__content-text has-text-centered">
                {item.forecast}
            </div>
            <div className="column  is-2 ct-news__entry__content-text has-text-centered">
                {item.previous}
            </div>
        </div>

    let slotsTemplate = slots?.filter(item => item.entries && item.entries.length > 0)?.map((item, key) => {
        return (
            <div className={"column is-12 content-column" + (isFirst(key) ? ' first ' : '')} key={key}>
                <div className="content">
                    <div className="columns is-multiline is-mobile is-gapless is-vcentered">
                        <div className={"column is-3 ct-news__entry__time" + (item.active ? ' active ' : '')}>
                            <span className="icon-text">
                                <span className="icon"><AiOutlineRight/></span>
                                <span>{formatTime(item, key)}</span>
                            </span>
                        </div>
                        <div className="column is-9">
                            {
                                item.entries && item.entries.map((item, key) => {
                                    return (
                                        minimizeEntries ? minimized(item, key) : maximized(item, key)
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="ct-news__entry">
            <div className={"columns is-multiline is-mobile entry-columns " + (computeClass())}>
                <div className="column is-one-quarter date-column">
                    <h6 className="ct-news__entry__news-date-header">
                        {formatDate(date, CoreConstants.DateTime.ISOWeekdayFormat)}
                    </h6>
                    <h6 className="ct-news__entry__news-date-value">
                        {dateDisplay(date)}
                    </h6>
                </div>
                <div className="column value-column">
                    <div className="columns is-multiline is-mobile is-gapless">
                        {slotsTemplate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsEntry;