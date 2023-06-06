import {NewsInfo} from "../../types/api-types";
import NewsEntry from "./NewsEntry";
import {CoreConstants} from "../../constants/CoreConstants";
import NewsHeader from "./NewsHeader";
import {formatDate, getDate, now} from "../../services/datetime/DateTimeService";
import {getFlagForCode} from "../../services/locale/LocaleService";

/**
 * Component that renders news info
 *
 * @param newsInfo news info
 * @param minimizeEntries if false, show extra information
 * @author Stephen Prizio
 * @version 1.0
 */
function News({newsInfo = {}, minimizeEntries = true}: {newsInfo: NewsInfo, minimizeEntries?: boolean}) {


    //  RENDER

    //  TODO: market news page should be a scrollable table
    //  TODO: create a new component for it later

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
                                        {formatDate(info.date ?? '', CoreConstants.DateTime.ISOMonthDayFormat)}
                                    </td>
                                    <td className="ct-news__table__row__column">
                                        <table className="table is-fullwidth ct-news__table__slot-table">
                                            <tbody>
                                            {
                                                info.slots?.filter(slot => slot.entries && slot.entries.length > 0)?.map((slot, key) => {
                                                    return (
                                                        <tr className="ct-news__table__slot-table__row">
                                                            <td width={"25%"}>{slot.time}</td>
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

                                                                                    </div>
                                                                                    <div className="ct-news__table__slot-table__entry__column">
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
            {
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
                            {/*<hr className="is-primary" />*/}
                        </div>

                    )
                })
            }
        </div>
    )
}

export default News;