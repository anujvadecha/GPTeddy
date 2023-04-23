

const chatSocket = new WebSocket(
    'ws://'
    // + window.location.host
    + "20.232.156.33"
    + '/ws/chat/teddy'
    + '/'
);

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data)
        ;
};

chatSocket.onclose = function (e) {
    console.error('Chat socket closed unexpectedly');
};

