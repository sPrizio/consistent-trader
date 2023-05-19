import {ChangeEvent, useState} from "react";
import {CoreConstants} from "../../constants/CoreConstants";
import {post} from "../../services/client/ClientService";
import {StandardJsonResponse} from "../../types/api-types";
import {ImPhone} from "react-icons/im";
import {MdAlternateEmail, MdOutlineEmail} from "react-icons/md";
import {TbMoodHappy} from "react-icons/tb";
import {HiOutlineUser} from "react-icons/hi";
import {IoMdWarning} from "react-icons/io";
import SimpleButton from "../../components/Buttons/SimpleButton";
import {Helmet} from "react-helmet";

/**
 * The report issue page, allowing users to report issues with the app
 *
 * @author Stephen Prizio
 * @version 1.0
 */
export function ReportIssuePage() {

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formError, setFormError] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        severity: 'low',
        message: ''
    })


    //  HANDLER FUNCTIONS

    /**
     * Handles capturing changes to the input value
     *
     * param e change event
     */
    function handleNameChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        setFormError(false)
        setIsSuccess(false)
        setForm(prevState => {
            return {...prevState, name: target.value}
        })
    }

    /**
     * Handles capturing changes to the input value
     *
     * param e change event
     */
    function handleEmailChange(e: ChangeEvent) {
        const target = e.target as HTMLInputElement
        setFormError(false)
        setIsSuccess(false)
        setForm(prevState => {
            return {...prevState, email: target.value}
        })
    }

    /**
     * Handles capturing changes to the input value
     *
     * param e change event
     */
    function handleSeverityChange(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement
        setFormError(false)
        setIsSuccess(false)
        setForm(prevState => {
            return {...prevState, severity: target.value}
        })
    }

    /**
     * Handles capturing changes to the input value
     *
     * param e change event
     */
    function handleMessageChange(e: ChangeEvent) {
        const target = e.target as HTMLTextAreaElement
        setFormError(false)
        setIsSuccess(false)
        setForm(prevState => {
            return {...prevState, message: target.value}
        })
    }

    /**
     * Handles submitting the form
     */
    async function handleSubmit() {

        if (!validateForm()) {
            setFormError(true)
        } else {
            try {
                setIsLoading(true)
                const result = await post(CoreConstants.ApiUrls.System.Report, {'report': form})
                let response: StandardJsonResponse = JSON.parse(result)
                if (response.success) {
                    setIsSuccess(true)
                    resetForm()
                } else {
                    console.log('error')
                }
            } catch (e) {
                console.log(e)
            }
        }

        setIsLoading(false)
    }


    //  GENERAL FUNCTIONS

    /**
     * Validates that no entries in the form are erroneous
     */
    function validateForm() {
        return (
            form['name'].length > 0 &&
            form['email'].length > 0 &&
            form['message'].length > 0
        )
    }

    /**
     * Adds error flag to inputs per key
     * @param key
     */
    function isError(key: string) {
        // @ts-ignore
        return formError && form[key].length === 0
    }

    /**
     * Clears the form of any values
     */
    function resetForm() {
        setForm({
            name: '',
            email: '',
            severity: 'low',
            message: ''
        })
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Report an Issue</title>
            </Helmet>
            <div className="ct-report-issue-page">
                <div className="container">
                    <div className="columns is-multiline is-mobile is-gapless">
                        <div className="column is-4 highlighted">
                            <div className="highlighted-content">
                                <h2>Something not quite right?</h2>
                                <p>
                                    Noticing a discrepancy, numbers not adding up or something that just doesn't look
                                    right? Let us know and we'll take care of it!
                                </p>
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-3 has-text-centered">
                                        <div>
                                        <span className="icon is-large">
                                            <ImPhone/>
                                        </span>
                                        </div>
                                    </div>
                                    <div className="column is-9">
                                        (514) 941-1025
                                    </div>
                                    <div className="column is-3 has-text-centered">
                                        <div>
                                        <span className="icon is-large">
                                            <MdOutlineEmail/>
                                        </span>
                                        </div>
                                    </div>
                                    <div className="column is-9">
                                        support@ctrader.com
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-8">
                            <div className="card reset-borders">
                                <div className="card-content">
                                    {
                                        isSuccess ?
                                            <div className="notification is-success">
                                            <span className="icon-text">
                                                <span>
                                                    Your message was successfully received. We'll
                                                    be in touch!
                                                </span>
                                                <span className="icon is-size-1">
                                                    <TbMoodHappy/>
                                                </span>
                                            </span>
                                            </div>
                                            :
                                            null
                                    }
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Name</label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control is-expanded has-icons-left">
                                                    <input
                                                        className={"input" + (isError('name') ? ' is-danger ' : '')}
                                                        type="text" placeholder="Name"
                                                        value={form.name}
                                                        onChange={handleNameChange}
                                                    />
                                                    <span className="icon is-small is-left">
                                                    <HiOutlineUser/>
                                                </span>
                                                </div>
                                                {
                                                    isError('name') ?
                                                        <p className="help is-danger">
                                                            Your name is required
                                                        </p>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Email</label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control is-expanded has-icons-left">
                                                    <input
                                                        className={"input" + (isError('email') ? ' is-danger ' : '')}
                                                        type="email"
                                                        placeholder="Email"
                                                        value={form.email}
                                                        onChange={handleEmailChange}
                                                    />
                                                    <span className="icon is-small is-left">
                                                      <MdAlternateEmail/>
                                                    </span>
                                                </div>
                                                {
                                                    isError('email') ?
                                                        <p className="help is-danger">
                                                            Your email is required
                                                        </p>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Severity</label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control has-icons-left">
                                                    <div className="select">
                                                        <select value={form.severity}
                                                                onChange={handleSeverityChange}>
                                                            <option value={'low'}>Low</option>
                                                            <option value={'moderate'}>Moderate</option>
                                                            <option value={'severe'}>Severe</option>
                                                        </select>
                                                        <span className="icon is-small is-left">
                                                          <IoMdWarning/>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Message</label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control">
                                                    <textarea
                                                        className={"textarea" + (isError('message') ? ' is-danger ' : '')}
                                                        placeholder="Description of issue / Steps to recreate"
                                                        value={form.message}
                                                        onChange={handleMessageChange}
                                                    />
                                                    {
                                                        isError('message') ?
                                                            <p className="help is-danger">
                                                                A message is required
                                                            </p>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label">
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control">
                                                    <SimpleButton
                                                        loading={isLoading}
                                                        variant={'primary'}
                                                        text={'Send Message'}
                                                        handler={handleSubmit}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportIssuePage;