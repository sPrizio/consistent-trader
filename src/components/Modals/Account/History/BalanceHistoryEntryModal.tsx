import BaseModal from "../../BaseModal";
import get, {cDelete} from "../../../../services/client/ClientService";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../../types/api-types";
import hasData from "../../../../services/data/DataIntegrityService";

/**
 * Modal that displays the delete balance history logic
 *
 * @param active modal active
 * @param closeHandler close modal handler
 * @param uid history entry uid
 * @author Stephen Prizio
 * @version 1.0
 */
function BalanceHistoryEntryModal({active = false, closeHandler, uid = ''}: {active: boolean, closeHandler: Function, uid: string}) {


    //  GENERAL FUNCTIONS

    // TODO: figure out why the modal is closing and then waiting for the function to finish

    function deleteHistory(val: string) {

        const d =
            cDelete(
                CoreConstants.ApiUrls.Account.DeleteBalanceModification
                    .replace('{uid}', val)
            )
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                window.location.reload()
            }
        }).catch(err => {
            console.log(err)
        })

        return {}
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
                submitHandler={() => deleteHistory(uid)}
                cssClasses={'ct-account-balance-history-delete-modal'}
            />
        </>
    )
}

export default BalanceHistoryEntryModal;