export const GetStringDate = (date) => {
    if (!date)
        return null
    const vDate = new Date(date)
    return `${vDate.getDate()}/${vDate.getMonth() + 1}/${vDate.getFullYear()}`
}

export const GetStringDate2 = (date) => {
    if (!date)
        return null
    const vDate = new Date(date)
    return `${vDate.getFullYear()}-${(vDate.getMonth() + 1).toString().padStart(2, '0')}-${vDate.getDate().toString().padStart(2, '0')}`
}

export const GetDateValue = (date) => {
    if (!date)
        return null
    const splitDate = date.split('-')
    const vDate = Date.parse(new Date(parseInt(splitDate[0]), parseInt(splitDate[1]) - 1, parseInt(splitDate[2])))
    return vDate
}