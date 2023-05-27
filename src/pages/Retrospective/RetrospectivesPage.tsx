import {Helmet} from "react-helmet";
import {ChangeEvent, useEffect, useState} from "react";
import {CreateRetrospectiveForm, RetrospectiveType} from "../../types/ui-types";
import SimpleButton from "../../components/Buttons/SimpleButton";
import CreateRetrospectiveModal from "../../components/Modals/Retrospective/CreateRetrospectiveModal";
import {ActiveMonthInfo, ActiveYearInfo, StandardJsonResponse} from "../../types/api-types";
import {formatDate, formatDateMoment, getDate, now} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import get, {post} from "../../services/client/ClientService";
import hasData from "../../services/data/DataIntegrityService";
import moment from "moment";
import NoteRetrospective from "../../components/Retrospective/NoteRetrospective";

/**
 * Component that renders the retrospectives page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function RetrospectivesPage() {

    const [isLoading, setIsLoading] = useState(false)
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


    //  HANDLER FUNCTIONS

    function toggleModal(shouldCancel: boolean, modType: string) {

        if (shouldCancel) {
            resetForm()
        }

        setModalActive(!modalActive)
        setRetroType(modType)
    }

    function handleMonthChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentMonth(target.value)
        setStart(formatDate(target.value, CoreConstants.DateTime.ISODateFormat))
        setEnd(formatDateMoment(getDate(target.value).add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
    }

    function handleYearChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setCurrentYear(target.value)
    }


    //  GENERAL FUNCTIONS

    function resetForm() {
        setFormData({
            intervalFrequency: 'WEEKLY',
            startDate: '',
            endDate: '',
            points: []
        })
        setIsEditing(false)
    }

    function isEmpty() {
        return !retros || retros.length === 0
    }

    async function getActiveYears() {

        setIsLoading(true)

        const d = get(
            CoreConstants.ApiUrls.Retrospective.ActiveYears
        )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setCurrentYear(response.data[0])
                setActiveYears(response.data)
            }
        })

        setIsLoading(false)

        return {}
    }

    async function getActiveMonths() {

        setIsLoading(true)

        const d = get(
            CoreConstants.ApiUrls.Retrospective.ActiveMonths
                .replace('{year}', formatDate(currentYear, CoreConstants.DateTime.ISOYearFormat))
        )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                const startIndex = 0
                setCurrentMonth(response.data[startIndex])
                setActiveMonths(response.data)
                setStart(formatDate(response.data[startIndex], CoreConstants.DateTime.ISODateFormat))
                setEnd(formatDateMoment(getDate(response.data[startIndex]).add(1, 'months'), CoreConstants.DateTime.ISODateFormat))
            }
        })

        setIsLoading(false)

        return {}
    }

    async function getRetrospectives() {

        setIsLoading(true)

        const d = get(
            CoreConstants.ApiUrls.Retrospective.List
                .replace('{start}', start)
                .replace('{end}', end)
                .replace('{interval}', selectedInterval)
        )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                console.log(response.data)
                setRetros(response.data)
            }
        })

        setIsLoading(false)

        return {}
    }

    async function handleEdit(val1: string) {
        setIsEditing(true)
        //await this.getRetrospective(val1)
    }

    async function handleDelete(val1: string) {
        //await this.deleteRetrospective(val1)
    }

    async function createRetrospective(val: any) {

        setIsLoading(true)

        val.startDate = formatDateMoment(getDate(val.startDate), CoreConstants.DateTime.ISODateFormat)
        val.endDate = formatDateMoment(getDate(val.endDate), CoreConstants.DateTime.ISODateFormat)

        const d = post(CoreConstants.ApiUrls.Retrospective.Create, {'retrospective': val})
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setRetros(response.data)
            }
        })

        setIsLoading(false)
        resetForm()

        return {}
    }

    async function handleSubmit(val: any) {
        await createRetrospective(val)
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Retrospectives</title>
            </Helmet>
            <div className="ct-retrospectives-page">
                <div className="ct-retrospectives-page__header">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <h4>Retrospectives
                                    for {formatDate(start, CoreConstants.DateTime.ISOMonthYearFormat)}</h4>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className="control">
                                    <div className="select">
                                        <select value={currentYear} onChange={handleYearChange}>
                                            {
                                                activeYears && activeYears.map((item, key) => {
                                                    const val = moment(item.year)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key}>
                                                            {val.format(CoreConstants.DateTime.ISOYearFormat)}
                                                        </option>
                                                    )
                                                })
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
                                                activeMonths && activeMonths.map((item, key) => {
                                                    const val = moment(item.month)
                                                    return (
                                                        <option value={val.format(CoreConstants.DateTime.ISODateFormat)}
                                                                key={key}>
                                                            {val.format(CoreConstants.DateTime.ISOMonthFormat)}
                                                        </option>
                                                    )
                                                })
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
                        retros && retros.map((item, key) => {
                            return (
                                <div className="column is-12" key={key}>
                                    <NoteRetrospective
                                        interval={selectedInterval}
                                        showTotals={true}
                                        isLoading={isLoading}
                                        retro={item}
                                        editHandler={handleEdit}
                                        deleteHandler={handleDelete}
                                        showCrud={true}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                <SimpleButton text={'Click Me'} handler={() => toggleModal(true, RetrospectiveType.NOTE.code)}/>

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