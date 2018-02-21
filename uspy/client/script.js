(function(){

  window.send = send;

  let socket = new WebSocket("ws://localhost:8081");

  socket.onopen = function() {
    console.log("Соединение установлено.");
  };

  function send(){
    socket.send("Привет");
    socket.close();
    setTimeout(function(){
      window.location.reload();
    },2000);

  }

})();
