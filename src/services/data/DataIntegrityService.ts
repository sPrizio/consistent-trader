/**
 * Checks whether the given data is valid and exists
 *
 * @param data test data
 */
function hasData(data: any) {
    return data !== null && data !== undefined
}

export default hasData;