import React from "react";

/**
 * Base button component for a generic button
 *
 * @prop text - text label
 * @prop variant - determines color & shape. Accepted values are : 'primary', 'secondary', 'tertiary'.
 *                 if the value is not one of the above or is missing, the button will not render
 * @prop inverted - flag to determine if the colors should be inverted
 * @prop plain - flag to determine whether to render plain button with no styling other than theming
 * @prop active - flag used with the plain flag, if true will always show the hover state
 * @prop disabled - flag to determine whether this button should render as disabled
 * @prop loading - flag to show the button as loading
 * @prop handler - handler function for button
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

    function computeClass(variant: string, inverted: boolean, plain: boolean, active: boolean) {
        const v = variant ? "tb-button--" + variant : ""
        const i = inverted ? "tb-button--inverted" : ""
        const p = plain ? "tb-button--plain" : ""
        const a = active ? "tb-button--active" : ""

        return `tb-button ${v} ${i} ${p} ${a}`.trim()
    }

    if (!variant || variant.length === 0) {
        return null
    }

    return (
        <button className={computeClass(variant, inverted, plain, active)} disabled={disabled} onClick={handler}>
            {text}
        </button>
    );
}

export default SimpleButton;
