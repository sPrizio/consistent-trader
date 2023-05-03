import React from "react";

/**
 * Base button component for a generic button
 *
 * @param text - text label
 * @param variant - determines color & shape. Accepted values are : 'primary', 'secondary', 'tertiary'.
 *                 if the value is not one of the above or is missing, the button will not render
 * @param inverted - flag to determine if the colors should be inverted
 * @param plain - flag to determine whether to render plain button with no styling other than theming
 * @param active - flag used with the plain flag, if true will always show the hover state
 * @param disabled - flag to determine whether this button should render as disabled
 * @param loading - flag to show the button as loading
 * @param handler - handler function for button
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function SimpleButton(
    {
        text = 'Lorem Ipsum',
        variant = 'primary',
        inverted = false,
        plain = false,
        active = false,
        disabled = false,
        loading = false,
        handler = null
    }
        : {
        text?: string,
        variant?: 'primary' | 'secondary' | 'tertiary',
        inverted?: boolean,
        plain?: boolean,
        active?: boolean,
        disabled?: boolean,
        loading?: boolean,
        handler?: any
    }
) {

    /**
     * Computes the css class based on the given props
     *
     * @param variant - determines color & shape. Accepted values are : 'primary', 'secondary', 'tertiary'.
     *                 if the value is not one of the above or is missing, the button will not render
     * @param inverted - flag to determine if the colors should be inverted
     * @param plain - flag to determine whether to render plain button with no styling other than theming
     * @param active - flag used with the plain flag, if true will always show the hover state
     */
    function computeClass(variant: string, inverted: boolean, plain: boolean, active: boolean) {
        const v = variant ? "ct-button--" + variant : ""
        const i = inverted ? "ct-button--inverted" : ""
        const p = plain ? "ct-button--plain" : ""
        const a = active ? "ct-button--active" : ""
        const l = loading ? "ct-button--loading" : ""

        return `ct-button ${v} ${i} ${p} ${a} ${l}`.trim()
    }

    if (!variant || variant.length === 0) {
        return null
    }


    //  RENDER

    return (
        <button className={computeClass(variant, inverted, plain, active)} disabled={disabled} onClick={async () => await handler}>
            {!loading ? text : <div className="ct-button--loader">L</div>}
        </button>
    );
}

export default SimpleButton;
