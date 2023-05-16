/**
 * Component that renders pagination for a list of trades
 *
 * @param page current page
 * @param pageSize size of page
 * @param totalElements total number of entries
 * @param totalPages total pages
 * @param currentPage current page
 * @param pageHandler page switch handler
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEntryTradeListPagination(
    {
        page = -1,
        pageSize = -1,
        totalElements = -1,
        totalPages = -1,
        currentPage = -1,
        pageHandler
    }: {
        page: number,
        pageSize: number,
        totalElements: number,
        totalPages: number,
        currentPage: number,
        pageHandler: Function,
    }) {


    //  GENERAL FUNCTIONS

    function computePageDisplayText() {
        const startBound = (page * pageSize) + 1
        const endBound = (page + 1) * pageSize

        if (endBound > totalElements) {
            return (
                <span className="sub-header">
                    Viewing {startBound} - {totalElements} of {totalElements} trades
                </span>
            )
        }

        return (
            <span className="sub-header">
                Viewing {startBound} - {endBound} of {totalElements} trades
            </span>
        )
    }


    //  RENDER

    let pages = []
    for (let i = 0; i < totalPages; i++) {
        pages.push(
            <a className={"pagination-link" + (currentPage === i ? ' is-current ' : '')}
               aria-label="Goto page 1"
               onClick={() => pageHandler(i)}
            >
                {i + 1}
            </a>
        )
    }

    return (
        <div className="ct-pagination">
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-6">
                    {computePageDisplayText()}
                </div>
                <div className="column is-6">
                    <div className="pagination is-right is-small" role="navigation" aria-label="pagination">
                        <ul className="pagination-list">
                            {
                                pages.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                            {/*<li>
                                <span className="pagination-ellipsis">&hellip;</span>
                            </li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeHistoryEntryTradeListPagination;