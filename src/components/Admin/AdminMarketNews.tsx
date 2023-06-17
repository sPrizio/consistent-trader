import BaseCard from "../Cards/BaseCard";
import SimpleButton from "../Buttons/SimpleButton";
import {useState} from "react";
import {post} from "../../services/client/ClientService";
import {CoreConstants} from "../../constants/CoreConstants";
import {StandardJsonResponse} from "../../types/api-types";

/**
 * Component that renders the market news card for admins. Allowing the user to fetch the current news cycle for display
 * throughout the app
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function AdminMarketNews() {

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)


    //  HANDLER FUNCTIONS

    /**
     * Handles the click of the fetch news button
     */
    async function handleClick() {
        await fetchNews();
    }


    //  GENERAL FUNCTIONS

    /**
     * API call to fetch the new market news
     */
    async function fetchNews() {

        setIsLoading(true)

        const d = await post(CoreConstants.ApiUrls.News.Fetch, {})
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success) {
            setIsSuccess(true)
            setIsError(false)
        } else {
            setIsSuccess(false)
            setIsError(true)
        }

        setIsLoading(false)
    }


    //  RENDER

    let successText = null
    if (isSuccess && !isError) {
        successText = <div className="ct-market-news-admin-card__success-text">News was fetched successfully!</div>
    }

    let errorText = null
    if (!isSuccess && isError) {
        errorText = <div className="ct-market-news-admin-card__error-text">There was an error while fetching the news. Please try again.</div>
    }

    return (
        <>
            <BaseCard
                loading={false}
                title={'Market News'}
                subtitle={'Download the latest market news to update the app'}
                hasBorder={true}
                content={[
                    <>
                        <div className="ct-market-news-admin-card">
                            <div className="columns is-multiline is-mobile is-vcentered" key={0}>
                                <div className="column is-6">
                                    <SimpleButton text={'Fetch News'} loading={isLoading} handler={() => handleClick()} />
                                </div>
                                <div className="column is-6 message-column">
                                    {successText}
                                    {errorText}
                                </div>
                            </div>
                        </div>
                    </>
                ]}
            />
        </>
    )
}

export default AdminMarketNews;