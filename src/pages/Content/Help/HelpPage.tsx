import {useEffect, useState} from "react";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {resolveIcon} from "../../../services/icon/IconResolverService";
import get from "../../../services/client/ClientService";
import {CoreConstants} from "../../../constants/CoreConstants";
import {StandardJsonResponse} from "../../../types/api-types";
import hasData from "../../../services/data/DataIntegrityService";
import BaseCard from "../../../components/Cards/BaseCard";
import HelpRankEntry from "./HelpRankEntry";

/**
 * Renders the help page, offering support and information for some of the systems base concepts
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function HelpPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [baseRanks, setBaseRanks] = useState<Array<any>>([])
    const [ranks, setRanks] = useState<Array<any>>([])
    const [entryTags, setEntryTags] = useState<Array<any>>([])
    const [resultTags, setResultTags] = useState([])
    const [activeTab, setActiveTab] = useState('ann-res')
    const [showRankList, setShowRankList] = useState(false)
    const [previousRank, setPreviousRank] = useState({
        name: '',
        ranks: []
    })
    const [currentRank, setCurrentRank] = useState({
        name: '',
        ranks: []
    })
    const [nextRank, setNextRank] = useState({
        name: '',
        ranks: []
    })

    useEffect(() => {
        getRanks()
        getEntryTags()
    }, [])


    //  HANDLER FUNCTIONS

    /**
     * Handles selecting a new tab
     *
     * @param val selected tab
     * @param showRankList should show ranks
     */
    function handleTabChange(val: string, showRankList: boolean) {
        const index = getIndex(ranks, val)
        setActiveTab(val)
        setShowRankList(showRankList)
        setCurrentRank(ranks.filter(i => i.name.toLowerCase() === val)[0])
        setPreviousRank(safeGetData(ranks, index - 1))
        setNextRank(safeGetData(ranks, index + 1))
    }


    //  GENERAL FUNCTIONS

    /**
     * Return the index in an array that matches the corresponding compare value
     *
     * @param data array of data
     * @param compare comparator
     */
    function getIndex(data: Array<any>, compare: string) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].name && data[i].name.toLowerCase() === compare) {
                    return i
                }
            }
        }

        return -1
    }

    /**
     * Safely obtains data from an array for the given index
     *
     * @param data data array
     * @param index index
     */
    function safeGetData(data: Array<any>, index: number) {

        if (index === -1 || index < 0 || index > (data.length - 1)) {
            return null
        }

        return data[index]
    }

    /**
     * Formats the multiplier for a specific format
     *
     * @param value numerical value
     */
    function formatMultiplier(value: number) {
        if (value) {
            return value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                .replace('.00', '')
                .replace('.0', '')
        }

        return '0'
    }

    /**
     * API call to fetch all ranks
     */
    async function getRanks() {

        setIsLoading(true)

        const d = get(CoreConstants.ApiUrls.Rank.BaseRanks)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                const index = getIndex(response.data, activeTab)
                setBaseRanks(response.data.map((item: any) => item.name))
                setRanks(response.data)
                setPreviousRank(safeGetData(response.data, index - 1))
                setCurrentRank(response.data[index])
                setNextRank(safeGetData(response.data, index + 1))
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }

    /**
     * API call to fetch icon types
     */
    async function getEntryTags() {

        setIsLoading(true)

        const d = get(CoreConstants.ApiUrls.System.EntryTags)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setEntryTags(response.data)
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}
    }


    //  RENDER

    return (
        <div className="ct-help-page">
            <div className="container">
                <div className="columns is-multiline is-mobile">
                    <div className="column is-12">
                        <div className="block has-text-centered">
                            CTrader is meant to be a source of improvement and accountability. Trading requires
                            skill and that skill is embodied
                            by <strong>discipline</strong>, <strong>consistency</strong> and&nbsp;<strong>emotional
                            stability</strong>. The system is meant to provide a basic way of tracking your growth
                            in each of these areas.
                        </div>
                        <hr className="is-primary"/>
                    </div>
                    <div className="column is-3-desktop is-12-tablet is-12-mobile">
                        <aside className="menu ct-help-page__menu">
                            <p className="menu-label">
                                Trading
                            </p>
                            <ul className="menu-list">
                                <li>
                                    <ul className="ct-help-page__menu__sub">
                                        <li>
                                            <a className={(activeTab === 'tag-entry' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('tag-entry', false)}>Tagging
                                                Entries</a>
                                        </li>
                                        <li>
                                            <a className={(activeTab === 'ann-res' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('ann-res', false)}>Annotating
                                                Results</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <p className="menu-label">
                                Skill
                            </p>
                            <ul className="menu-list">
                                <li>
                                    <ul className="ct-help-page__menu__sub">
                                        <li>
                                            <a className={(activeTab === 'skill' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('skill', false)}>Overview</a>
                                        </li>
                                        <li>
                                            <a className={(activeTab === 'skill-example' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('skill-example', false)}>Example</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <p className="menu-label">
                                Rank
                            </p>
                            <ul className="menu-list">
                                <li>
                                    <ul className="ct-help-page__menu__sub">
                                        <li>
                                            <a className={(activeTab === 'rank' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('rank', false)}>Overview</a>
                                        </li>
                                        <li>
                                            <a className={(activeTab === 'rank-example' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('rank-example', false)}>Example</a>
                                        </li>
                                        <li>
                                            <a className={(activeTab === 'ranks' ? ' is-active ' : '')}
                                               onClick={() => handleTabChange('ranks', true)}>
                                                    <span className="icon-text">
                                                        <span className="icon">
                                                            {
                                                                showRankList ?
                                                                    <FaChevronUp/>
                                                                    :
                                                                    <FaChevronDown/>

                                                            }
                                                        </span>
                                                        <span>All Ranks</span>
                                                    </span>
                                            </a>
                                            <ul className={(showRankList ? '' : ' no-show ')}>
                                                {baseRanks?.map((item, key) => {
                                                    return (
                                                        <li key={key}>
                                                            <a className={(activeTab === item.toLowerCase() ? ' is-active ' : '')}
                                                               onClick={() => handleTabChange(item.toLowerCase(), true)}>{item}</a>
                                                        </li>
                                                    )
                                                }) ?? null}
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9-desktop is-12-tablet is-12-mobile">
                        <div className={(activeTab === 'skill' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Skill'}
                                subtitle={'A look at how the Skill System works'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block">
                                        The idea for organic growth is to develop <strong>Skill</strong> with low
                                        position sizes
                                        and then work towards increasing <strong>Rank</strong>.<br/><br/>
                                        High Skill & Low Rank : Good<br/>
                                        Low Skill & High Rank : Unstable
                                    </div>
                                    <div className="block">
                                        <strong>Skill</strong> is a measure of points earned
                                        per <em>daily</em> trading sessions. It
                                        does not count
                                        profit or losses.
                                        It simply counts how many points/pips/lots/contracts were earned and/or lost
                                        as a measure of
                                        how you performed
                                        in that session. The idea behind the <strong>Skill</strong> system is to
                                        track your
                                        performance without considering
                                        money because it is not the money that makes the trader. As your level
                                        increases, so does
                                        your ability to trade. Larger position sizes should be considered as
                                        privileges that earning
                                        points & levels earns you.
                                    </div>
                                </div>]}
                            />
                        </div>
                        <div className={(activeTab === 'skill-example' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Skill Example'}
                                subtitle={'Skill System in action'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block">
                                        Here's an example of how the <strong>Skill</strong> system might be used:
                                    </div>
                                    <article className="ct-message ct-message--primary message">
                                        <div className="message-body">
                                            <p>Trading the Nasdaq for 1 day earns us 48 points. Your current Level
                                                is 3 - 87.</p>
                                            <p>
                                                You earned 48 points and each level is defined as 100 points so
                                                after this session
                                                your new <strong>Skill</strong> is Level 4 - 35.
                                            </p>
                                            <p>
                                                How can we quantify this level change? Well if we were trading the
                                                Nasdaq at 0.3 lot
                                                size, now that
                                                we've increased our level to 4, we can now trade lot sizes of 0.4.
                                            </p>
                                            <p>
                                                This creates the scenario where each level represents 0.1 lot sizes.
                                                Following it
                                                this way
                                                we can create a system where as we earn more points we earn the
                                                privilege of trading
                                                larger
                                                so that we can build our skill trading and confidence with each
                                                size.
                                            </p>
                                        </div>
                                    </article>
                                </div>]}
                            />
                        </div>
                        <div className={(activeTab === 'rank' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Rank'}
                                subtitle={'A look at how the Rank System works'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block account-summary">
                                        <strong>Rank</strong> is a measure of your account growth over time.
                                        The <strong>Rank</strong> system is composed of 2
                                        components: <strong>Base Ranks</strong> & <strong>Sub Ranks</strong>.
                                        A <strong>Base
                                        Rank</strong> represents a multiplier
                                        based on your account size. For example the <span
                                        className="value garnet">Garnet</span> base rank represents a multiplier of
                                        2
                                        which means that you would be considered a <span
                                        className="value garnet">Garnet</span> level trader if you have at least
                                        doubled
                                        your account size. A <strong>sub-rank</strong> is a split-up <strong>Base
                                        Rank</strong>. <span className="value garnet">Garnet</span>
                                        &nbsp;has 5 levels within it before reaching the next <strong>Base
                                        Rank</strong>: <span
                                        className="value silver">Silver</span> which has a
                                        multiplier of 5.
                                    </div>
                                </div>]}
                            />
                        </div>
                        <div className={(activeTab === 'rank-example' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Rank Example'}
                                subtitle={'Rank System in action'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block">
                                        Here's an example of the <strong>Rank</strong> system:
                                    </div>
                                    <article className="message ct-message ct-message--primary">
                                        <div className="message-body">
                                            <p>
                                                You've started with a $1,000 account and you've brought it up to $6,789.
                                            </p>
                                            <p>
                                                That represents an increase of 6.79 which is greater than 5 and less
                                                than 10, therefore your <strong>Base Rank</strong>&nbsp;is <span
                                                className="value silver">Silver</span>. This <strong>Base
                                                Rank</strong> has 5 levels (<strong>Sub-Ranks</strong>).
                                            </p>
                                            <p><span className="value silver">Silver</span> starts at $5,000 and the
                                                next <strong>Rank</strong>, <span
                                                    className="value amethyst">Amethyst</span>&nbsp;starts at $10,000
                                                because it has a multiplier of 10. The difference in both ranks is $5000
                                                and because <span className="value silver">Silver</span> has 5 levels,
                                                each increment is $1000. So we have $6,789 which puts us at <span
                                                    className="value silver">Silver IV</span>. The next level would
                                                be <span className="value silver">Silver III</span> at $7,000.
                                            </p>
                                        </div>
                                    </article>
                                </div>]}
                            />
                        </div>
                        <div className={(activeTab === 'ranks' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Ranks Overview'}
                                subtitle={'A look at each possible rank'}
                                hasBorder={true}
                                content={[<div className="container has-text-centered" key={0}>
                                    <p>
                                        Select a rank to view its details and break-down. Each rank as a certain
                                        number of sub-ranks. The examples used
                                        are based off a starter account with $1,000. Sub-ranks are ordered in a such
                                        a way where the lower the tier, the higher its hierarchy. For example a rank
                                        of <span className="value sapphire">Sapphire III</span> is greater
                                        than <span className="value sapphire">Sapphire V</span> and <span
                                        className="value platinum">Platinum V</span> is greater than <span
                                        className="value sapphire">Sapphire III</span>. For more details, refer to
                                        the <em>Example</em> tab of the <strong>Rank</strong> section.
                                    </p>
                                </div>]}
                            />
                        </div>
                        <div className={(currentRank !== null && currentRank !== undefined ? '' : ' no-show ')}>
                            <BaseCard
                                title={currentRank?.name ?? ''}
                                subtitle={'* Examples are computed using a $1000 account'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="columns is-multiline is-mobile">
                                        {
                                                currentRank?.ranks?.map((item, key) => {
                                                    return (
                                                        <div key={key} className="column is-12">
                                                            <HelpRankEntry
                                                                index={key}
                                                                previousRank={previousRank}
                                                                rank={item}
                                                                baseRank={currentRank}
                                                                nextRank={nextRank}
                                                            />
                                                        </div>

                                                    )
                                                }) ?? null
                                            }
                                    </div>
                                </div>]}
                                hasOverflow={false}
                            />
                        </div>
                        <div className={(activeTab === 'tag-entry' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Entry Tagging'}
                                subtitle={'Attach reasons to entering your positions'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block">
                                        Ideally, every position that you enter would have at least 1 (hopefully
                                        more) reason to enter it. This reason can be whatever you want since your
                                        trading strategy is your own.
                                    </div>
                                    <div className="block">
                                        Entry tagging is <em>CTrader</em>'s method have attaching reasons for
                                        entering into your trades. When viewing your trades in <strong>Trade
                                        History</strong>, you can attach reasons to each trade for having entered
                                        that particular trade. The idea is to track your various entries and to
                                        expose poor trading habits as well as highlight your more successful setups.
                                        The results of this analysis can be viewed in the&nbsp;
                                        <strong>Analysis</strong> section.
                                    </div>
                                    <div className="block">
                                        Below are some of the most common reasons to enter a position. Keep in mind
                                        that you are free to your own tags! We can't think of every possible reason
                                        but we definitely aim to help support you so feel free to add as many custom
                                        tags as you like!
                                    </div>
                                    <hr className="navbar-divider"/>
                                    <div className="columns is-multiline is-mobile tag-columns is-vcentered">
                                        <div className="column is-4 is-offset-1">
                                            <p className="has-text-left bullish">
                                                <span>Bullish</span>
                                            </p>
                                            <div className="columns is-multiline is-mobile">
                                                {
                                                    entryTags.filter(t => t.direction === 'BULLISH').map((item, key) => {
                                                        return (
                                                            <div className="column is-12" key={key}>
                                                                    <span className="icon-text tag-text">
                                                                        <span className="icon tag-icon">
                                                                            {resolveIcon(item.code)}
                                                                        </span>
                                                                        <span>
                                                                            {item.label}
                                                                        </span>
                                                                    </span>
                                                                <br/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="column is-2">
                                            <div className="separator"></div>
                                        </div>
                                        <div className="column is-4">
                                            <p className="has-text-right bearish">
                                                <span>Bearish</span>
                                            </p>
                                            <div className="columns is-multiline is-mobile has-text-right">
                                                {
                                                    entryTags.filter(t => t.direction === 'BEARISH').map((item, key) => {
                                                        return (
                                                            <div className="column is-12" key={key}>
                                                                    <span className="icon-text tag-text">
                                                                        <span>
                                                                            {item.label}
                                                                        </span>
                                                                        <span className="icon tag-icon">
                                                                            {resolveIcon(item.code)}
                                                                        </span>
                                                                    </span>
                                                                <br/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>]}
                            />
                        </div>
                        <div className={"card" + (activeTab === 'ann-res' ? '' : ' no-show ')}>
                            <BaseCard
                                title={'Result Annotations'}
                                subtitle={'Add result summaries to your positions'}
                                hasBorder={true}
                                content={[<div className="container" key={0}>
                                    <div className="block">
                                        Once your position is closed, adding some context to the result of the trade
                                        can help identify good & bad patterns. Tagging the results helps to create
                                        consistency by generating accountability and visibility into each position.
                                        The idea is to have intelligent reasons to enter and the exits should
                                        reflect By reviewing the results of trades, we can identify
                                        discrepancies or weaknesses in our strategies that might assist us in
                                        developing more robust and effective habits.
                                    </div>
                                    <div className="block">
                                        Just like <em>Entry Tagging</em>, this system only works if you put in the
                                        work. Tracking each trade and reviewing the entries & results is entirely up
                                        to you. <strong>Trader Buddy</strong> is meant to assist but we can only
                                        show
                                        you what you tell us to look at! Putting in the work makes it all the more
                                        worth
                                        it.
                                    </div>
                                    <div className="block">
                                        Keep in mind that you are free to your own tags! We can't think of every
                                        possible result but we definitely aim to help support you so feel free to
                                        add as many custom tags as you like!
                                    </div>
                                </div>]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HelpPage;