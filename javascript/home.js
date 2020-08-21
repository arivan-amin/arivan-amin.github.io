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

function getAmountOfTodayPassedPercent() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let currentTimeDigits = hours + "" + minutes;
    return convertNumberIntoPercentage(currentTimeDigits, 2359);
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
    let date = new Date();
    $("#clock-text").text(date.getHours() + ":" + date.getMinutes());
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
