import BaseCard from "../../components/Cards/BaseCard";
import {Link} from "react-router-dom";

/**
 * Renders a generic error page for the router
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ErrorPage() {


    //  RENDER

    return (
        <div className="ct-error-page">
            <div className="ct-error-page__container">
                <BaseCard
                    loading={false}
                    hasBorder={false}
                    subtitle={''}
                    title={''}
                    content={[<>
                        <div className="content">
                            <h3>404</h3>
                            <h5>OOPS! PAGE NOT FOUND</h5>
                            <p>Sorry but the page you are looking for either does not exist, has been removed, renamed or is temporarily unavailable</p>
                            <Link to={'/overview'}>
                                <a href={''} className="ct-error-page__home">Back to homepage</a>
                            </Link>
                        </div>
                    </>]}
                />
            </div>
        </div>
    )
}

export default ErrorPage;