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
 * @param icon - icon component
 * @param iconPosition - icon position on left or right of text
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function SimpleButton(
    {
        text = '',
        variant = 'primary',
        inverted = false,
        plain = false,
        active = false,
        disabled = false,
        loading = false,
        handler = null,
        icon = null,
        iconPosition = 'left',
    }
        : {
        text?: string,
        variant?: 'primary' | 'secondary' | 'tertiary',
        inverted?: boolean,
        plain?: boolean,
        active?: boolean,
        disabled?: boolean,
        loading?: boolean,
        handler?: any,
        icon?: any,
        iconPosition?: 'left' | 'right' | 'center'
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
        <div className={computeClass(variant, inverted, plain, active)}>
            {icon && iconPosition === 'left' ? icon : null}
            {icon && iconPosition === 'center' ? icon : null}
            {
                text && text.length > 0 ?
                    <button className="ct-button__inner" disabled={disabled} onClick={handler}>
                        {!loading ? text : <div className="ct-button--loader">L</div>}
                    </button>
                    :
                    null
            }
            {icon && iconPosition === 'right' ? icon : null}
        </div>
    );
}

export default SimpleButton;
