import BaseModal from "../../BaseModal";
import {ChangeEvent, useState} from "react";
import {CoreConstants} from "../../../../constants/CoreConstants";
import moment from "moment";
import {formatDateMoment} from "../../../../services/datetime/DateTimeService";
import DatePicker from "react-datepicker"
import {post} from "../../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData from "../../../../services/data/DataIntegrityService";

function CreateBalanceHistoryEntryModal({active = false, closeHandler}: { active: boolean, closeHandler: Function, }) {

    const [isLoading, setIsLoading] = useState(false)
    const [textAreaValue, setTextAreaValue] = useState('')
    const [amount, setAmount] = useState(0)
    const [type, setType] = useState(0)
    const [datePicker, setDatePicker] = useState(new Date())
    const [date, setDate] = useState('')


    //  HANDLER FUNCTIONS

    /**
     * Handles capturing amount
     *
     * @param e val
     */
    function handleAmountChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        setAmount(parseFloat(target.value))
    }

    /**
     * Handles selecting date
     *
     * @param val value
     */
    function handleDateChange(val: any) {
        if (val) {
            const start = moment(val)
            setDate(formatDateMoment(start, CoreConstants.DateTime.ISODateFormat))
            setDatePicker(start.toDate())
        }
    }

    /**
     * Handles capturing description
     *
     * @param e val
     */
    function handleTextChange(e: ChangeEvent) {
        const target = e.target as HTMLTextAreaElement
        setTextAreaValue(target.value)
    }

    /**
     * Handles selecting type of entry
     *
     * @param e val
     */
    function handleTypeChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setType(parseInt(target.value))
    }


    //  GENERAL FUNCTIONS

    async function addEntry() {

        setIsLoading(true)

        try {
            const body = {
                'modification': {
                    dateTime: date,
                    amount: amount,
                    type: type,
                    description: textAreaValue
                }
            }

            const result = await post(CoreConstants.ApiUrls.Account.CreateBalanceModification, body)
            let response: StandardJsonResponse = JSON.parse(result)
            if (response.success && hasData(response.data)) {
                window.location.reload()
            } else {
                console.log('error')
            }
        } catch (err) {
            console.log(err, 'error')
        }

        setIsLoading(false)
    }


    //  RENDER

    let content =
        <>
            <div className="columns is-multiline is-mobile">
                <div className="column is-12">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label"></label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <h6 className="sub-header">
                                        For withdrawals or negative balances, please put a negative sign (-) before the
                                        amount.
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Date</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <DatePicker selected={datePicker} onChange={(date) => handleDateChange(date)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Amount</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control">
                                    <input className="input" type="number" placeholder="350.0"
                                           value={amount} onChange={(e) => handleAmountChange(e)}/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Type</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <p className="control">
                                    <div className="select">
                                        <select value={type} onChange={(e) => handleTypeChange(e)}>
                                            <option value={0}>One-time Deposit</option>
                                            <option value={1}>One-time Withdrawal</option>
                                            <option value={2}>Recurring Deposit</option>
                                            <option value={3}>Recurring Withdrawal</option>
                                        </select>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-12">
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Description</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <textarea
                                        className="textarea "
                                        value={textAreaValue}
                                        onChange={(e) => handleTextChange(e)}
                                        placeholder="Enter a description"
                                        rows={3}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    return (
        <>
            <BaseModal
                active={active}
                title={'Add New Entry'}
                hasControls={true}
                closeHandler={closeHandler}
                content={[content]}
                submitHandler={addEntry}
                cssClasses={'ct-account-balance-history-create-modal'}
                isLoading={isLoading}
            />
        </>
    )
}

export default CreateBalanceHistoryEntryModal;