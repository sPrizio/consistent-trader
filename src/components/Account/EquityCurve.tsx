import {ProfitCurveInfo} from "../../types/api-types";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {CoreConstants} from "../../constants/CoreConstants";
import {formatDate} from "../../services/datetime/DateTimeService";
import {useState} from "react";
import {EquityChartTabMap, PeriodType} from "../../types/ui-types";
import {formatNumberForDisplay} from "../../services/data/FormattingService";

/**
 * Component that renders a chart to display an account's equity fluctuations
 *
 * @param profitCurveInfo chart data
 * @param aggregateInterval interval (daily, monthly, yearly)
 * @param fetchHandler when selecting a new tab, calls this handler to dictate the action
 * @author Stephen Prizio
 * @version 1.0
 */
function EquityCurve({profitCurveInfo = {}, aggregateInterval, fetchHandler}: {
    profitCurveInfo: ProfitCurveInfo,
    aggregateInterval: any,
    fetchHandler: Function
}) {

    const [selectedTab, setSelectedTab] = useState('5D')


    //  CONSTANTS

    const options: ApexOptions = {
        chart: {
            type: 'area',
            width: '100%',
            toolbar: {
                show: false
            }
        },
        colors: [CoreConstants.CssConstants.ColorPrimary],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            colors: [CoreConstants.CssConstants.ColorPrimary]
        },

        title: {
            text: '',
        },
        xaxis: {
            type: 'category',
            labels: {
                formatter: function (value, timestamp, opts) {
                    return formatDate(value, formatXAxisTicks())
                },
                style: {
                    colors: CoreConstants.CssConstants.ColorFontSubtitle,
                    fontFamily: CoreConstants.CssConstants.FontPrimary,
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
                    colors: CoreConstants.CssConstants.ColorFontSubtitle,
                    fontFamily: CoreConstants.CssConstants.FontPrimary,
                },
                offsetY: -7,
                offsetX: 0,
                formatter(val: number, opts?: any): string | string[] {
                    return formatYAxisTicks(val)
                }
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
            colors: [CoreConstants.CssConstants.ColorPrimary]
        },
        tooltip: {
            x: {
                format: "yyyy",
            },
            y: {
                formatter(val: number, opts?: any): string {
                    return formatNumberForDisplay(val)
                }
            },
            fixed: {
                enabled: true,
                position: 'topRight'
            },
        },
        grid: {
            show: false,
        },
        legend: {
            show: false,
        }
    }
    const tabs: EquityChartTabMap = {
        '5D': {period: 5, periodType: PeriodType.DAYS},
        '1M': {period: 30, periodType: PeriodType.DAYS},
        '3M': {period: 3, periodType: PeriodType.MONTHS},
        '6M': {period: 6, periodType: PeriodType.MONTHS},
        '1Y': {period: 12, periodType: PeriodType.MONTHS},
        '5Y': {period: 5, periodType: PeriodType.YEARS},
    }


    //  HANDLER FUNCTIONS

    /**
     * Selects a new tab and updates the curve data
     *
     * @param val new tab
     */
    function selectTab(val: string) {
        setSelectedTab(val)
        fetchHandler(tabs[val].period, tabs[val].periodType)
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
                return CoreConstants.DateTime.ISOShortMonthDayFormat
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

        const d: Array<any> = []
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


    //  RENDER

    if (!profitCurveInfo || !profitCurveInfo.points || profitCurveInfo.points.length === 0) {
        return (
            <div className="ct-equity-curve has-text-centered">
                <p>At this moment, your account has not changed. Once you start trading, check back here!</p>
            </div>
        )
    }

    return (
        <div className="ct-equity-curve">
            <div className="tabs is-right is-small">
                <ul>
                    <li className={(selectedTab === '5D' ? " is-active " : "")}>
                        <a onClick={() => selectTab('5D')}>5D</a>
                    </li>
                    <li className={(selectedTab === '1M' ? " is-active " : "")}>
                        <a onClick={() => selectTab('1M')}>1M</a>
                    </li>
                    <li className={(selectedTab === '3M' ? " is-active " : "")}>
                        <a onClick={() => selectTab('3M')}>3M</a>
                    </li>
                    <li className={(selectedTab === '6M' ? " is-active " : "")}>
                        <a onClick={() => selectTab('6M')}>6M</a>
                    </li>
                    <li className={(selectedTab === '1Y' ? " is-active " : "")}>
                        <a onClick={() => selectTab('1Y')}>1Y</a>
                    </li>
                    <li className={(selectedTab === '5Y' ? " is-active " : "")}>
                        <a onClick={() => selectTab('5Y')}>5Y</a>
                    </li>
                </ul>
            </div>
            <div className="chart-container">
                <ReactApexChart options={options} series={computeData()} type="area" height={275}/>
            </div>
        </div>
    )
}

export default EquityCurve;