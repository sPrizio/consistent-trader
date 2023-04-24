const stopWords = ['- Cash', 'US', 'USA', 'DEU', 'GER', 'CAN', 'CA']

export function displayString(value: string) {

    if (value) {
        if (value.includes("_")) {
            value = value.replaceAll("_", " ")
        }

        return value.split(" ").map(word => {
            return word[0].toUpperCase() + word.substring(1).toLowerCase()
        }).join(" ")
    }

    return ''
}

export function formatNumberForDisplay(value: number) {

    if (value) {
        return value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    return '0'
}

export function sanitizeText(val: string) {
    stopWords.forEach(str => {
        if (val && val.includes(str)) {
            val = val.replace(str, '')

            return val.trim()
        }
    })

    return val
}

export function tradeDuration(val: number) {
    if (val < 3600) {
        return new Date(val * 1000).toISOString().substring(14, 19)
    } else if (val >= 3600 && val < 86400) {
        return new Date(val * 1000).toISOString().substring(11, 16)
    } else {
        return val + ' days'
    }
}

export function displayRankNumber(num: string) {
    let temp;
    switch (num) {
        case '1':
            temp = 'I'
            break
        case '2':
            temp = 'II'
            break
        case '3':
            temp = 'III'
            break
        case '4':
            temp = 'IV'
            break
        case '5':
            temp = 'V'
            break
        default:
            temp = ''
            break
    }

    return temp
}

export function displayRankName(val: string) {

    if (!val || val.length === 0 || val === 'No Rank' || val === null) {
        return 'No Rank'
    }

    const match = val.match('([a-zA-Z]*).(\\d*)')

    if (match && match.length > 2) {
        const num = match[2]

        let temp = displayRankNumber(num);
        const matching = val.match('([a-zA-Z]*).(\\d*)')
        if (matching && matching.length > 1) {
            return matching[1] + ' ' + temp
        }
    }

    return val
}

export function normalize(min: number, max: number, val: number) {
    return ((val - min) / (max - min)) * 100
}