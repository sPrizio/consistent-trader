import {AccountInfo, StandardJsonResponse} from "../../../types/api-types";
import BaseModal from "../BaseModal";
import {useEffect, useState} from "react";
import {put} from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import hasData from "../../../services/data/DataIntegrityService";
import {formatDate} from "../../../services/datetime/DateTimeService";
import {getUser} from "../../../services/user/userService";
import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import {AiFillCheckCircle} from "react-icons/ai";

/**
 * Renders the account switch modal, used to select the account whose information will be displayed
 * throughout the app
 *
 * @param active is modal active
 * @param closeHandler close handler
 * @param accounts user accounts
 * @author Stephen Prizio
 * @version 1.0
 */
function AccountSwitchModal({active = false, closeHandler, accounts = []}: {
    active: boolean,
    closeHandler: Function,
    accounts: Array<AccountInfo>
}) {

    const [isLoading, setIsLoading] = useState(false)
    const [acc, setAcc] = useState([])
    const [selectedAccount, setSelectedAccount] = useState(-1)

    useEffect(() => {
        getAccounts()
    }, [])


    //  HANDLER FUNCTIONS

    /**
     * Handles selecting a new account
     *
     * @param val account number
     */
    function handleSelect(val: number) {
        setSelectedAccount(val)
    }

    /**
     * Handles selecting a new account
     */
    async function handleSubmit() {

        setIsLoading(true)

        const d = await put(
            CoreConstants.ApiUrls.Account.Switch
                .replace('{accountNumber}', selectedAccount.toString())
        )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            window.location.reload()
        }

        setIsLoading(false)

        return {}
    }


    //  GENERAL FUNCTIONS

    /**
     * Custom date display
     * @param val date value
     */
    function dateDisplay(val: string) {
        if (val && val.length > 0) {
            const day = formatDate(val, CoreConstants.DateTime.ISODayFormat).match('(\\d+)([a-zA-z]+)')
            return (
                <span>
                    Last Traded:&nbsp;{formatDate(val, CoreConstants.DateTime.ISOMonthFormat)}&nbsp;{day ? day[1] : ''}<sup>{day ? day[2] : ''}</sup>, {formatDate(val, CoreConstants.DateTime.ISOYearFormat)}
                </span>
            )
        }

        return 'No recent trades'
    }

    /**
     * Fetch user accounts
     */
    async function getAccounts() {

        setIsLoading(true);

        getUser().then((val) => {
            setAcc(val.accounts)
            setSelectedAccount(val.accounts.find((ac: { defaultAccount: any; }) => ac.defaultAccount).accountNumber)
        }).catch(e => console.log(e))

        setIsLoading(false)
        return {}
    }


    //  RENDER

    let content =
        <section className="ct-account-switch-modal">
            <p>
                Below is a list of the accounts associated with your TraderBuddy account. Select any account to
                mark it as default and to view its information.
            </p>
            <div className="container">
                <div className="columns is-multiline is-mobile is-vcentered accounts-container">
                    {
                        acc && acc.map((item : AccountInfo, key) => {
                            return (
                                <div className="column is-12" key={key}
                                     onClick={() => handleSelect(item.accountNumber ?? -1)}>
                                    <div className="columns is-multiline is-vcentered">
                                        <div className="column is-5">
                                            <p>{item.broker}&nbsp;-&nbsp;<span
                                                className="account-number">{item.accountNumber}</span></p>
                                            {
                                                dateDisplay(item.lastTraded) != null ?
                                                    <h6 className="sub-header">
                                                        {dateDisplay(item.lastTraded)}
                                                    </h6>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className="column is-2 has-text-centered">
                                            <p className="">
                                                {item.accountType}&nbsp;Account
                                            </p>
                                        </div>
                                        <div className="column is-3 has-text-right">
                                            <p className="balance">{formatNumberForDisplay(item.balance ?? -1)}&nbsp;
                                                <small>{item.currency?.isoCode ?? ''}</small></p>
                                        </div>
                                        <div className="column is-2 has-text-centered is-vcentered">
                                            {
                                                (item.accountNumber ?? -1) === selectedAccount ?
                                                    <span className="default-icon">
                                                        <AiFillCheckCircle/>
                                                    </span>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="container">
                <p className="info">
                    The check indicates the current (default) account that is shown throughout the app.
                    Selecting another account will swap the default account for the selected account and set it
                    as the new default. Swapping accounts means that any newly uploaded trades will be
                    associated with the selected account. Keep this in mind when switching between accounts. You
                    may always swap between any account at any time.
                </p>
            </div>
        </section>

    return (
        <>
            <BaseModal
                isLoading={isLoading}
                active={active}
                title={'Switch Account'}
                closeHandler={closeHandler}
                content={[content]}
                hasControls={true}
                submitHandler={() => handleSubmit()}
            />
        </>
    )
}

export default AccountSwitchModal;