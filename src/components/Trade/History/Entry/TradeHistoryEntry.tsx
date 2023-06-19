import {StandardJsonResponse, TradeRecordInfo} from "../../../../types/api-types";
import React, {useEffect, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {CoreConstants} from "../../../../constants/CoreConstants";
import {
    formatDate,
    formatDateForTradeRecord,
    formatDateMoment,
    getDate
} from "../../../../services/datetime/DateTimeService";
import {AiFillCheckCircle} from "react-icons/ai";
import {MdInsertChartOutlined, MdOutlineCancel} from "react-icons/md";
import {formatNumberForDisplay} from "../../../../services/data/FormattingService";
import SimpleButton from "../../../Buttons/SimpleButton";
import TradeHistoryEquityCurve from "../Curve/TradeHistoryEquityCurve";
import TradeHistoryEntryTradeList from "./TradeHistoryEntryTradeList";
import get from "../../../../services/client/ClientService";
import hasData from "../../../../services/data/DataIntegrityService";
import {RxMagnifyingGlass} from "react-icons/rx";
import TradeHistoryEquityCurveModal from "../../../Modals/Trade/History/Curve/TradeHistoryEquityCurveModal";

/**
 * Component that renders a trade record, information about a trading session
 *
 * @param tradeRecord trade record data
 * @param selectEntryHandler select entry handler
 * @param shouldAllowTradeList true if list of trades should be shown
 * @param index session index in list
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEntry(
    {
        tradeRecord = {},
        selectEntryHandler,
        shouldAllowTradeList = false,
        index = -1
    }
        : {
        tradeRecord: TradeRecordInfo,
        selectEntryHandler: Function,
        shouldAllowTradeList: boolean,
        index: number
    }) {

    const [isActive, setIsActive] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [trades, setTrades] = useState({})
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        if (isActive) {
            getTrades()
        }
    }, [isActive, currentPage])


    //  HANDLER FUNCTIONS

    /**
     * Handles changing page for the pagination
     *
     * @param val page value
     */
    function changePage(val: number) {
        setCurrentPage(val)
    }

    /**
     * Toggles the trade list view as open (explodes the entry)
     */
    function toggleTradeView() {
        setIsActive(!isActive)
    }

    /**
     * Toggles the equity modal
     */
    function toggleModal() {
        setModalActive(!modalActive)
    }


    //  GENERAL FUNCTIONS

    /**
     * Computes the sub header based on the day of the week and aggregate interval
     */
    function computeSubHeader() {
        if (tradeRecord.aggregateInterval === 'DAILY') {
            return (
                <h6 className="ct-trade-history-entry__header__subtitle">
                    {formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOWeekdayFormat)}
                </h6>
            )
        } else if (tradeRecord.aggregateInterval === 'MONTHLY') {
            return (
                <h6 className="ct-trade-history-entry__header__subtitle">
                    {formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOYearFormat)}
                </h6>
            )
        }

        return null
    }

    /**
     * Computes display text for the number of trades won
     */
    function computeWinningText() {
        const wins = tradeRecord.statistics?.numberOfWinningTrades ?? -1
        const perc = tradeRecord.statistics?.winPercentage ?? -1

        if (wins === 1) {
            return (
                <h6 className="ct-trade-history-entry__ordered-columns__sub-header">1 win (100%)</h6>
            )
        }

        return (
            <h6 className="ct-trade-history-entry__ordered-columns__sub-header">{wins} wins ({perc}%)</h6>
        )
    }

    /**
     * Fetches the trades contained within this trade record session
     */
    async function getTrades() {

        const d =
            await get(
                CoreConstants.ApiUrls.Trade.ListPaged
                    .replace('{start}', formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISODateTimeFormat))
                    .replace('{end}', formatDate(tradeRecord.endDate ?? '', CoreConstants.DateTime.ISODateTimeFormat))
                    .replace('{includeNonRelevant}', 'false')
                    .replace('{page}', currentPage.toString())
                    .replace('{pageSize}', pageSize.toString())
            )

        let response: StandardJsonResponse = JSON.parse(d)
        if (response.success && hasData(response.data)) {
            console.log(response.data)
            setTrades(response.data)
        }

        return {}
    }


    //  RENDER

    let expandButton = null
    if (tradeRecord.aggregateInterval === 'DAILY') {
        expandButton =
            <span className="ct-trade-history-entry__header__expand" onClick={toggleTradeView}>
                {isActive ? <FaChevronUp/> : <FaChevronDown/>}
            </span>
    }

    let exploreButton = null
    if (tradeRecord.aggregateInterval !== 'DAILY') {
        exploreButton =
            <div className="ct-trade-history-entry__header__expand" onClick={() => {
                const record = tradeRecord
                const st = record.startDate
                const en = formatDateMoment(getDate(record.endDate ?? '').add(1, 'days'), CoreConstants.DateTime.ISODateFormat)
                selectEntryHandler(record.aggregateInterval, st, en)
            }}>
                <SimpleButton variant={'primary'} text={'View'} icon={<RxMagnifyingGlass/>} iconPosition={'right'}/>
            </div>
    }

    return (
        <div className="ct-trade-history-entry">
            <div className="level is-mobile ct-trade-history-entry__header">
                <div className="level-left">
                    <div className="level-item">
                        {
                            (tradeRecord.statistics?.netPips ?? -1) > 0 ?
                                <span className="icon ct-trade-history-entry__header__result positive">
                                    <AiFillCheckCircle/>
                                </span>
                                :
                                <span className="icon ct-trade-history-entry__header__result negative">
                                    <MdOutlineCancel/>
                                </span>
                        }
                    </div>
                    <div className="level-item">
                        <h5 className="ct-trade-history-entry__header__title">{formatDateForTradeRecord(tradeRecord.startDate ?? '', tradeRecord)}</h5>
                    </div>
                    <div className="level-item">
                        {computeSubHeader()}
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <p className={'ct-trade-history-entry__header__percentage' + ((tradeRecord.statistics?.percentageProfit ?? -1) >= 0 ? ' positive ' : ' negative ')}>
                            {
                                (tradeRecord.statistics?.percentageProfit ?? 0) !== 0 ?
                                    formatNumberForDisplay(tradeRecord.statistics?.percentageProfit ?? -1) + '%'
                                    :
                                    null
                            }
                        </p>
                    </div>
                    <div className="level-item">
                        {
                            shouldAllowTradeList ?
                                <div onClick={toggleModal} className="ct-trade-history-entry__header__chart-expand">
                                    <SimpleButton
                                        text={''}
                                        variant={'primary'}
                                        icon={<MdInsertChartOutlined/>}
                                        iconPosition={'center'}
                                        handler={toggleModal}
                                    />
                                </div>
                                : null
                        }
                    </div>
                    <div className="level-item">
                        {expandButton}
                        {exploreButton}
                    </div>
                </div>
            </div>
            <br />
            {
                tradeRecord.aggregateInterval !== 'DAILY' ?
                    <div className="has-text-right is-fullwidth ct-trade-history-entry__trade-sessions-container">
                        <span
                            className="ct-trade-history-entry__trade-sessions-container__trading-days">Trade Sessions: {tradeRecord.statistics?.tradeSessions ?? -1}</span>
                    </div>
                    :
                    null
            }
            <div className="columns is-multiline is-mobile is-vcentered ct-trade-history-entry__ordered-columns">
                <div className="column is-3-desktop is-12-tablet is-12-mobile">
                    <TradeHistoryEquityCurve
                        points={tradeRecord.statistics?.points ?? []}
                        index={index}
                        height={125}
                        showXAxis={false}
                        showYAxis={false}
                        showTooltip={false}
                    />
                </div>
                <div className="column is-9-desktop is-12-tablet is-12-mobile">
                    <div className="table-container">
                        <table className="table is-fullwidth">
                            <tbody>
                            <tr>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Trades</h5>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">
                                        {tradeRecord.statistics?.numberOfTrades ?? -1}
                                    </h5>
                                    {computeWinningText()}
                                </td>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Average Win</h5>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">{formatNumberForDisplay(tradeRecord.statistics?.averageWinAmount ?? -1)}</h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">{formatNumberForDisplay(tradeRecord.statistics?.averageWinSize ?? -1)}&nbsp;pts</h6>
                                </td>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Largest Win</h5>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">{formatNumberForDisplay(tradeRecord.statistics?.largestWinAmount ?? -1)}</h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">{formatNumberForDisplay(tradeRecord.statistics?.largestWinSize ?? -1)}&nbsp;pts</h6>
                                </td>
                            </tr>
                            <tr>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Net P&L</h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">
                                        Profitability: {formatNumberForDisplay(tradeRecord.statistics?.profitability ?? -1)}
                                    </h6>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">
                                        {formatNumberForDisplay(tradeRecord.statistics?.netProfit ?? -1)}
                                    </h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">
                                        {formatNumberForDisplay(tradeRecord.statistics?.netPips ?? -1)}&nbsp;points
                                    </h6>
                                </td>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Average Loss</h5>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">{formatNumberForDisplay(tradeRecord.statistics?.averageLossAmount ?? -1)}</h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">{formatNumberForDisplay(tradeRecord.statistics?.averageLossSize ?? -1)}&nbsp;pts</h6>
                                </td>
                                <td className="has-text-left">
                                    <h5 className="ct-trade-history-entry__ordered-columns__header">Largest Loss</h5>
                                </td>
                                <td className="has-text-right">
                                    <h5 className="ct-trade-history-entry__ordered-columns__value">{formatNumberForDisplay(tradeRecord.statistics?.largestLossAmount ?? -1)}</h5>
                                    <h6 className="ct-trade-history-entry__ordered-columns__sub-header">{formatNumberForDisplay(tradeRecord.statistics?.largestLossSize ?? -1)}&nbsp;pts</h6>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"column is-12" + ((isActive && shouldAllowTradeList) ? '' : ' no-show ')}>
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-12">
                            <TradeHistoryEntryTradeList tradeData={trades} pageHandler={changePage}/>
                        </div>
                    </div>
                </div>
                <TradeHistoryEquityCurveModal
                    modalActive={modalActive}
                    toggleModal={toggleModal}
                    tradeRecord={tradeRecord}
                    index={index}
                />
            </div>
        </div>
    )
}

export default TradeHistoryEntry;