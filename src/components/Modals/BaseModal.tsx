import SimpleButton from "../Buttons/SimpleButton";
import {IoMdClose} from "react-icons/io";
import React from "react";

/**
 * Base modal to be used as skeleton for custom modals
 *
 * @param active flag to show the modal
 * @param title modal title
 * @param content modal custom content
 * @param hasControls if true, show section for buttons
 * @param submitHandler when buttons are shown, a submit handler is needed
 * @param closeHandler handle closing the modal
 * @param cssClasses custom css classes
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function BaseModal(
    {
        active,
        title = '',
        content = [],
        hasControls = true,
        submitHandler,
        closeHandler,
        cssClasses = '',
        isLoading = false,
    }
        : {
        active: boolean,
        title?: string,
        content?: Array<any>,
        hasControls?: boolean,
        submitHandler?: Function,
        closeHandler: Function,
        cssClasses?: string
        isLoading?: boolean
    }) {


    //  RENDER

    return (
        <>
            <div className={"ct-modal modal" + (active ? " is-active " : "") + " " + cssClasses}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body">
                        <div className="ct-modal__content">
                            <div className="ct-modal__content__header">
                                <div className="modal-padding flex-container">
                                    <div className="ct-modal__content__header__column">
                                        <h6 className="ct-modal__content__header__title">{title}</h6>
                                    </div>
                                    <div className="ct-modal__content__header__column has-text-right">
                                        <div className="icon is-size-2" onClick={() => closeHandler()}>
                                            <IoMdClose/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ct-modal__content__body">
                                <div className="modal-padding">
                                    {
                                        content && content.length > 0 &&
                                        <div className="ct-modal__content__body__entry">
                                            {
                                                content.map(item => {
                                                    return <div className="ct-modal__content__body__entry__item"
                                                                key={item}>{item}</div>
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                            {
                                hasControls ?
                                    <div className="ct-modal__content__controls has-text-right">
                                        <div className="modal-padding">
                                            <div className="ct-modal__content__controls__control">
                                                <SimpleButton text={'Cancel'} plain={true} handler={closeHandler}/>
                                            </div>
                                            <div className="ct-modal__content__controls__control">
                                                <SimpleButton text={'Submit'} handler={submitHandler} loading={isLoading} />
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default BaseModal;