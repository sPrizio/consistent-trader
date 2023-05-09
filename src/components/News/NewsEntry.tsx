import {CoreConstants} from "../../constants/CoreConstants";
import moment from "moment";
import {NewsEntrySlotInfo} from "../../types/api-types";
import {VscWarning} from "react-icons/vsc";
import {RiErrorWarningLine} from "react-icons/ri";
import {FiBookmark} from "react-icons/fi";

/**
 * Component representing a day of market news
 *
 * @param active true if the date is today
 * @param oldNews true if date is in the past
 * @param date date
 * @param slots new slots
 * @author Stephen Prizio
 * @version 1.0
 */
function NewsEntry({active = false, oldNews = false, date = '', slots = []}: {active: boolean, oldNews: boolean, date: string, slots: Array<NewsEntrySlotInfo>}) {


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
                {moment(val).format(CoreConstants.DateTime.ISOShortMonthFormat)}&nbsp;{day ? day[1]: ''}<sup>{day ? day[2]: ''}</sup>
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
        const bools : any = []

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
                return <RiErrorWarningLine />
            case 2:
                return <VscWarning />
            case 3:
                return <FiBookmark />
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


    //  RENDER

    return (
        <div className="ct-news__entry">
            <div className={"columns is-multiline is-mobile " + (computeClass())}>
                <div className="column is-3 date-column">
                    <h6 className="ct-news__entry__news-date-header">
                        {moment(date).format(CoreConstants.DateTime.ISOWeekdayFormat)}
                    </h6>
                    <h6 className="ct-news__entry__news-date-value">
                        {dateDisplay(date)}
                    </h6>
                </div>
                <div className="column is-9 value-column">
                    <div className="columns is-multiline is-mobile is-gapless">
                        {
                            slots && slots.map((item, key) => {
                                return (
                                    <div className={"column is-12 content-column" + (isFirst(key) ? ' first ' : '')} key={key}>
                                        <div className="content">
                                            <div className="columns is-multiline is-mobile is-gapless">
                                                <div className="column is-3 ct-news__entry__time">
                                                    {
                                                        isFirst(key) ?
                                                            <>{moment(moment().format(CoreConstants.DateTime.ISODateFormat) + ' ' + item.time).format(CoreConstants.DateTime.ISOShortTimeFormat)}</>
                                                            : null
                                                    }
                                                </div>
                                                <div className="column is-9">
                                                    {
                                                        item.entries && item.entries.map((item, key) => {
                                                            return (
                                                                <>
                                                                    <span className="icon-text ct-news__entry__content">
                                                                        <span className={"icon is-size-5 " + getMaxSeverity(item.severityLevel ?? 0)}>
                                                                            {computeIcon(item.severityLevel ?? -1)}
                                                                        </span>
                                                                        <span>{item.content}</span>
                                                                    </span>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsEntry;