$(document).ready(function() {
    $('.btn-poll').on('click', function() {
        var vote = parseInt($('#proposedValue').val()) + parseInt($(this).attr('data-vote'));
        var data = { vote: vote, userMSTeams: $('#userMSTeams').val() };

        $.post('/sendPoll', data).done((data) => {
            console.log("Data send :: ", data);
            $('#dvPoll button').attr('disabled', 'disabled');
            localStorage.setItem('userVote', $('#userMSTeams').val());
        }).fail((err, err2) => {
            console.log('Error to send de poll :: ', err, err2);
        });
    });
});