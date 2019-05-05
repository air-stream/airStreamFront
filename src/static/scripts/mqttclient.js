    var port = 32051;
    var host = "m16.cloudmqtt.com";
    var clientId = "airstream" + Math.random();
    var username = "iqvgkhrw";
    var password = "8UdOeGeqex7x";
    var client = new Paho.MQTT.Client(host, port, clientId);
    var topic = "out";

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    var options = {
        useSSL: true,
        userName: username,
        password: password,
        onSuccess: onConnect,
        onFailure: doFail
    };
    // connect the client
    client.connect(options);
    // called when the client connects
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        client.subscribe(topic);
        // Keep alive the channel
        keepAlive('KA');
    }

    function doFail(e) {
        console.log(e);
    }

    function keepAlive(message) {
        setInterval(function() { send(message); }, 9500);
    }

    function send(_message) {
        var message = new Paho.MQTT.Message(_message);
        message.destinationName = topic;
        client.send(message);
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
            write(responseObject.errorMessage);
        }
    }
    // called when a message arrives
    function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
        write(message.payloadString);
    }

    function write(message) {
        var d = new Date();
        var date = d.toLocaleDateString() + '  ' + d.toLocaleTimeString();
        var frame = message.split(',');
        var currentTemp, setPoint = '';
        var userMSTeams = $('#userMSTeams').val();
        var userFloor = $('#userFloor').val();

        // If the frame is valid
        if (frame.length === 11) {
            // filtering just user floor frames
            if (userFloor === frame[2]) {
                currentTemp = frame[7];
                setPoint = frame[9];
                $('#currentTemp').attr('data-value', currentTemp);
                $('#setPoint').attr('data-value', setPoint);
                // $('#msg').append(currentTemp);
                // $('#msg').append(setPoint);
                // $('#msg').append(userMSTeams);
            }
        }

        message = '[' + date + ']: ' + message + '<br />';
        // $('#msg').append(message);
    }