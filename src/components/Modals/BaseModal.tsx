import SimpleButton from "../Buttons/SimpleButton";
import {IoMdClose} from "react-icons/io";
import React from "react";

function BaseModal(
    {
        active,
        title = '',
        content = [],
        hasControls = true,
        submitHandler = undefined,
        closeHandler,
    }
    : {
        active: boolean,
        title?: string,
        content?: Array<any>,
        hasControls?: boolean,
        submitHandler?: Function,
        closeHandler: Function
    }) {


    //  RENDER

    return (
        <div className={"ct-modal" + (active ? " active " : "")}>
            <div className="ct-modal__overlay" />
            <div className="ct-modal__content">
                <div className="ct-modal__content__header">
                    <div className="modal-padding flex-container">
                        <div className="ct-modal__content__header__column">
                            <h6 className="ct-modal__content__header__title">{ title }</h6>
                        </div>
                        <div className="ct-modal__content__header__column has-text-right">
                            <div className="icon is-size-2" onClick={() => closeHandler()}>
                                <IoMdClose />
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
                                        return <div className="ct-modal__content__body__entry__item" key={item}>{item}</div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className="ct-modal__content__controls has-text-right">
                    <div className="modal-padding">
                        <div className="ct-modal__content__controls__control">
                            <SimpleButton text={'Cancel'} plain={true} handler={closeHandler} />
                        </div>
                        <div className="ct-modal__content__controls__control">
                            <SimpleButton text={'Submit'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BaseModal;