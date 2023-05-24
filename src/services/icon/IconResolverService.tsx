import {TiCancelOutline} from "react-icons/ti";
import {
    MdOutlineLocalFireDepartment,
    MdOutlineMultilineChart,
    MdOutlineShowChart,
    MdWaterfallChart
} from "react-icons/md";
import {TbChartLine} from "react-icons/tb";
import {RiAlignBottom} from "react-icons/ri";
import {IoPersonOutline} from "react-icons/io5";
import {GiCrackedShield} from "react-icons/gi";

/**
 * Resolves a code into its corresponding icon
 *
 * @param code icon code
 */
export function resolveIcon(code: string) {
    if (!code || code.length <= 0) {
        return <TiCancelOutline />
    }

    switch (code) {
        case 'w':
            return <GiCrackedShield />
        case 'str':
            return <MdOutlineLocalFireDepartment />
        case 's':
            return <TbChartLine />
        case 'r':
            return <TbChartLine className="invert-vertical" />
        case 'dt':
            return <RiAlignBottom className="invert-vertical" />
        case 'db':
            return <RiAlignBottom />
        case 'hs':
            return <IoPersonOutline />
        case 'ihs':
            return <IoPersonOutline className="invert-vertical" />
        case 'p_bear':
            return <MdOutlineShowChart className="invert-horizontal" />
        case 'p_bull':
            return <MdOutlineShowChart />
        case 'brk_bear':
            return <MdOutlineMultilineChart className="invert-vertical" />
        case 'brk_bull':
            return <MdOutlineMultilineChart />
        case 'f_brk_bear':
            return <MdWaterfallChart />
        case 'f_brk_bull':
            return <MdWaterfallChart className="invert-vertical" />
        default:
            return <TiCancelOutline />
    }
}