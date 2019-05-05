$(document).ready(function() {
    $('.btn-poll').on('click', function() {
        var data = { vote: $(this).attr('data-vote'), userMSTeams: $('#userMSTeams').val() };

        $.post('/sendPoll', data).done((data) => {
            console.log("Data send :: ", data);
        }).fail((err, err2) => {
            console.log('Error to send de poll :: ', err, err2);
        });
    });
});