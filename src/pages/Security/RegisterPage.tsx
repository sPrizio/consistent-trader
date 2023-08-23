import SimpleButton from "../../components/Buttons/SimpleButton";
import {useEffect, useState} from "react";
import get from "../../services/client/ClientService";
import {CoreConstants} from "../../constants/CoreConstants";
import {StandardJsonResponse} from "../../types/api-types";
import hasData from "../../services/data/DataIntegrityService";
import {displayString} from "../../services/data/FormattingService";
import {MultiSelect} from "react-multi-select-component";
import Autocomplete from "react-autocomplete";

/**
 * Renders the registration page
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function RegisterPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [countryCodes, setCountryCodes] = useState([])
    const [phoneTypes, setPhoneTypes] = useState([])
    const [countries, setCountries] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [languages, setLanguages] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const [countryCode, setCountryCode] = useState('1')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [phoneType, setPhoneType] = useState('MOBILE')

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('CANADA')
    const [timeZone, setTimeZone] = useState('')
    const [tzSearch, setTzSearch] = useState('')
    const [currency, setCurrency] = useState('CAD')
    const [userLanguages, setUserLanguages] = useState<Array<any>>([])

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [timeZones, setTimeZones] = useState('')

    useEffect(() => {
        getCountryCodes()
        getPhoneTypes()
        getCountries()
        getCurrencies()
        getLanguages()
    }, [])

    useEffect(() => {
        setTimeout(() => getTimeZones(), 1500)
    }, [tzSearch])


    //  GENERAL FUNCTIONS

    /**
     * Fetches the country codes
     */
    async function getCountryCodes() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.CountryCodes)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setCountryCodes(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Fetches the phone types
     */
    async function getPhoneTypes() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.PhoneTypes)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setPhoneTypes(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Fetches the countries
     */
    async function getCountries() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.Countries)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setCountries(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Fetches the currencies
     */
    async function getCurrencies() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.Currencies)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setCurrencies(response.data)
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Fetches the languages
     */
    async function getLanguages() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.Languages)
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setLanguages(response.data)
            setLanguages(response.data.map((item: string) => {
                return {
                    value: item,
                    label: displayString(item)
                }
            }))
        }

        setIsLoading(false)

        return {}
    }

    /**
     * Fetches the timezones
     */
    async function getTimeZones() {

        setIsLoading(true)

        const d = await get(CoreConstants.ApiUrls.User.TimeZones.replace('{query}', tzSearch))
        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            setTimeZones(response.data)
        }

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <div className="ct-register-page">
                <div className="ct-register-page__container">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                Registration Form
                            </div>
                            <div className="card-form">
                                <div className="columns is-multiline is-vcentered is-mobile">
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">First Name</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="John"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Last Name</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="Doe"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="email"
                                                    placeholder="john.doe@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Username</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="john.doe"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                                        <label className="label">Phone Number</label>
                                    </div>
                                    <div className="column is-9-desktop is-12-tablet is-12-mobile">
                                        <div className="field has-addons">
                                            <div className="control">
                                                <span className="select">
                                                  <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                                      {
                                                          countryCodes?.map(c => {
                                                              return <option key={c} value={c}>+{c}</option>
                                                          }) ?? null
                                                      }
                                                  </select>
                                                </span>
                                            </div>
                                            <div className="control is-expanded">
                                                <input
                                                    className="input"
                                                    type="tel"
                                                    placeholder="5551239688"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>
                                            <div className="control">
                                                <span className="select">
                                                  <select value={phoneType} onChange={(e) => setPhoneType(e.target.value)}>
                                                      {
                                                          phoneTypes?.map(t => {
                                                              return <option key={t} value={t}>{displayString(t)}</option>
                                                          }) ?? null
                                                      }
                                                  </select>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <div className="field">
                                                <label className="label">City</label>
                                                <div className="control">
                                                    <input
                                                        className="input"
                                                        type="text"
                                                        placeholder="Montreal"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Country</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                                        {
                                                            countries?.map(c => {
                                                                // @ts-ignore
                                                                return <option key={c} className="country-display" value={c}>{displayString(c)}</option>
                                                            }) ?? null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-4-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Timezone</label>
                                            <div className={"control timezone" + (isLoading ? ' is-loading ' : '')}>
                                                <Autocomplete
                                                    getItemValue={(item) => item.label}
                                                    items={[
                                                        { label: 'apple' },
                                                        { label: 'banana' },
                                                        { label: 'pear' }
                                                    ]}
                                                    renderInput={(props) => {
                                                        return <input className="input is-fullwidth" placeholder="America/Montreal" {...props} />
                                                    }}
                                                    renderMenu={(items, value, style) => {
                                                        return <div className="autocomplete-results" children={items}/>
                                                    }}
                                                    renderItem={(item, isHighlighted) =>
                                                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                                            {item.label}
                                                        </div>
                                                    }
                                                    value={timeZone}
                                                    onChange={(e) => setTzSearch(e.target.value)}
                                                    onSelect={(val) => setTimeZone(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Currency</label>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                                        {
                                                            currencies?.map(c => {
                                                                return <option key={c} value={c}>{c}</option>
                                                            }) ?? null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Languages</label>
                                            <div className="control">
                                                <MultiSelect
                                                    options={languages}
                                                    value={userLanguages}
                                                    onChange={setUserLanguages}
                                                    labelledBy="Select"
                                                    className={'c-multiselect'}
                                                    disableSearch={true}
                                                    disabled={false}
                                                    hasSelectAll={false}
                                                    isLoading={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="password"
                                                    placeholder="Text input"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-6-desktop is-12-tablet is-12-mobile">
                                        <div className="field">
                                            <label className="label">Confirm Password</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder="Text input"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-12">
                                        <SimpleButton text={'Submit'}/>
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

export default RegisterPage;