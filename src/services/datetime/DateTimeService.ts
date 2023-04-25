import moment from "moment";

/**
 * Obtains the current date & time
 */
export function now() {
    return moment();
}

/**
 * Formats the given string into the given format
 *
 * @param value date value
 * @param format format
 */
export function formatDate(value: string, format: string) {
    try {
        return moment().format(format)
    } catch (e) {
        console.log(e)
        return value
    }
}