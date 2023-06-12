import React, {useEffect, useRef, useState} from "react";

/**
 * Base card component representing a generic card that is used throughout the app
 *
 * @param header - card header component
 * @param subtitle - card subtitle
 * @param content - custom card content, can be anything, expecting an array
 * @param controls - custom controls, for buttons if necessary, expecting an array
 * @param loading - flag to determine whether the card is in a loading state
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
        loading = false,
        hasError = false,
        hasOverflow = true,
    }
        : {
        title?: any,
        subtitle?: any,
        hasBorder?: boolean,
        content?: Array<any>,
        controls?: Array<any>,
        loading?: boolean,
        hasError?: boolean,
        hasOverflow?: boolean,
    }
) {

    const [isOverflowing, setIsOverflowing] = useState(false)
    const contentDiv = useRef(null)

    useEffect(() => {
        let timeoutId: string | number | NodeJS.Timeout | null | undefined = null;
        const resizeListener = () => {
            // @ts-ignore
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsOverflowing(isOverflown())
            }, 150)
        }

        window.addEventListener('resize', resizeListener)

        return () => {
            window.removeEventListener('resize', resizeListener)
        }
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Returns true if the content is overflowing
     */
    function isOverflown() {
        if (hasOverflow) {
            // @ts-ignore
            return (contentDiv?.current?.scrollHeight ?? -1) > (contentDiv?.current?.clientHeight ?? -1) || (contentDiv?.current?.scrollWidth ?? -1) > (contentDiv?.current?.clientWidth ?? -1);
        }

        return false
    }


    //  RENDER

    let mainContent = null
    if (content && content.length > 0) {
        mainContent =
            <div className="column is-12">
                {
                    <div className={"ct-card__content" + (isOverflowing ? ' overflow' : '')} ref={contentDiv}>
                        {
                            content.map(item => {
                                return <div className="ct-card__content__item" key={item}>{item}</div>
                            })
                        }
                    </div>
                }
            </div>
    }

    let mainControls = null
    if (controls && controls.length > 0) {
        mainControls =
            <div className="column is-12">
                {
                    <div className="ct-card__controls">
                        {
                            controls.map(item => {
                                return <div className="ct-card__controls__item" key={item}>{item}</div>
                            })
                        }
                    </div>
                }
            </div>
    }

    return (
        <div className={"ct-card" + (loading ? " ct-card--is-loading" : "")}>
            <div className="ct-card__loader-overlay"/>
            {
                hasError ?
                    <div className="ct-card__error-disclaimer">
                        <p>Your data will display here once you have begun trading!</p>
                    </div>
                    :
                    <div className="columns is-multiline is-mobile is-gapless">
                        {
                            title.length > 0 ?
                                <div className="column is-12">
                                    <div className="scroll scroll-5" />
                                    <div className={"ct-card__header" + (hasBorder ? ' header-border ' : '')}>
                                        <h5 className="ct-card__header__title">{title}</h5>
                                        <h6 className="ct-card__header__subtitle">{subtitle}</h6>
                                    </div>
                                </div>
                                : null
                        }
                        {mainContent}
                        {mainControls}
                    </div>
            }
        </div>
    )
}

export default BaseCard;
