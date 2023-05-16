import {TradeRecordInfo} from "../../../types/api-types";
import React, {useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {CoreConstants} from "../../../constants/CoreConstants";
import {formatDate, formatDateMoment, getDate} from "../../../services/datetime/DateTimeService";
import {SlMagnifier} from "react-icons/sl";
import {AiFillCheckCircle} from "react-icons/ai";
import {MdInsertChartOutlined, MdOutlineCancel} from "react-icons/md";
import {formatNumberForDisplay} from "../../../services/data/FormattingService";
import SimpleButton from "../../Buttons/SimpleButton";
import TradeHistoryEquityCurve from "./TradeHistoryEquityCurve";


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


    //  HANDLER FUNCTIONS

    /**
     * Toggles the trade list view as open (explodes the entry)
     */
    function toggleTradeView() {
        setIsActive(!isActive)
        //  get trades
        //this.setState({isActive: !this.state.isActive}, () => this.getTrades())
    }

    /**
     * Toggles the equity modal
     */
    function toggleModal() {
        setModalActive(!modalActive)
    }


    //  GENERAL FUNCTIONS

    /**
     * Computes the header as the date to display representing the session as a function of the aggregate interval
     */
    function computeHeader() {
        const interval = tradeRecord.aggregateInterval
        if (interval === 'DAILY') {
            return formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOMonthDayFormat)
        } else if (interval === 'WEEKLY') {
            return formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOMonthDayFormat) + ' - ' + formatDate(tradeRecord.endDate ?? '', CoreConstants.DateTime.ISODayFormat)
        } else if (interval === 'MONTHLY') {
            return formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOMonthFormat)
        }

        return formatDate(tradeRecord.startDate ?? '', CoreConstants.DateTime.ISOYearFormat)
    }

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
                <SimpleButton variant={'primary'} text={'View'} icon={<SlMagnifier/>} iconPosition={'right'}/>
            </div>
    }

    return (
        <div className="ct-trade-history-entry">
            <div className="level ct-trade-history-entry__header">
                <div className="level-left">
                    <div className="level-item">
                        {
                            tradeRecord.statistics?.netPips ?? -1 > 0 ?
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
                        <h5 className="ct-trade-history-entry__header__title">{computeHeader()}</h5>
                    </div>
                    <div className="level-item">
                        {computeSubHeader()}
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <p className={'ct-trade-history-entry__header__percentage' + (tradeRecord.statistics?.percentageProfit ?? -1 >= 0 ? ' positive ' : ' negative ')}>
                            {
                                tradeRecord.statistics?.percentageProfit ?? 0 !== 0 ?
                                    formatNumberForDisplay(tradeRecord.statistics?.percentageProfit ?? -1) + '%'
                                    :
                                    null
                            }
                        </p>
                    </div>
                    <div className="level-item">
                        {
                            shouldAllowTradeList ?
                                <SimpleButton
                                    text={''}
                                    variant={'primary'}
                                    icon={<MdInsertChartOutlined/>}
                                    iconPosition={'center'}
                                    handler={toggleModal}
                                />
                                : null
                        }
                    </div>
                    <div className="level-item">
                        {expandButton}
                        {exploreButton}
                    </div>
                </div>
            </div>
            <hr/>
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
                <div className="column is-3">
                    <TradeHistoryEquityCurve
                        points={tradeRecord.statistics?.points ?? []}
                        index={index}
                        height={125}
                        showXAxis={false}
                        showYAxis={false}
                        showTooltip={false}
                    />
                </div>
                <div className="column is-9">
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
                <div
                    className={"column is-12" + ((isActive && shouldAllowTradeList) ? '' : ' no-show ')}>
                    <hr/>
                    <div className="columns is-multiline is-mobile is-vcentered">
                        <div className="column is-12">
                            Trade Log List
                            {/*<TradeLogTradeList
                                            tradeData={this.state.trades}
                                            pageHandler={this.changePage}
                                            selectedTrade={this.state.selectedTrade}
                                            selectTradeHandler={this.selectTrade}
                                            disregardHandler={this.disregardTrade}
                                        />*/}
                        </div>
                    </div>
                </div>
                {/*<TradeLogEntryEquityCurveModal modalActive={modalActive} toggleModal={toggleModal}>
                    <TradeLogEntryEquityCurve
                        points={tradeRecord.statistics.points}
                        index={index}
                        height={500}
                        showXAxis={true}
                        showYAxis={true}
                        showTooltip={true}
                    />
                </TradeLogEntryEquityCurveModal>*/}
            </div>
        </div>
    )
}

export default TradeHistoryEntry;