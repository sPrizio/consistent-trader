import BaseCard from "../../components/Cards/BaseCard";
import {Helmet} from "react-helmet";

/**
 * The about page, generic information about the app
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function AboutPage() {


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | About</title>
            </Helmet>
            <div className="ct-about-page">
                <div className="container">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12">
                            <div className="block has-text-centered">
                                Welcome to <strong>CTrader</strong>! <strong>CTrader</strong> aims to provide
                                the support that a trader needs when navigating the difficult journey of becoming a
                                successful trader. Trading is all about generating consistent returns in a systematic
                                way that favors mechanical repetition over impulsive decision
                                making. <strong>CTrader</strong> aims to track your performance for each
                                trading session and provide insights into your success and drawback in an attempt
                                to solve your trading issues and help forge your own path.
                            </div>
                            <hr className="is-primary"/>
                        </div>
                        <div className="column is-4-desktop is-12-tablet is-12-mobile">
                            <BaseCard
                                title={'Track'}
                                content={[
                                    <>
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={require(`../../assets/images/content/track.png`)}
                                                     alt="Track"
                                                />
                                            </figure>
                                        </div>
                                        <br/>
                                        <p className="has-text-justified">
                                            View your trades broken down into different time spans, review analysis
                                            about how you're trading and when you're most profitable. Look at how your
                                            skill as a trader improves over time and watch your account grow as a result.
                                        </p>
                                    </>
                                ]}
                            />
                        </div>
                        <div className="column is-4-desktop is-12-tablet is-12-mobile">
                            <BaseCard
                                title={'Study'}
                                content={[
                                    <>
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={require(`../../assets/images/content/study.png`)}
                                                     alt="Study"
                                                />
                                            </figure>
                                        </div>
                                        <br/>
                                        <p className="has-text-justified">
                                            Connect your trading account to CTrader and use your trading performance to
                                            review your performances. Review your entries & exits, view your live
                                            performance throughout the trading sessions & much more.
                                        </p>
                                    </>
                                ]}
                            />
                        </div>
                        <div className="column is-4-desktop is-12-tablet is-12-mobile">
                            <BaseCard
                                title={'Reflect'}
                                content={[
                                    <>
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={require(`../../assets/images/content/reflect.png`)}
                                                     alt="Reflect"
                                                />
                                            </figure>
                                        </div>
                                        <br/>
                                        <p className="has-text-justified">
                                            Take the time to reflect on your trading performances and write down notes
                                            and important ideas to guide your future trading by capitalizing on your success
                                            and learning from your errors. Use your experience to improve your skill.
                                        </p>
                                    </>
                                ]}
                            />
                        </div>
                        <div className="column is-12">
                            <hr className="is-primary"/>
                            <div className="block has-text-centered">
                                <strong>CTrader</strong> is all about growth. A great trader is not born but rather
                                created through
                                hard-work, determination, tenacity and a willingness to learn from one's mistakes. A great
                                trader is created
                                through growth in all of these concepts and <strong>CTrader</strong>'s purpose is to
                                provide a service
                                to this end. Good luck!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutPage;