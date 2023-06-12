import {HiOutlineUser} from "react-icons/hi";
import {MdAlternateEmail, MdOutlineEmail, MdOutlineSubtitles} from "react-icons/md";
import {TfiLocationPin} from "react-icons/tfi";
import {ImPhone} from "react-icons/im";
import {TbMoodHappy} from "react-icons/tb";
import {ChangeEvent, useState} from "react";
import {CoreConstants} from "../../constants/CoreConstants";
import {post} from "../../services/client/ClientService";
import {StandardJsonResponse} from "../../types/api-types";
import SimpleButton from "../../components/Buttons/SimpleButton";
import {Helmet} from "react-helmet";

/**
 * Contact page, allowing users to send messages to the admin
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function ContactPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });


    //  HANDLER FUNCTIONS

    /**
     * Handles the name change
     *
     * @param e event change
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
     * Handles the email change
     *
     * @param e event change
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
     * Handles the subject change
     *
     * @param e event change
     */
    function handleSubjectChange(e: ChangeEvent) {

        const target = e.target as HTMLInputElement
        setFormError(false)
        setIsSuccess(false)
        setForm(prevState => {
            return {...prevState, subject: target.value}
        })
    }

    /**
     * Handles the message change
     *
     * @param e event change
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
     * Handles the submission of the form
     */
    async function handleSubmit() {

        if (!validateForm()) {
            setFormError(true)
        } else {
            try {
                setIsLoading(true)

                const result = await post(CoreConstants.ApiUrls.System.Contact, {'contact': form})
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
     * Validates the form, making sure no inputs are empty
     */
    function validateForm() {
        return (
            form['name'].length > 0 &&
            form['email'].length > 0 &&
            form['subject'].length > 0 &&
            form['message'].length > 0
        )
    }

    /**
     * Shows as error if the field is empty
     *
     * @param key field
     */
    function isError(key: string) {
        // @ts-ignore
        return formError && form[key].length === 0
    }

    /**
     * Resets the form inputs
     */
    function resetForm() {
        setForm({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Report an Issue</title>
            </Helmet>
            <div className="ct-contact-page">
                <div className="container">
                    <div className="columns is-multiline is-mobile is-gapless">
                        <div className="column is-4-desktop is-12-tablet is-12-mobile highlighted">
                            <div className="highlighted-content">
                                <h2>Let's talk!</h2>
                                <p>
                                    Have any questions or concerns?<br/>We're here for you!
                                </p>
                                <div className="columns is-multiline is-mobile is-vcentered">
                                    <div className="column is-3 has-text-centered">
                                        <div>
                                            <span className="icon is-large">
                                                <TfiLocationPin/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="column is-9">
                                        507 Place d'Armes, Suite 300,<br/>Montreal, QC H2Y 2W8
                                    </div>
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
                        <div className="column is-8-desktop is-12-tablet is-12-mobile">
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
                                                        onChange={(e) => handleNameChange(e)}
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
                                                        onChange={(e) => handleEmailChange(e)}
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
                                            <label className="label">Subject</label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <div className="control has-icons-left">
                                                    <input
                                                        className={"input" + (isError('subject') ? ' is-danger ' : '')}
                                                        type="text"
                                                        placeholder="Say Hello!"
                                                        value={form.subject}
                                                        onChange={(e) => handleSubjectChange(e)}
                                                    />
                                                    <span className="icon is-small is-left">
                                                      <MdOutlineSubtitles/>
                                                    </span>
                                                </div>
                                                {
                                                    isError('subject') ?
                                                        <p className="help is-danger">
                                                            A subject is required
                                                        </p>
                                                        :
                                                        null
                                                }
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
                                                        placeholder="How can we help?"
                                                        value={form.message}
                                                        onChange={(e) => handleMessageChange(e)}
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
                                                        text={'Send Message'}
                                                        variant={'primary'}
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

export default ContactPage;