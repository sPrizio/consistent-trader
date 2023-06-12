import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate, formatDateMoment} from "../../../services/datetime/DateTimeService";
import moment from "moment";
import get from "../../../services/client/ClientService";
import {StandardJsonResponse, UserLocaleInfo} from "../../../types/api-types";
import hasData, {emptyObject} from "../../../services/data/DataIntegrityService";
import News from "../../News/News";

/**
 * Card representing market news
 *
 * @param start start date
 * @param end end date
 * @param locale user locale info
 * @author Stephen Prizio
 * @version 1.0
 */
function NewsCard({start = '', end = '', locale = {}}: { start: string, end: string, locale?: UserLocaleInfo }) {

    const [isLoading, setIsLoading] = useState(false)
    const [newsInfo, setNewsInfo] = useState({})

    useEffect(() => {
        getMarketNews()
    }, [locale, start, end])


    //  GENERAL FUNCTIONS

    /**
     * Computes the date display for the given value
     *
     * @param val date time
     */
    function dateDisplay(val: string,) {
        const day = formatDate(val, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
        return (
            <>
                {moment(val).format(CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>
            </>
        )
    }

    /**
     * Fetches market news
     */
    function getMarketNews() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.News.ForInterval
                    .replace('{start}', start)
                    .replace('{end}', end)
                    .replace('{locales}', locale?.currencies?.join(',') ?? '')
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setNewsInfo({
                    news: response.data
                })
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Market News'}
                subtitle={
                    <>
                        Current Week
                        {/*{dateDisplay(start)}&nbsp;&nbsp;to&nbsp;
                        {dateDisplay(formatDateMoment(moment(end).subtract(1, 'days'), CoreConstants.DateTime.ISODateFormat))}*/}
                    </>
                }
                hasBorder={false}
                content={[<News key={0} newsInfo={newsInfo} />]}
                hasError={emptyObject(newsInfo)}
            />
        </>
    )
}

export default NewsCard;