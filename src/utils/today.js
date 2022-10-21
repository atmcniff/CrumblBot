module.exports.getHours = () => {
    const today = new Date()
    return today.getHours()
}

module.exports.getMinutes = () => {
    const today = new Date()
    return today.getMinutes()
}

module.exports.getSeconds = () => {
    const today = new Date()
    return today.getSeconds()
}

module.exports.getDay = () => {
    const today = new Date()
    return today.getDay()
}

module.exports.getDateTime = () => {
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' at ' + time;
    return dateTime
}

module.exports.isWeekday = () => {
    const today = new Date()
    const day = today.getDay();
    if (day >= 0 && day <= 4) return true
    else return false
}

module.exports.isWeekend = () => {
    const today = new Date()
    const day = today.getDay();
    if (day === 5 || day === 6) return true
    else return false
}

module.exports.isBedtime = (hourSleep, minuteSleep) => {
    const today = new Date()
    const hoursInMins = today.getHours() * 60
    const sleepHoursInMins = hourSleep * 60

    const time = hoursInMins + today.getMinutes()
    const sleep = sleepHoursInMins + minuteSleep
    if (time >= sleep || (time <= 240)) return true
    else return false
}

