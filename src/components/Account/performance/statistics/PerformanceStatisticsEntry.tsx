import {AiOutlineArrowDown, AiOutlineArrowUp} from "react-icons/ai";

/**
 * Component representing a performance stat
 *
 * @param label name
 * @param delta difference from previous
 * @param value  current value
 * @param valuePercentage percentage change
 * @param sentiment positive or negative
 * @author Stephen Prizio
 * @version 1.0
 */
function PerformanceStatisticsEntry(
    {
        label = '',
        delta = 0,
        value = 0,
        valuePercentage = 0,
        sentiment = ''
    }: {
        label: string,
        delta: number,
        value: number,
        valuePercentage: number,
        sentiment: string
    }) {


    //  GENERAL FUNCTIONS

    /**
     * Determines the class to apply based on a positive or negative result
     */
    function computeSentimentClass() {

        if (delta === 0) {
            return ''
        }

        if (sentiment === 'positive') {
            if (delta > 0) {
                return 'positive'
            }

            return 'negative'
        } else if (sentiment === 'negative') {
            if (delta < 0) {
                return 'positive'
            }

            return 'negative'
        }
    }

    /**
     * Determines the icon to display based on a positive or negative result
     */
    function computeSentimentIcon() {

        if (delta === 0) {
            return null
        }

        if (sentiment === 'positive') {
            if (delta > 0) {
                return <AiOutlineArrowUp/>
            }

            return <AiOutlineArrowDown/>
        } else if (sentiment === 'negative') {
            if (delta < 0) {
                return <AiOutlineArrowDown/>
            }

            return <AiOutlineArrowUp/>
        }
    }


    //  RENDER

    return (
        <div className="ct-performance-statistics__entry">
            <div className="columns is-multiline is-mobile is-vcentered">
                <div className="column is-8">
                    <h5 className="ct-performance-statistics__entry__header">{label}</h5>
                    {
                        delta === 0 ?
                            null :
                            <h6 className={"ct-performance-statistics__entry__unit " + (computeSentimentClass())}>
                                    <span className="icon-text">
                                        <span className="icon">
                                            {computeSentimentIcon()}
                                        </span>
                                        <span>{delta}%</span>
                                    </span>
                            </h6>
                    }
                </div>
                <div className="column is-4 has-text-right">
                    <h5 className="ct-performance-statistics__entry__value">{value}</h5>
                    <h6 className="ct-performance-statistics__entry__unit">{valuePercentage}&nbsp;pts</h6>
                </div>
            </div>
        </div>
    )
}

export default PerformanceStatisticsEntry;