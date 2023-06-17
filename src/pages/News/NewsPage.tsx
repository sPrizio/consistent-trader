import {Helmet} from "react-helmet";
import {formatDateMoment, now} from "../../services/datetime/DateTimeService";
import {CoreConstants} from "../../constants/CoreConstants";
import NewsCard from "../../components/Cards/News/NewsCard";
import {StandardJsonResponse} from "../../types/api-types";
import {useEffect, useState} from "react";
import get from "../../services/client/ClientService";
import hasData from "../../services/data/DataIntegrityService";
import {MultiSelect} from "react-multi-select-component";
import {getFlagForCode} from "../../services/locale/LocaleService";

/**
 * Renders the market news page, displaying full news
 *
 * @author Stephen Prizio
 * @version 1.0
 */
function NewsPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [countries, setCountries] = useState([])
    const [selected, setSelected] = useState<Array<any>>([])
    const [oldDays, setOldDays] = useState(true)

    //  pass locales for api calls

    useEffect(() => {
        getLocales()
    }, [selected])


    //  GENERAL FUNCTIONS

    /**
     * Obtains all the locales supported by the system
     */
    function getLocales() {

        setIsLoading(true)

        console.log(selected)

        const d = get(CoreConstants.ApiUrls.News.Locales)
        d.then(res => {
            let response: StandardJsonResponse = JSON.parse(res)
            if (response.success && hasData(response.data)) {
                setCountries(response.data.map((item: { right: any; left: any; }) => {
                    return {
                        value: item.right,
                        label: item.left
                    }
                }))
            }
        }).catch(err => {
            console.log(err)
        })

        setIsLoading(false)

        return {}

    }

    const selections = (selected: any, _options: any) => {
        return selected.length ? selected.map(({value, key} : {value: string, key: number}) => {
            return (
                <div className="flag-container" key={key}>
                    {getFlagForCode(value)}
                </div>
            )
        }) : 'Filter by Country'
    }


    //  RENDER

    return (
        <>
            <Helmet>
                <title>CTrader | Market News</title>
            </Helmet>
            <div className="ct-news-page">
                <div className="level is-mobile">
                    <div className="level-left"/>
                    <div className="level-right">
                        <div className="level-item">
                            <MultiSelect
                                options={countries}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                                className={'c-multiselect'}
                                disableSearch={true}
                                disabled={false}
                                valueRenderer={selections}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="level-item">
                            <label className="checkbox">
                                <input type="checkbox" checked={oldDays} onChange={() => setOldDays(!oldDays)} />
                                &nbsp;Show Previous Days
                            </label>
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline is-mobile is-vcentered">
                    <div className="column is-12">
                        <NewsCard
                            start={formatDateMoment(now().startOf('week').add(1, 'day'), CoreConstants.DateTime.ISODateFormat)}
                            end={formatDateMoment(now().startOf('week').add(6, 'day'), CoreConstants.DateTime.ISODateFormat)}
                            oldDays={oldDays}
                            locales={selected?.map((item) => item.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsPage;