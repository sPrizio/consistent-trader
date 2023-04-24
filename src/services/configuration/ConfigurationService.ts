/**
 * Gets the base api url
 *
 * @returns {string} url
 */
export function baseUrl() {
    return 'http://localhost:8080'
}

/**
 * Gets the domain url
 *
 * @returns {string} url
 */
export function getDomain(appendVal: string) {
    return baseUrl() + '/api/v1' + appendVal
}

/**
 * Gets the account url
 *
 * @returns {string} url
 */
export function getAccountDomain() {
    return getDomain('/account')
}

/**
 * Gets the analysis url
 *
 * @returns {string} url
 */
export function getAnalysisDomain() {
    return getDomain('/analysis')
}

/**
 * Gets the news url
 *
 * @returns {string} url
 */
export function getNewsDomain() {
    return getDomain('/news')
}

/**
 * Gets the rank url
 *
 * @returns {string} url
 */
export function getRankDomain() {
    return getDomain('/rank')
}

/**
 * Gets the retrospective url
 *
 * @returns {string} url
 */
export function getRetrospectiveDomain() {
    return getDomain('/retrospective')
}

/**
 * Gets the system url
 *
 * @returns {string} url
 */
export function getSystemDomain() {
    return getDomain('/system')
}

/**
 * Gets the trade url
 *
 * @returns {string} url
 */
export function getTradeDomain() {
    return getDomain('/trade')
}

/**
 * Gets the trade record url
 *
 * @returns {string} url
 */
export function getTradeRecordDomain() {
    return getDomain('/trade-record')
}

/**
 * Gets the user domain url
 *
 * @returns {string} url
 */
export function getUserDomain() {
    return getDomain('/user')
}
