import { serve } from "https://deno.land/std@0.202.0/http/server.ts";

const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.onmessage = (event) => {
    console.log(event.data);
    
    setTimeout(() => {
      socket.send("Pong");
    }, 1000);
  };

  return response;
};

serve(handleRequest, { port: 7777 });