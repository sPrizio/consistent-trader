import BaseModal from "../../BaseModal";
import {cDelete} from "../../../../services/client/ClientService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData from "../../../../services/data/DataIntegrityService";
import {useState} from "react";

/**
 * Modal that displays the delete balance history logic
 *
 * @param active modal active
 * @param closeHandler close modal handler
 * @param uid history entry uid
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistoryEntryModal({active = false, closeHandler, uid = ''}: {
    active: boolean,
    closeHandler: Function,
    uid: string
}) {

    const [isLoading, setIsLoading] = useState(false)


    //  GENERAL FUNCTIONS

    /**
     * Makes an api call to delete the history entry
     */
    async function deleteHistory() {

        setIsLoading(true)

        try {
            const result = await cDelete(CoreConstants.ApiUrls.Account.DeleteBalanceModification.replace('{uid}', uid))
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
        <section className="ct-account-balance-history__delete-content">
            <p>Are you sure that want to delete this account balance modification?</p>
        </section>

    return (
        <>
            <BaseModal
                active={active}
                title={'Delete History'}
                hasControls={true}
                closeHandler={closeHandler}
                content={[content]}
                submitHandler={deleteHistory}
                cssClasses={'ct-account-balance-history-delete-modal'}
                isLoading={isLoading}
            />
        </>
    )
}

export default BalanceHistoryEntryModal;