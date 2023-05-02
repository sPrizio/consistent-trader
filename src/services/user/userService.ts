import get from "../client/ClientService";
import {CoreConstants} from "../../constants/CoreConstants";
import {StandardJsonResponse} from "../../types/api-types";

/**
 * Obtains the current user info
 */
export async function getUser() {
    try {
        const d = await get(CoreConstants.ApiUrls.User.Current)
        let response: StandardJsonResponse = JSON.parse(d)
        return response.data
    } catch (err) {
        console.log(err)
        return  {}
    }
}