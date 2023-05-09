import BaseCard from "../BaseCard";
import {useEffect, useState} from "react";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDateMoment, now} from "../../../services/datetime/DateTimeService";
import get from "../../../services/client/ClientService";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData from "../../../services/data/DataIntegrityService";
import BalanceHistory from "../../Account/History/BalanceHistory";

export default BalanceHistoryCard;

/**
 * Card that shows an account's balance history
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistoryCard() {

    const [isLoading, setIsLoading] = useState(false)
    const [start, setStart] = useState(formatDateMoment(now().subtract(60, 'days'), CoreConstants.DateTime.ISODateFormat))
    const [end, setEnd] = useState(formatDateMoment(now().add(2, 'months'), CoreConstants.DateTime.ISODateFormat))
    const [filterHistory, setFilterHistory] = useState('last-60')
    const [balanceHistory, setBalanceHistory] = useState([])

    useEffect(() => {
        getBalanceHistory()
    }, [start, end])


    //  HANDLER FUNCTIONS

    /**
     * Handles select changes when interfacing with the modal
     *
     * @param e select even
     */
    function handleSelectChange(e: Event) {
        const target = e.target as HTMLSelectElement

        setFilterHistory(target.value ?? '')
        setStart(computeDates(target.value ?? '')[0])
        setEnd(computeDates(target.value ?? '')[1])
    }


    //  GENERAL FUNCTIONS

    /**
     * Computes the date based on the selected value
     *
     * @param val select value
     */
    function computeDates(val: string) {

        const dates = []
        switch (val) {
            case 'last-60':
                dates.push(now().subtract(60, 'days').format(CoreConstants.DateTime.ISODateFormat))
                break
            case 'last-90':
                dates.push(now().subtract(90, 'days').format(CoreConstants.DateTime.ISODateFormat))
                break
            case 'ytd':
                dates.push(now().startOf('year').format(CoreConstants.DateTime.ISODateFormat))
                break
            case 'all-time':
                dates.push(now().startOf('year').subtract(15, 'years').format(CoreConstants.DateTime.ISODateFormat))
                break
            default:
                dates.push(now().subtract(30, 'days').format(CoreConstants.DateTime.ISODateFormat))
                break
        }

        dates.push(now().add(5, 'days').format(CoreConstants.DateTime.ISODateFormat))
        return dates
    }

    /**
     * Fetches the balance history from the api
     */
    function getBalanceHistory() {

        setIsLoading(true);

        const d =
            get(
                CoreConstants.ApiUrls.Account.BalanceHistory
                    .replace('{start}', start)
                    .replace('{end}', end)
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setBalanceHistory(response.data)
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <>
            <BaseCard
                loading={isLoading}
                title={'Account History'}
                subtitle={'Balance Updates'}
                hasBorder={true}
                content={[<BalanceHistory key={0} balanceHistory={balanceHistory} historyHandler={handleSelectChange} filter={filterHistory} />]}
            />
        </>
    )
}
