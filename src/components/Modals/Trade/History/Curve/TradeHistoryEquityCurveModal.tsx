import BaseModal from "../../../BaseModal";
import TradeHistoryEquityCurve from "../../../../Trade/History/Curve/TradeHistoryEquityCurve";
import {TradeRecordInfo} from "../../../../../types/api-types";
import {formatDateForTradeRecord} from "../../../../../services/datetime/DateTimeService";

/**
 * Modal that renders the equity curve full screen
 *
 * @param modalActive flag to mark whether the modal is active
 * @param toggleModal handler to toggle modal active and inactive
 * @param tradeRecord trade record
 * @param index list index
 * @author Stephen Prizio
 * @version 1.0
 */
function TradeHistoryEquityCurveModal(
    {
        modalActive = false,
        toggleModal,
        tradeRecord = {},
        index = -1,
    }: {
        modalActive: boolean,
        toggleModal: Function,
        tradeRecord: TradeRecordInfo,
        index: number,
    }
) {


    //  RENDER

    let content =
        <section>
            <TradeHistoryEquityCurve
                points={tradeRecord?.statistics?.points ?? []}
                index={index}
                height={500}
                showXAxis={true}
                showYAxis={true}
                showTooltip={true}
            />
        </section>

    return (
        <>
            <BaseModal
                active={modalActive}
                hasControls={false}
                title={(formatDateForTradeRecord(tradeRecord.startDate ?? '', tradeRecord)) + ' Equity Curve'}
                closeHandler={toggleModal}
                content={[content]}
            />
        </>
    )
}

export default TradeHistoryEquityCurveModal;