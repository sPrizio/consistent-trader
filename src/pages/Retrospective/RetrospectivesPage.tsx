import {Helmet} from "react-helmet";
import {ChangeEvent, useEffect, useState} from "react";
import {CreateRetrospectiveForm, RetrospectiveType} from "../../types/ui-types";
import CreateRetrospectiveModal from "../../components/Modals/Retrospective/CreateRetrospectiveModal";
import {ActiveMonthInfo, ActiveYearInfo, StandardJsonResponse} from "../../types/api-types";
import {formatDate, formatDateMoment, getDate, now} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import get, {cDelete, post} from "../../services/client/ClientService";
import hasData from "../../services/data/DataIntegrityService";
import moment from "moment";
import NoteRetrospective from "../../components/Retrospective/NoteRetrospective";
import {HiPlus} from "react-icons/hi";
import {TfiWrite} from "react-icons/tfi";
import {AiFillAudio} from "react-icons/ai";
import 'bulma-floating-button/dist/css/bulma-floating-button.min.css'

/**
 * Component that renders the retrospectives page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function RetrospectivesPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [newActive, setNewActive] = useState(false)
    const [selectedInterval, setSelectedInterval] = useState('WEEKLY')
    const [modalActive, setModalActive] = useState(false)
    const [retroType, setRetroType] = useState(RetrospectiveType.NOTE.code)
    const [formData, setFormData] = useState<CreateRetrospectiveForm>({
        intervalFrequency: 'WEEKLY',
        startDate: '',
        endDate: '',
        points: []
    })
    const [activeMonths, setActiveMonths] = useState<Array<ActiveMonthInfo>>([])
    const [activeYears, setActiveYears] = useState<Array<ActiveYearInfo>>([])
    const [currentMonth, setCurrentMonth] = useState(formatDateMoment(now().startOf('month'), CoreConstants.DateTime.ISOMonthFormat).toUpperCase())
    const [currentYear, setCurrentYear] = useState(formatDateMoment(now().startOf("month").add(1, 'months'), CoreConstants.DateTime.ISOYearFormat))
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [retros, setRetros] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [didDelete, setDidDelete] = useState(false)

    useEffect(() => {
        getActiveYears()
    }, [])

    useEffect(() => {
        getActiveMonths()
    }, [currentYear])

    useEffect(() => {
        if (!isEditing) {
            getRetrospectives()
        }
    }, [start, end, currentMonth])

    useEffect(() => {
        if (!isEditing) {
            setModalActive(false)
        }
    }, [isEditing])

    useEffect(() => {
        if (didDelete) {
            setDidDelete(false)
            getRetrospectives()
        }
    }, [didDelete])


    //  HANDLER FUNCTIONS

    /**
     * Toggles the new button container as active
     */
    function toggleNew() {
        setNewActive(!newActive)
    }

    /**
     * Toggles the modal active or inactive
     *
     * @param shouldCancel should clear the form
     * @param modType type of modal (note or audio)
     */
    function toggleModal(shouldCancel: boolean, modType: string) {

        if (shouldCancel) {
            resetForm()
        }

        setModalActive(!modalActive)
        setRetroType(modType)
    }

    /**
     * Handler for selecting a month
     *
     * @param e change event
     */
    function handleMonthChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentMonth(target.value)
        setStart(formatDate(target.value, CoreConstants.DateTime.ISODateFormat))
        setEnd(formatDateMoment(getDate(target.value).add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
    }

    /**
     * Handler for selecting a year
     *
     * @param e change event
     */
    function handleYearChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentYear(target.value)
    }


    //  GENERAL FUNCTIONS

    /**
     * Resets form data
     */
    function resetForm() {
        setFormData({
            intervalFrequency: 'WEEKLY',
            startDate: '',
            endDate: '',
            points: []
        })
        setIsEditing(false)
    }

    /**
     * Returns true if there aren't any retrospectives
     */
    function isEmpty() {
        return !retros || retros.length === 0
    }

    /**
     * Performs an API call to get the active years (years that contain retrospectives)
     */
    async function getActiveYears() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.Retrospective.ActiveYears)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setCurrentYear(response.data[0])
            setActiveYears(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Performs an API call to get the active months (months that contain retrospectives)
     */
    async function getActiveMonths() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Retrospective.ActiveMonths
                .replace('{year}', formatDate(currentYear, CoreConstants.DateTime.ISOYearFormat))
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            const startIndex = 0
            setCurrentMonth(response.data[startIndex])
            setActiveMonths(response.data)
            setStart(formatDate(response.data[startIndex], CoreConstants.DateTime.ISODateFormat))
            setEnd(formatDateMoment(getDate(response.data[startIndex]).add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Performs an API call to fetch retrospectives
     */
    async function getRetrospectives() {

        setIsLoading(true)

        const d = await get(
            CoreConstants.ApiUrls.Retrospective.List
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{interval}', selectedInterval)
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setRetros(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Edit handler
     *
     * @param val1 retro uid
     */
    async function handleEdit(val1: string) {
        setIsEditing(true)
        //await this.getRetrospective(val1)
    }

    /**
     * Delete handler
     *
     * @param val1 retro uid
     */
    async function handleDelete(val1: string) {
        await deleteRetrospective(val1)
    }

    /**
     * Performs an API call to create a new retro
     *
     * @param val form data
     */
    async function createRetrospective(val: any) {

        setIsLoading(true)

        val.startDate = formatDateMoment(getDate(val.startDate), CoreConstants.DateTime.ISODateFormat)
        val.endDate = formatDateMoment(getDate(val.endDate), CoreConstants.DateTime.ISODateFormat)

        const d = await post(CoreConstants.ApiUrls.Retrospective.Create, {'retrospective': val})
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setRetros(response.data)
        }

        setIsLoading(false)
        resetForm()

        return {}
    }

    /**
     * Submits the form for creating a new retro
     *
     * @param val form data
     */
    async function handleSubmit(val: any) {
        await createRetrospective(val)
    }

    /**
     * Performs the API call to delete a retro
     *
     * @param val1 retro uid
     */
    async function deleteRetrospective(val1: string) {

        setIsLoading(true)

        try {
            const result = await cDelete(CoreConstants.ApiUrls.Retrospective.Delete.replace('{uid}', val1))
            let response: StandardJsonResponse = JSON.parse(result)
            if (response.success && hasData(response.data)) {
                setDidDelete(true)
            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err, 'error')
        }

        setIsLoading(false)
    }


    //  RENDER

    if (!retros || retros.length === 0) {
        return (
            <>
                <Helmet>
                    <title>CTrader | Retrospectives</title>
                </Helmet>
                <div className="ct-retrospectives-page">
                    <div className="ct-retrospectives-page__disclaimer-container has-text-centered">
                        <p>Your retrospectives would appear here. Consider taking some time to reflect on previous
                            performances.</p>
                    </div>

                    <div className="floating-buttons-container">
                        <button className="button is-floating is-lead is-primary is-vcentered has-text-centered"
                                onClick={toggleNew}>
                        <span className="is-size-3" style={{marginTop: "5px"}}>
                            <HiPlus/>
                        </span>
                        </button>

                        <div className={"floating-sub-container" + (newActive ? '' : ' no-show ')}>
                            <div className="button-container">
                                <button className="button"
                                        onClick={() => toggleModal(true, RetrospectiveType.NOTE.code)}>
                                <span className="icon">
                                    <TfiWrite/>
                                </span>
                                </button>
                            </div>
                            <div className="button-container">
                                <button className="button" onClick={() => toggleModal(true, 'audio')}>
                                <span className="icon">
                                    <AiFillAudio/>
                                </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <CreateRetrospectiveModal
                        modalActive={modalActive && retroType === RetrospectiveType.NOTE.code}
                        closeHandler={() => toggleModal(true, RetrospectiveType.NOTE.code)}
                        handleSubmit={handleSubmit}
                        retroData={formData}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>CTrader | Retrospectives</title>
            </Helmet>
            <div className="ct-retrospectives-page">
                <div className="ct-retrospectives-page__header">
                    <div className="level is-mobile">
                        <div className="level-left">
                            <div className="level-item">
                                <h4 className="ct-retrospectives-page__header__title">
                                    {formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}
                                </h4>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="control">
                                    <div className="select">
                                        <select value={currentYear} onChange={handleYearChange}>
                                            {
                                                activeYears?.map((item, key) => {
                                                    const val = moment(item.year)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key}>
                                                            {val.format(CoreConstants.DateTime.ISOYearFormat)}
                                                        </option>
                                                    )
                                                }) ?? null
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="level-item">
                                <div className="control">
                                    <div className="select">
                                        <select value={currentMonth} onChange={handleMonthChange}>
                                            {
                                                activeMonths?.map((item, key) => {
                                                    const val = moment(item.month)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key}>
                                                            {val.format(CoreConstants.DateTime.ISOMonthFormat)}
                                                        </option>
                                                    )
                                                }) ?? null
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="is-primary"/>

                <div className="columns is-multiline is-mobile">
                    {
                        retros?.map((item: any, key) => {
                            return (
                                <div className="column is-12" key={key}>
                                    {
                                        item.retrospectiveType === 'NOTE' ?
                                            <NoteRetrospective
                                                interval={selectedInterval}
                                                showTotals={true}
                                                isLoading={isLoading}
                                                retro={item}
                                                editHandler={handleEdit}
                                                deleteHandler={handleDelete}
                                                showCrud={true}
                                            />
                                            :
                                            null
                                    }
                                </div>
                            )
                        }) ?? null
                    }
                </div>

                <div className="floating-buttons-container">
                    <button className="button is-floating is-lead is-primary is-vcentered has-text-centered"
                            onClick={toggleNew}>
                        <span className="is-size-3" style={{marginTop: "5px"}}>
                            <HiPlus/>
                        </span>
                    </button>

                    <div className={"floating-sub-container" + (newActive ? '' : ' no-show ')}>
                        <div className="button-container">
                            <button className="button" onClick={() => toggleModal(true, RetrospectiveType.NOTE.code)}>
                                <span className="icon">
                                    <TfiWrite/>
                                </span>
                            </button>
                        </div>
                        <div className="button-container">
                            <button className="button" onClick={() => toggleModal(true, 'audio')}>
                                <span className="icon">
                                    <AiFillAudio/>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <CreateRetrospectiveModal
                    modalActive={modalActive && retroType === RetrospectiveType.NOTE.code}
                    closeHandler={() => toggleModal(true, RetrospectiveType.NOTE.code)}
                    handleSubmit={handleSubmit}
                    retroData={formData}
                />
            </div>
        </>
    )
}

export default RetrospectivesPage;