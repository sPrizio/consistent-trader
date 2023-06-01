import can from '../../assets/icons/locales/flags/canada.png'
import usa from '../../assets/icons/locales/flags/usa.png'
import eu from '../../assets/icons/locales/flags/eu.png'
import uk from '../../assets/icons/locales/flags/united-kingdom.png'
import jpy from '../../assets/icons/locales/flags/japan.png'
import cny from '../../assets/icons/locales/flags/china.png'
import aud from '../../assets/icons/locales/flags/australia.png'

import canRound from '../../assets/icons/locales/round/canada.png'
import usaRound from '../../assets/icons/locales/round/usa.png'
import euRound from '../../assets/icons/locales/round/eu.png'
import ukRound from '../../assets/icons/locales/round/united-kingdom.png'
import jpyRound from '../../assets/icons/locales/round/japan.png'
import cnyRound from '../../assets/icons/locales/round/china.png'
import audRound from '../../assets/icons/locales/round/australia.png'

/**
 * Returns an image for the given country code
 *
 * @param val iso code
 */
export function getFlagForCode(val: string) {
    switch (val) {
        case "CAD":
            return <img src={can} alt={'Canada'} />
        case "USD":
            return <img src={usa} alt={'United States'} />
        case "EUR":
            return <img src={eu} alt={'European Union'} />
        case "GBP":
            return <img src={uk} alt={'United Kingdom'} />
        case "JPY":
            return <img src={jpy} alt={'Japan'} />
        case "CNY":
            return <img src={cny} alt={'China'} />
        case "AUD":
            return <img src={aud} alt={'Australia'} />
        default:
            return null;
    }
}

/**
 * Returns an image for the given country code
 *
 * @param val iso code
 */
export function getRoundFlagForCode(val: string) {
    switch (val) {
        case "CAD":
            return <img src={canRound} alt={'Canada'} />
        case "USD":
            return <img src={usaRound} alt={'United States'} />
        case "EUR":
            return <img src={euRound} alt={'European Union'} />
        case "GBP":
            return <img src={ukRound} alt={'United Kingdom'} />
        case "JPY":
            return <img src={jpyRound} alt={'Japan'} />
        case "CNY":
            return <img src={cnyRound} alt={'China'} />
        case "AUD":
            return <img src={audRound} alt={'Australia'} />
        default:
            return null;
    }
}