import {Helmet} from "react-helmet";
import {formatDateMoment, now} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import NewsCard from "../../components/Cards/News/NewsCard";
import {UserInfo} from "../../types/api-types";

function NewsPage({ userInfo = {} } : { userInfo: UserInfo }) {


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Market News</title>
            </Helmet>
            <div className="ct-news-page">
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-12">
                        <NewsCard
                            start={formatDateMoment(now().startOf('week').add(1, 'day'), CoreConstants.DateTime.ISODateFormat)}
                            end={formatDateMoment(now().startOf('week').add(6, 'day'), CoreConstants.DateTime.ISODateFormat)}
                            minimizeEntries={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsPage;