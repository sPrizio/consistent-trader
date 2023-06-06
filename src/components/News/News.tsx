import {NewsInfo} from "../../types/api-types";
import NewsEntry from "./NewsEntry";
import moment from "moment";

/**
 * Component that renders news info
 *
 * @param newsInfo news info
 * @author Stephen Prizio
 * @version 1.0
 */
function News({newsInfo = {}}: {newsInfo: NewsInfo}) {


    //  RENDER

    return (
        <div className="ct-news">
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