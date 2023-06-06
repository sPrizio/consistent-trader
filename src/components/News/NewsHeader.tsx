import {AiOutlineRight} from "react-icons/ai";

/**
 * Renders headers for the news component
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function NewsHeader() {


    //  RENDER

    return (
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
    )
}

export default NewsHeader;