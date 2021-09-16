export const GetStringDate = (date) => {
    if (!date)
        return null
    const vDate = new Date(date)
    return `${vDate.getDate()}/${vDate.getMonth() + 1}/${vDate.getFullYear()}`
}