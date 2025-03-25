const stompClient = new StompJs.Client({
    brokerURL: `ws://${window.location.host}/buildrun-livechat-websocket`
});

stompClient.onConnect = () => {
    setConnected(true);
    console.log("Connected");
    stompClient.subscribe("/topics/livechat", (message) => {
        updateLiveChat(JSON.parse(message.body).content);
    });
};

stompClient.onWebSocketError = console.error;
stompClient.onStompError = console.error;

function setConnected(connected) {

    if(connect){
        $("#connect").prop("disabled", true);
        $("#disconnect").prop("disabled", false);
    }else{
        $("#connect").prop("disabled", false);
        $("#disconnect").prop("disabled", true);
    }

    $("#conversation").toggle(connected);
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendMessage() {
    const user = $("#user").val();
    const message = $("#message").val();
    if (message.trim()) {
        stompClient.publish({ destination: "/app/new-message", body: JSON.stringify({ user, message }) });
        $("#message").val("");
    }
}

function updateLiveChat(message) {
    $("#livechat").append(`<tr><td>${message}</td></tr>`);
}

$(document).ready(() => {
    $("form").on("submit", (e) => e.preventDefault());
    $("#connect").click(connect);
    $("#disconnect").click(disconnect);
    $("#send").click(sendMessage);
});
