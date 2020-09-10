$(() => {
    setDate();
    setDayMonthYearStats();
    setInterval(setDate, 1000);
    setInterval(setDayMonthYearStats, 5000);
    searchGoogleForText();
});

function setDayMonthYearStats() {
    let dayPercent = getAmountOfTodayPassedPercent();
    let monthPercent = getDaysOfMonthPassedPercent();
    let yearPercent = getDaysOfYearPassedPercent();
    setPercentValues(dayPercent, monthPercent, yearPercent);
}

// todo 8/28/20 - fix time displayed as single digit which brakes remaining time percentage
function getAmountOfTodayPassedPercent() {
    let hours = getHour();
    let minutes = getMinute();
    let currentTimeDigits = hours + "" + minutes;
    return convertNumberIntoPercentage(currentTimeDigits, 2359);
}

function getHour() {
    let localeTimeString = getFormattedTime();
    return localeTimeString.substring(0, localeTimeString.indexOf(":"));
}

function getMinute() {
    let localeTimeString = getFormattedTime();
    return localeTimeString.substring(localeTimeString.indexOf(":") + 1);
}

function getFormattedTime() {
    let date = new Date();
    let options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    let localeTimeString = date.toLocaleTimeString("en-GB", options);
    return localeTimeString.substr(localeTimeString.lastIndexOf(",") + 1).trim();
}

function getDaysOfMonthPassedPercent() {
    let date = new Date();
    return convertNumberIntoPercentage(date.getDate(), getNumberOfDaysInMonth(date.getMonth()));
}

function getDaysOfYearPassedPercent() {
    let daysCount = 0;
    let date = new Date();
    let daysOfThisMonth = date.getDate();
    daysCount += daysOfThisMonth;
    let monthsPassed = date.getMonth() - 1;
    for (let i = 0; i <= monthsPassed; i++) {
        daysCount += getNumberOfDaysInMonth(i);
    }
    return convertNumberIntoPercentage(daysCount, 365);
}

function convertNumberIntoPercentage(upperBound, lowerBound) {
    return Math.floor((upperBound / lowerBound) * 100);
}

function getNumberOfDaysInMonth(month) {
    return new Date(new Date().getFullYear(), month, 0).getDate();
}

function setPercentValues(dayPercent, monthPercent, yearPercent) {
    setPercent("#dayPercentText", dayPercent);
    setPercent("#monthPercentText", monthPercent);
    setPercent("#yearPercentText", yearPercent);
}

function setPercent(idSelector, percent) {
    $(idSelector).text(percent + "%");
}

function setDate() {
    $("#clock-text").text(getHour() + ":" + getMinute());
}

function searchGoogleForText() {
    $("#searchInput").keyup(e => {
        if (e.keyCode === 13) {
            performSearch($("#searchInput").val());
        }
    });
    $("#searchIconDiv").click(() => {
        performSearch($("#searchInput").val());
    });
}

function performSearch(text) {
    window.location = "https://www.google.com/search?q=" + text + "&ie=UTF-8";
}
