$(document).ready(function() {
    let today = new Date();
    let lastPollDateStartDate = $('#lastPollDateStart').val().substring(0, $('#lastPollDateStart').val().length - 2);
    let lastPollDateEndDate = $('#lastPollDateEnd').val().substring(0, $('#lastPollDateEnd').val().length - 2);
    let nextPollDateDate = $('#nextPollDate').val().substring(0, $('#nextPollDate').val().length - 2);

    let lastPollDateStartHourFormat = $('#lastPollDateStart').val().substring($('#lastPollDateStart').val().length - 2);
    let lastPollDateEndHourFormat = $('#lastPollDateEnd').val().substring($('#lastPollDateEnd').val().length - 2);
    let nextPollDateHourFormat = $('#nextPollDate').val().substring($('#nextPollDate').val().length - 2);

    let lastPollDateStart = new Date(lastPollDateStartDate + ' ' + lastPollDateStartHourFormat);
    let lastPollDateEnd = new Date(lastPollDateEndDate + ' ' + lastPollDateEndHourFormat);
    let nextPollDate = new Date(nextPollDateDate + ' ' + nextPollDateHourFormat);

    lastPollDateStart.setHours(lastPollDateStart.getHours() - 5);
    lastPollDateEnd.setHours(lastPollDateEnd.getHours() - 5);
    nextPollDate.setHours(nextPollDate.getHours() - 5);

    if (today.getTime() > lastPollDateStart.getTime() && today.getTime() < lastPollDateEnd.getTime()) {
        $('#dvPollVote').removeClass('hide');
        if (localStorage.getItem('userVote')) {
            $('#dvPollVote button').attr('disabled', 'disabled');
        }
    } else {
        $('#dvPoll').removeClass('hide');
        if (today.getTime() > lastPollDateStart.getTime() && today.getTime() < nextPollDate.getTime()) {
            $('#dvPoll button').attr('disabled', 'disabled');
            $('#nextPollDateFront').text("Next vote at: " + nextPollDate);
        }
    }
});