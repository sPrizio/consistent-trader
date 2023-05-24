import {RiCheckDoubleFill} from "react-icons/ri";
import {BaseRankInfo, CurrentRankInfo} from "../../../types/api-types";
import {displayRankName, displayRankNumber} from "../../../services/data/FormattingService";
import {HiOutlineChevronDoubleUp} from "react-icons/hi";

/**
 * Renders the rank entry, nice side stepper view
 *
 * @param index index in rank list
 * @param previousRank previous rank
 * @param rank current rank
 * @param baseRank base rank
 * @param nextRank next rank
 * @author Stephen Prizio
 * @version 1.0
 */
function HelpRankEntry(
    {
        index = -1,
        previousRank = {},
        rank = {},
        baseRank = {},
        nextRank = {}
    } : {
        index: number,
        previousRank: BaseRankInfo,
        rank: CurrentRankInfo,
        baseRank: BaseRankInfo,
        nextRank: BaseRankInfo
    }
) {

    //  GENERAL FUNCTIONS

    /**
     * Compute the css class name
     *
     * @param val string
     */
    function computeClassName(val: string) {
        return ' ' + val.toLowerCase().replace(/[0-9]/, '').trim();
    }

    /**
     * Round integer
     *
     * @param value number
     */
    function formatWholeValue(value: number) {
        if (value) {
            return value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                .replace('.00', '')
                .replace('.0', '')
        }

        return '0'
    }

    /**
     * Computes the rank range
     */
    function computeRange() {
        const start = previousRank !== null ? (baseRank.multiplier ?? -1) * 1000 : 1000
        const end = nextRank !== null ? (nextRank.multiplier ?? -1) * 1000 : 100000000000
        const increment = (end - start) / (baseRank?.ranks?.length ?? -1)
        const vals = computeHelperVals()
        const finalVals : Array<Array<number>> = []

        vals.forEach(item => {
            const arr = []
            if (nextRank === null) {
                arr.push(start)
                arr.push(start)
            } else if ((item - 1) <= 0) {
                arr.push(start)
                arr.push(start + (increment * vals[(item - 1)]))
            } else {
                arr.push(start + (increment * (vals[(item - 1) - 1])))
                arr.push(start + (increment * vals[(item - 1)]))
            }

            finalVals.push(arr)
        })

        return finalVals
    }

    /**
     * Computes the rank bound
     */
    function computeBound() {
        const range = computeRange()
        return formatWholeValue(range[index][0]) + ' - ' + formatWholeValue(range[index][1])
    }

    /**
     * Computes the rank number for display purposes
     *
     * @param val rank increment
     */
    function computeRankNumber(val: number) {
        const vals = computeHelperVals()
        for (let i = 0; i < vals.length; i++) {
            if (vals[i] === val) {
                return displayRankNumber((vals.length - 1 - i) + '')
            }
        }

        return -1
    }


    //  RENDER

    let startStep =
        <div
            className={"stepper-item" + (computeRange()[0][0] === computeRange()[index][0]  ? ' completed line ' : '')}>
            <div className="step-counter">V</div>
            <div
                className="step-name">{formatWholeValue(computeRange()[0][0])}</div>
        </div>

    if ((baseRank?.name?.toLowerCase() ?? '') === 'obsidian') {
        startStep =
            <div
                className={"stepper-item" + (computeRange()[0][0] === computeRange()[index][0]  ? ' completed ' : '')}>
                <div className="step-counter">
                    <RiCheckDoubleFill />
                </div>
                <div
                    className="step-name">{formatWholeValue(computeRange()[0][0])}</div>
            </div>
    }

    return (
        <article className="media account-summary">
            <figure className="media-left">
                <p className="image is-96x96">
                    <img
                        src={require(`../../../assets/images${rank.imageUrl}`)}
                        alt={rank.name}
                        height={96}
                        width={96}
                    />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong className={'value' + (computeClassName(rank.name ?? ''))}>
                            {displayRankName(rank.name ?? '')}
                        </strong>&nbsp;<small>{computeBound()}</small>
                        <br/>
                        <div className={"stepper-wrapper" + (computeClassName(rank.name ?? ''))}>
                            {startStep}
                            {
                                (baseRank?.name?.toLowerCase() ?? '') !== 'obsidian' && baseRank.ranks && baseRank.ranks.map((item, key) => {
                                    return (
                                        <div
                                            className={"stepper-item" + (computeRange()[key][1] === computeRange()[index][0] ? ' completed line ' : '')}>
                                            <div className="step-counter">
                                                {
                                                    computeRankNumber(key + 1) === '' ?
                                                        <HiOutlineChevronDoubleUp/>
                                                        :
                                                        computeRankNumber(key + 1)
                                                }
                                            </div>
                                            <div className="step-name">{formatWholeValue(computeRange()[key][1])}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </p>
                </div>
            </div>
        </article>
    );


    //  HELPERS FUNCTIONS

    /**
     * Computes helper values
     */
    function computeHelperVals() {
        const length = baseRank?.ranks?.length ?? -1

        if (!baseRank || !baseRank.ranks) {
            return []
        } else {
            const x = baseRank.ranks.map(item => item.level)
            const y = x.slice().reverse()
            const vals = []

            for (let i = 0; i < x.length; i++) {
                // @ts-ignore
                vals.push(Math.abs(x[i] - y[i] - length + i))
            }

            return vals
        }
    }
}

export default HelpRankEntry;