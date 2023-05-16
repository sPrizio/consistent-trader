import moment, {Moment} from "moment";

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
 * @param format date format
 */
export function formatDate(value: string, format: string) {
    try {
        return moment(value).format(format)
    } catch (e) {
        console.log(e)
        return value
    }
}

/**
 * Formats the given moment into the given format
 *
 * @param value moment value
 * @param format date format
 */
export function formatDateMoment(value: Moment, format: string) {
    try {
        return value.format(format)
    } catch (e) {
        console.log(e)
        return ''
    }
}

/**
 * Obtains an instance of a moment date for the given string
 *
 * @param value date string
 */
export function getDate(value: string): Moment {
    try {
        return moment(value)
    } catch (e) {
        console.log(e)
        return moment()
    }
}

/**
 * Obtains an instance of a moment date for the given string and date format
 *
 * @param value date string
 * @param format date format
 */
export function getDateForFormat(value: string, format: string): Moment {
    try {
        return moment(value, format)
    } catch (e) {
        console.log(e)
        return moment()
    }
}