import {NewsInfo} from "../../types/api-types";
import NewsEntry from "./NewsEntry";
import moment from "moment";
import {CoreConstants} from "../../constants/CoreConstants";
import {AiOutlineRight} from "react-icons/ai";
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
            <div className="entry-column entry-column-header">
                <div className="column is-12">
                    <div className="ct-news__entry">
                        <div className="columns is-multiline is-mobile entry-columns">
                            <div className="column is-one-quarter date-column" />
                            <div className="column value-column">
                                <div className="columns is-multiline is-mobile is-gapless">
                                    <div className="column is-12 content-column">
                                        <div className="content">
                                            <div className="columns is-multiline is-mobile is-gapless is-vcentered">
                                                <div className="column is-3 ct-news__entry__time">
                                                    <span className="icon-text">
                                                        <span className="icon"><AiOutlineRight/></span>
                                                        <span>Time</span>
                                                    </span>
                                                </div>
                                                <div className="column is-9">
                                                    <div className="columns is-multiline is-gapless is-mobile is-vcentered ct-news__entry__columns">
                                                        <div className="column is-2 ct-news__entry__content-text__header has-text-centered">
                                                            Country
                                                        </div>
                                                        <div className="column is-2 ct-news__entry__content-text__header has-text-centered">
                                                            Impact
                                                        </div>
                                                        <div className="column is-4 ct-news__entry__content-text__header">
                                                            Event
                                                        </div>
                                                        <div className="column is-2 ct-news__entry__content-text__header has-text-centered">
                                                            Forecast
                                                        </div>
                                                        <div className="column is-2 ct-news__entry__content-text__header has-text-centered">
                                                            Previous
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                newsInfo && newsInfo?.news?.map((item, key) => {
                    return (
                        <div className="entry-column">
                            <div className="column is-12" key={item.date}>
                                <NewsEntry
                                    active={moment(item.date).startOf('day').isSame(moment().startOf('day'))}
                                    oldNews={moment(item.date).startOf('day').isBefore(moment().startOf('day'))}
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