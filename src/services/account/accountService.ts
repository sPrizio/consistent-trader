import get from "../client/ClientService";
import {CoreConstants} from "../../constants/CoreConstants";
import {StandardJsonResponse} from "../../types/api-types";

/**
 * Obtains the current account's overview
 */
export async function getAccountOverview() {
    try {
        const d = await get(CoreConstants.ApiUrls.Account.Overview)
        let response: StandardJsonResponse = JSON.parse(d)
        return response.data
    } catch (err) {
        console.log(err)
        return  {}
    }
}