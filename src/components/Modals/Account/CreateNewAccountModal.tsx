import BaseModal from "../BaseModal";
import {useEffect, useState} from "react";
import get, {post} from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData from "../../../services/data/DataIntegrityService";

/**
 * Renders a modal that is used for creating new accounts
 *
 * @param active modal active
 * @param closeHandler closes the modal
 * @author Stephen Prizio
 * @version 1.0
 */
function CreateNewAccountModal({active = false, closeHandler}: { active: boolean, closeHandler: Function }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [accData, setAccData] = useState({
        currencies: [],
        accountTypes: [],
        brokers: [],
        stopTypes: [],
        tradePlatforms: []
    })
    const [accName, setAccName] = useState<string>('')
    const [accNumber, setAccNumber] = useState<string>('')
    const [accBalance, setAccBalance] = useState<number>()
    const [accCurrency, setAccCurrency] = useState<string>('USD')
    const [accType, setAccType] = useState<string>('SHARES')
    const [accBroker, setAccBroker] = useState<string>('CMC_MARKETS')
    const [accDailyStop, setAccDailyStop] = useState<number>()
    const [accDailyStopType, setAccDailyStopType] = useState<string>('PROFIT')
    const [accTradePlatform, setAccTradePlatform] = useState<string>('METATRADER4')

    useEffect(() => {

        setIsLoading(true)

        getCurrencies()
        getAccountTypes()
        getBrokers()
        getStopTypes()
        getTradePlatforms()

        setIsLoading(false)
    }, [])


    //  GENERAL FUNCTIONS

    /**
     * Resets the data used in the form submission
     */
    function resetForm() {
        setAccName('')
        setAccNumber('')
        setAccBalance(undefined)
        setAccCurrency('USD')
        setAccType('SHARES')
        setAccBroker('CMC_MARKETS')
        setAccDailyStop(undefined)
        setAccDailyStopType('PROFIT')
        setAccTradePlatform('METATRADER4')
        setHasError(false)
    }

    /**
     * Validates the form's required values are not empty
     */
    function validateForm() {
        const nameValid = accName.length > 0
        const numberValid = accNumber.length > 0
        const balanceValid = accBalance !== undefined
        const currencyValid = accCurrency.length > 0
        const typeValid = accType.length > 0
        const brokerValid = accBroker.length > 0
        const dailyStopValid = accDailyStop !== undefined
        const dailyStopTypeValid = accDailyStopType.length > 0
        const tradePlatformValid = accTradePlatform.length > 0

        return nameValid && numberValid && balanceValid && currencyValid && typeValid && brokerValid && dailyStopValid && dailyStopTypeValid && tradePlatformValid
    }

    /**
     * API call to fetch the currencies
     */
    async function getCurrencies() {

        const d = await get(CoreConstants.ApiUrls.Account.GetCurrencies)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAccData(prevState => {
                return {...prevState, currencies: response.data}
            })
        }

        return {}
    }

    /**
     * API call to fetch the account types
     */
    async function getAccountTypes() {

        const d = await get(CoreConstants.ApiUrls.Account.GetAccountTypes)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAccData(prevState => {
                return {...prevState, accountTypes: response.data}
            })
        }

        return {}
    }

    /**
     * API call to fetch the brokers
     */
    async function getBrokers() {

        const d = await get(CoreConstants.ApiUrls.Account.GetBrokers)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAccData(prevState => {
                return {...prevState, brokers: response.data}
            })
        }

        return {}
    }

    /**
     * API call to fetch the daily stop types
     */
    async function getStopTypes() {

        const d = await get(CoreConstants.ApiUrls.Account.GetStopTypes)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAccData(prevState => {
                return {...prevState, stopTypes: response.data}
            })
        }

        return {}
    }

    /**
     * API call to fetch the trade platforms
     */
    async function getTradePlatforms() {

        const d = await get(CoreConstants.ApiUrls.Account.GetTradePlatforms)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setAccData(prevState => {
                return {...prevState, tradePlatforms: response.data}
            })
        }

        return {}
    }

    /**
     * API call to submit creating a new account
     */
    async function submit() {

        setIsLoading(true)
        validateForm()

        if (!hasError) {
            const result = await post(CoreConstants.ApiUrls.System.Contact, {
                'account': {
                    name: accName,
                    number: accNumber,
                    balance: accBalance,
                    currency: accCurrency,
                    type: accType,
                    broker: accBroker,
                    dailyStop: accDailyStop,
                    dailyStopType: accDailyStopType,
                    tradePlatform: accTradePlatform
                }
            })
            let response: StandardJsonResponse = JSON.parse(result)
            if (response.success) {
                setHasError(false)
                resetForm()
                window.location.reload()
            } else {
                console.log('error')
            }
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    let content =
        <>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">General Info</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded">
                            <input
                                value={accName}
                                className="input"
                                type="text"
                                placeholder="Account Name"
                                onChange={e => setAccName(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control is-expanded">
                            <input
                                value={accNumber}
                                className="input"
                                type="text"
                                placeholder="Account Number"
                                onChange={e => setAccNumber(e.target.value)}
                            />
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label"/>
                <div className="field-body">
                    <div className="field is-expanded">
                        <div className="field has-addons">
                            <p className="control">
                                <span className="select">
                                  <select value={accCurrency} onChange={e => setAccCurrency(e.target.value)}>
                                      {
                                          accData?.currencies?.map((item: any, key) => {
                                              return (
                                                  <option value={item.code}
                                                          key={key}>{item.code}&nbsp;({item.symbol})</option>
                                              )
                                          }) ?? null
                                      }
                                  </select>
                                </span>
                            </p>
                            <p className="control is-expanded">
                                <input
                                    value={accBalance}
                                    className="input"
                                    type="number"
                                    placeholder="Starting Balance"
                                    onChange={e => setAccBalance(parseFloat(e.target.value))}
                                />
                            </p>
                        </div>
                        <p className="help">Currency can be changed at anytime within User Locale</p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Account Type</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={accType} onChange={e => setAccType(e.target.value)}>
                                    {
                                        accData?.accountTypes?.map((item: any, key) => {
                                            return (
                                                <option value={item.code} key={key}>{item.label}</option>
                                            )
                                        }) ?? null
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Broker</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={accBroker} onChange={e => setAccBroker(e.target.value)}>
                                    {
                                        accData?.brokers?.map((item: any, key) => {
                                            return (
                                                <option value={item.code} key={key}>{item.label}</option>
                                            )
                                        }) ?? null
                                    }
                                </select>
                            </div>
                        </div>
                        <p className="help">
                            If your broker is not listed, please select <em>N/A</em>.
                            Our system will be alerted and we will look into getting your broker integrated
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Daily Stop Info</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded">
                            <input
                                value={accDailyStop}
                                className="input"
                                type="number"
                                placeholder="Daily Stop Limit"
                                onChange={e => setAccDailyStop(parseFloat(e.target.value))}
                            />
                        </p>
                    </div>
                    <div className="field">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={accDailyStopType} onChange={e => setAccDailyStopType(e.target.value)}>
                                    {
                                        accData?.stopTypes?.map((item: any, key) => {
                                            return (
                                                <option value={item.code} key={key}>{item.label}</option>
                                            )
                                        }) ?? null
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Trading Platform</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select value={accTradePlatform} onChange={e => setAccTradePlatform(e.target.value)}>
                                    {
                                        accData?.tradePlatforms?.map((item: any, key) => {
                                            return (
                                                <option value={item.code} key={key}>{item.label}</option>
                                            )
                                        }) ?? null
                                    }
                                </select>
                            </div>
                        </div>
                        <p className="help">
                            If your platform is not listed, please select <em>N/A</em>.
                            We are constantly adding new integrations so your platform will be updated soon enough
                        </p>
                    </div>
                </div>
            </div>
        </>

    return (
        <>
            <BaseModal
                isLoading={isLoading}
                title={'Add a New Account'}
                content={[content]}
                submitHandler={() => submit()}
                active={active}
                hasControls={true}
                closeHandler={closeHandler}
            />
        </>
    )
}

export default CreateNewAccountModal;