$(() => {
    setDate();
    setInterval(setDate, 1000);
    searchGoogleSearch();
});

function setDate() {
    let date = new Date();
    $("#clock-text").text(date.getHours() + ":" + date.getMinutes());
}

function searchGoogleSearch() {
    $("#searchInput").keyup(e => {
        if (e.keyCode === 13) {
            searchGoogleForText($("#searchInput").val());
        }
    });
    $("#searchIconDiv").click(() => {
        searchGoogleForText($("#searchInput").val());
    });
}

function searchGoogleForText(text) {
    window.location = "https://www.google.com/search?q=" + text + "&ie=UTF-8";
}
