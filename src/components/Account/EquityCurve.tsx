import {PeriodType, ProfitCurveInfo} from "../../types/types";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatDate} from "../../services/datetime/DateTimeService";

function EquityCurve({profitCurveInfo = {}, aggregateInterval = PeriodType.MONTHS}: { profitCurveInfo: ProfitCurveInfo, aggregateInterval: any }) {


    //  CONSTANTS

    const options: ApexOptions = {
        chart: {
            type: 'area',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },

        title: {
            text: '',
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (value, timestamp, opts) {
                    return formatDate(value, formatXAxisTicks())
                }
            },
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        },
        yaxis: {
            tickAmount: 4,
            floating: false,
            labels: {
                style: {
                    colors: '#8e8da4',
                },
                offsetY: -7,
                offsetX: 0,
            },
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true
            }
        },
        fill: {
            type: 'gradient',
            opacity: 0.5
        },
        tooltip: {
            x: {
                format: "yyyy",
            },
            fixed: {
                enabled: false,
                position: 'topRight'
            }
        },
        grid: {
            show: false,
        },
        legend: {
            show: false,
        }
    }


    //  GENERAL FUNCTIONS

    /**
     * Formats the y-axis depending on the value
     *
     * @param value y-axis value (here it would be account balance / value)
     */
    function formatYAxisTicks(value: any) {
        if (value >= 1000) {
            return (value / 1000.0) + 'K'
        } else if (value >= 1000000) {
            return (value / 1000000.0) + 'M'
        }

        return value
    }

    /**
     * Obtains the date time format
     */
    function formatXAxisTicks() {
        switch (aggregateInterval) {
            case PeriodType.DAYS:
                return CoreConstants.DateTime.ISODayFormat
            case PeriodType.WEEKS:
                return CoreConstants.DateTime.ISODateFormat
            case PeriodType.MONTHS:
                return CoreConstants.DateTime.ISOMonthYearFormat
            case PeriodType.YEARS:
                return CoreConstants.DateTime.ISOYearFormat
            default:
                return ''
        }
    }

    /**
     * Formats the data into the correct format
     */
    function computeData() {

        const d : Array<any> = []
        if (profitCurveInfo && profitCurveInfo.points && profitCurveInfo.points.length > 0) {
            profitCurveInfo.points.forEach(point => {
                d.push({
                    x: point.date,
                    y: point.value
                })
            })
        }

        return [
            {
                name: 'Account Balance',
                data: d
            }
        ]
    }

    //  TODO: hide controls
    //  TODO: show different bucket formats (5days 1 week 1 year all time)
    //  TODO: disable formats depending on number of data points
    //  TODO: style the graph

    //  RENDER

    let emptyText = null
    if (!profitCurveInfo || !profitCurveInfo.points || profitCurveInfo.points.length === 0) {
        return (
            <div className="ct-equity-curve">
                <p>At this moment, your account has not changed. Once you start trading, check back here!</p>
            </div>
        )
    }

    return (
        <div className="ct-equity-curve">
            {emptyText}
            <div className="chart-container">
                <ReactApexChart options={options} series={computeData()} type="area" height={350} width={"100%"}/>
            </div>
        </div>
    )
}

export default EquityCurve;