$(() => {
    setDate();
    setInterval(setDate, 1000);
});

function setDate() {
    let date = new Date();
    $("#clock-text").text(date.getHours() + ":" + date.getMinutes());
}
        
