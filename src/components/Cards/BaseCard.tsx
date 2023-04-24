import React from "react";

/**
 * Base card component representing a generic card that is used throughout the app
 *
 * @prop header - card header component
 * @prop subtitle - card subtitle
 * @prop content - custom card content, can be anything, expecting an array
 * @prop controls - custom controls, for buttons if necessary, expecting an array
 * @prop loading - flag to determine whether the card is in a loading state
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function BaseCard(
    {
        title = '',
        subtitle = '',
        hasBorder = true,
        content = [],
        controls = [],
        loading = false
    }
        : {
        title?: string,
        subtitle?: string,
        hasBorder?: boolean,
        content?: Array<any>,
        controls?: Array<any>,
        loading?: boolean
    }
) {

    //  RENDER

    return (
        <div className={"ct-card" + (loading ? " ct-card--is-loading" : "")}>
            <div className="ct-card__loader-overlay" />
            <div className="columns is-multiline is-mobile is-gapless">
                {
                    title.length > 0 ?
                        <div className="column is-12">
                            <div className={"ct-card__header" + (hasBorder ? ' header-border ' : '')}>
                                <h5 className="ct-card__header__title">{title}</h5>
                                <h6 className="ct-card__header__subtitle">{subtitle}</h6>
                            </div>
                        </div>
                        : null
                }
                <div className="column is-12">
                    {
                        content && content.length > 0 &&
                        <div className="ct-card__content">
                            {
                                content.map(item => {
                                    return <div className="ct-card__content__item" key={item}>{item}</div>
                                })
                            }
                        </div>
                    }
                </div>
                <div className="column is-12">
                    {
                        controls && controls.length > 0 &&
                        <div className="ct-card__controls">
                            {
                                controls.map(item => {
                                    return <div className="ct-card__controls__item" key={item}>{item}</div>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BaseCard;
