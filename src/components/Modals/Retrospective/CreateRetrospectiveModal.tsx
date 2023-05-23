import {ChangeEvent, useEffect, useState} from "react";
import {CreateRetrospectiveForm} from "../../../types/ui-types";
import BaseModal from "../BaseModal";
import {AiFillDelete} from "react-icons/ai";
import SimpleButton from "../../Buttons/SimpleButton";
import DatePicker, {DayRange} from "@hassanmojab/react-modern-calendar-datepicker";

/**
 * Component that renders a modal to create a new retrospective
 *
 * @param modalActive is the modal active
 * @param closeHandler close modal handler
 * @param handleSubmit submit handler
 * @param retroData incoming data form
 * @author Stephen Prizio
 * @version 1.0
 */
function CreateRetrospectiveModal(
    {
        modalActive = false,
        closeHandler,
        handleSubmit,
        retroData = {},
    }: {
        modalActive: boolean,
        closeHandler: Function,
        handleSubmit: Function,
        retroData: any,
    }) {

    const [isLoading, setIsLoading] = useState(false)
    const [isInvalidText, setIsInvalidText] = useState(false)
    const [isInvalidDate, setIsInvalidDate] = useState(false)
    const [formData, setFormData] = useState<CreateRetrospectiveForm>(retroData)
    const [dateData, setDateData] = useState<DayRange>({
        from: null,
        to: null
    })
    const [textAreaValue, setTextAreaValue] = useState('')
    const [keyPoint, setKeyPoint] = useState(false)

    useEffect(() => {
        if (!dateData || dateData.from == null) {
            setIsInvalidDate(true)
        } else {
            setIsInvalidDate(false)
            setFormData(prevState => {
                return {...prevState,
                    startDate: `${dateData?.from?.year ?? -1}-${dateData?.from?.month ?? -1}-${dateData?.from?.day ?? -1}`,
                    endDate: `${dateData?.to?.year ?? -1}-${dateData?.to?.month ?? -1}-${dateData?.to?.day ?? -1}`
                }
            })
        }
    }, [dateData])


    //  HANDLER FUNCTIONS

    /**
     * Handles capturing changes in the checkbox
     *
     * @param e change event
     */
    function handleCheck(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        setKeyPoint(target.checked)
    }

    /**
     * Handles capturing changes in the select
     *
     * @param e change event
     */
    function handleSelect(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setFormData(prevState => {
            return {...prevState, intervalFrequency: target.value}
        })
    }

    /**
     * Handles capturing changes in the text area value
     *
     * @param e change event
     */
    function handleTextChange(e: ChangeEvent) {
        const target = e.target as HTMLTextAreaElement
        setTextAreaValue(target.value)
    }


    //  GENERAL FUNCTIONS

    /**
     * Adds a new point to the form data
     */
    function addPoint() {
        if (textAreaValue.length === 0) {
            setIsInvalidText(true)
        } else {
            const temp = {
                lineNumber: (formData.points?.length ?? -1) + 1,
                entryText: textAreaValue,
                keyPoint: keyPoint
            }

            setIsInvalidText(false)
            setFormData(prevState => {
                return {...prevState, points: [...prevState?.points ?? [], temp]}
            })
            setTextAreaValue('')
            setKeyPoint(false)
        }
    }

    /**
     * Handles removing points from the retro data
     *
     * @param lineNumber which point to remove
     */
    function removePoint(lineNumber: number) {

        let points = formData.points
        if (!points || points.length < 1) {
            return
        }

        points = points.filter(el => el.lineNumber !== lineNumber)
        for (let i = 0; i < points.length; i++) {
            points[i].lineNumber = (i + 1)
        }

        setFormData(prevState => {
            return {...prevState, points: points}
        })
    }


    //  RENDER

    let invalidText = null
    if (isInvalidText) {
        invalidText = <small className="has-text-danger">Please add some text to this note.</small>
    }

    let invalidDate = null
    if (isInvalidDate) {
        invalidDate = <p className="has-text-danger">Please select a valid time span</p>
    }

    // @ts-ignore
    let calendar =
        <DatePicker
            value={dateData}
            onChange={setDateData}
            shouldHighlightWeekends={true}
        />

    let content =
        <div>
            <p>
                Adding a retrospective for a time period is a great way to reflect on your performance
                and keep track of your evolution. Be sure to include both positive and constructive
                points. It's important to improve but it is equally important to celebrate those small
                victories!
            </p>
            <br/>

            <div className="columns is-multiline">
                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                    <div className="field">
                        <label className="label">Period Type&nbsp;<small>(Is this a daily, weekly,
                            monthly or yearly retro?)</small></label>
                        <div className="control">
                            <div className="select">
                                <select value={formData.intervalFrequency} onChange={handleSelect}>
                                    <option value={'DAILY'}>Daily</option>
                                    <option value={'WEEKLY'}>Weekly</option>
                                    <option value={'MONTHLY'}>Monthly</option>
                                    <option value={'YEARLY'}>Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-6-desktop is-12-tablet is-12-mobile">
                    <div className="field">
                        <label className="label">Time Period&nbsp;<small>(dd/MM/yyyy)</small></label>
                        <div className="control">
                            {calendar}
                            {invalidDate}
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <div className="field">
                        <label className="label">
                            Notes&nbsp;<small>(Add multiple notes! Each line entry will be represented
                            as a bullet-style point in the retrospective section)</small>
                        </label>
                    </div>
                    <div className="columns is-multiline is-vcentered">
                        <div className="column is-9">
                            <div className="field">
                                <div className="control">
                                    <textarea
                                        className={"textarea " + (isInvalidText ? ' is-danger' : '')}
                                        value={textAreaValue}
                                        onChange={handleTextChange}
                                        placeholder="Enter a thought, idea or summary or whatever else you think is important!"
                                        rows={3}></textarea>
                                    {invalidText}
                                </div>
                            </div>
                        </div>
                        <div className="column is-3 has-text-centered">
                            <label className="checkbox">
                                <input type="checkbox" checked={keyPoint} onChange={handleCheck}/>
                                &nbsp;Highlight this point?
                            </label>
                        </div>
                        <div className="column is-4">
                            <SimpleButton variant={"tertiary"} text={'Add Note'} handler={() => addPoint()}/>
                        </div>
                        <div className="column is-12">
                            {
                                formData.points && formData.points.map((item, key) => {
                                    return (
                                        <div className="columns is-multiline" key={key}>
                                            <div className="column is-9">
                                                <p>{item.lineNumber})&nbsp;{item.entryText}</p>
                                            </div>
                                            <div className="column is-1">
                                                <p>{item.keyPoint ? 'key point' : ''}</p>
                                            </div>
                                            <div className="column is-2 has-text-centered">
                                                <button className="button" onClick={() => removePoint(item.lineNumber)}>
                                                    <span className="icon is-size-5">
                                                        <AiFillDelete/>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>

    return (
        <>
            <BaseModal
                active={modalActive}
                title={'Create Retrospective'}
                hasControls={true}
                closeHandler={closeHandler}
                content={[content]}
                submitHandler={() => {
                    console.log('submitting')
                    handleSubmit(formData)
                }}
                cssClasses={'ct-create-retro-modal'}
                isLoading={isLoading}
            />
        </>
    )
}

export default CreateRetrospectiveModal;